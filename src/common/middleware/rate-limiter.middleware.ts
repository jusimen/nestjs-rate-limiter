import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { RedisCache } from 'cache-manager-redis-yet';
import { Request, Response, NextFunction } from 'express';
import { RedisClientType } from 'redis';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private readonly rateLimitTime: number;
  private readonly redis: RedisClientType;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {
    this.rateLimitTime = 1 * 60 * 60 * 1000; // 1 hour
    this.redis = this.cacheManager.store.client;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;

    this.slidingWindowRateLimiter(ip, 10, 1);

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.cookie?.split('=') || [];
    return type === 'sessionId' ? token : undefined;
  }

  private async slidingWindowRateLimiter(
    key: string,
    limit: number,
    windowSize: number,
  ): Promise<boolean> {
    const windowSizeInSeconds = windowSize * 60; // Convert minutes to seconds

    const val = parseInt(await this.redis.get(key));
    console.log('val: ', val);

    if (!val) {
      // If the key doesn't exist, create it and set it to 1
      await this.redis
        .multi()
        .set(key, 1)
        .expire(key, windowSizeInSeconds)
        .exec();
    } else {
      // If the key exists, increment it
      await this.redis.incr(key);
    }

    if (val > limit) {
      console.log('Rate limit exceeded');

      //ttl
      console.log('TTL: ', await this.redis.ttl(key));

      return false;
    }

    return false;
  }
}
