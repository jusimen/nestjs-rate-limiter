import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { RedisCache } from 'cache-manager-redis-yet';
import { Request, Response, NextFunction } from 'express';
import { RedisClientType } from 'redis';
import ms, { StringValue } from 'ms';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private rateLimitTime: number = 1 * 30 * 1000; // 1 hour
  private readonly redis: RedisClientType;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {
    this.rateLimitTime = this.rateLimitTime;
    this.redis = this.cacheManager.store.client;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.socket.remoteAddress;
    const token = this.extractTokenFromHeader(req);

    //Date Now, readable
    console.log('now', new Date(Date.now()).toLocaleString());

    const tokenLimiter = this.slidingWindowRateLimiter(
      token,
      parseInt(process.env.RATE_LIMIT_TOKEN),
      this.rateLimitTime,
    );

    const ipLimiter = this.slidingWindowRateLimiter(
      ip,
      parseInt(process.env.RATE_LIMIT_IP),
      this.rateLimitTime,
    );

    if (!tokenLimiter || !ipLimiter) {
      return res.status(429).send('Too Many Requests');
    }

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.cookie?.split('=') || [];
    return type === 'sessionId' ? token : undefined;
  }

  private async slidingWindowRateLimiter(
    key: string,
    limit: number,
    window: number,
  ) {
    const now = Date.now();
    const windowStart = now - window;
    const requestsMade = await this.redis.zCount(key, windowStart, now);

    console.log('requestsMade', requestsMade);

    if (requestsMade <= limit) {
      await this.redis.zAdd(key, { score: now, value: `${now}` });
      await this.redis.zRemRangeByScore(key, '-inf', windowStart);
    }

    //Time left to be able to make a request
    //current timestamp - Lowest Timestamp in the sorted set + (window - now)
    const lowestTimestamp = await this.redis.zRangeWithScores(key, 0, 1);
    const timeLeft = lowestTimestamp[0].score + (window - now);

    throw new Error('Too Many Requests. Try again in ' + ms(timeLeft));

    return false;
  }
}
