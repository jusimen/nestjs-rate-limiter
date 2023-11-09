export interface RateLimiter {
  exceedLimit: boolean;
  message: string;
  timeLeft: number;
}
