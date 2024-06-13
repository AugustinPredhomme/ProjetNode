import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  keyGen: (req) => req.ip, // Limit requests based on IP address
  windowMs: 60 * 1000, // Limit window of 1 minute
  limit: 100, // Max requests per window
});

export default async function rateLimiterMiddleware(req, res, next) {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    if (err.message === "Rate limit exceeded") {
      res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    } else {
      next(err);
    }
  }
}
