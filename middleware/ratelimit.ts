import rateLimit, { Options, RateLimitRequestHandler } from "express-rate-limit";

// Define the function parameters with appropriate types
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
