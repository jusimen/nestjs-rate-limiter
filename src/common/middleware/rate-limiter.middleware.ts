import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { RedisCache } from 'cache-manager-redis-yet';
import { Request, Response, NextFunction } from 'express';
import { RedisClientType } from 'redis';
import { UtilsService } from '../utils/utils.service';
import { RateLimiter } from './rate-limiter';

export const routeWeight: Record<string, number> = {
  '/accounts': 1,
  '/products': 2,
  '/orders': 3,
  '/users': 4,
  '/images': 5,
};

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private rateLimitTime: number = 1 * 30 * 1000; // 1 hour
  private readonly redis: RedisClientType;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    private utils: UtilsService,
  ) {
    this.rateLimitTime = this.rateLimitTime;
    this.redis = this.cacheManager.store.client;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.socket.remoteAddress;
    const token = this.utils.extractSessionFromCookie(req);
    const route = req.baseUrl;
    routeWeight[route] = routeWeight[route] || 1;

    if (token) {
      const tokenLimiter: RateLimiter = await this.slidingWindowRateLimiter(
        token,
        parseInt(process.env.RATE_LIMIT_TOKEN),
        this.rateLimitTime,
        routeWeight[route],
      );

      if (tokenLimiter.exceedLimit) {
        return res.status(429).json({
          message: tokenLimiter.message,
        });
      }
    }

    const ipLimiter: RateLimiter = await this.slidingWindowRateLimiter(
      ip,
      parseInt(process.env.RATE_LIMIT_IP),
      this.rateLimitTime,
      routeWeight[route],
    );

    if (ipLimiter.exceedLimit) {
      return res.status(429).json({
        message: ipLimiter.message,
      });
    }

    next();
  }

  private async slidingWindowRateLimiter(
    key: string,
    limit: number,
    window: number,
    weight: number = 1,
  ): Promise<RateLimiter> {
    const now = Date.now();
    const windowStart = now - window;
    const requestsMade = await this.redis.zCount(key, windowStart, now);
    const requestsWeight = requestsMade * weight;

    //Remove all the requests that are outside the window of time
    await this.redis.zRemRangeByScore(key, '-inf', windowStart);

    if (requestsWeight <= limit) {
      //Add the new request to the sorted set
      await this.redis.zAdd(key, { score: now, value: `${now}` });

      return {
        exceedLimit: false,
        message: 'Rate limit ok',
        timeLeft: 0,
      };
    }

    //Time left to be able to make a request
    //current timestamp - Lowest Timestamp in the sorted set + (window - now)
    const lowestTimestamp = await this.redis.zRangeWithScores(key, 0, 1);
    const timeLeft = lowestTimestamp[0].score + (window - now);

    console.log(
      `Rate limit exceeded by ${key}. Try again in ${this.utils.secondsToMinutes(
        timeLeft / 1000,
      )}`,
    );

    return {
      exceedLimit: true,
      message: `Rate limit exceeded. Try again in ${this.utils.secondsToMinutes(
        timeLeft / 1000,
      )}`,
      timeLeft,
    };
  }
}
