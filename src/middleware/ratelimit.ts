import rateLimit, { Options, RateLimitRequestHandler } from "express-rate-limit";


function createRateLimiter(
  windowMs: number,
  max: number,
  message: string
): RateLimitRequestHandler {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: message,
    headers: true,
    skipSuccessfulRequests: true,
  });
}

export default createRateLimiter;
