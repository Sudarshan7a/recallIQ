import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Check if Upstash is configured to avoid crashing/throwing when env vars are missing
export const isRateLimiterConfigured = !!(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://placeholder-url.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "placeholder-token",
});

// 10 requests per minute per user — protects AI quota
export const generateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  prefix: "ratelimit:generate",
});

// 3 requests per 15 minutes per IP — prevents OTP spam
export const forgotPasswordLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "15 m"),
  prefix: "ratelimit:forgot-password",
});

// 5 requests per hour per IP — prevents fake signups
export const registerLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "ratelimit:register",
});

/**
 * Helper to check rate limit safely.
 * If Upstash Redis env variables are not configured, it will gracefully bypass rate limiting.
 */
export async function limitRequest(
  limiter: Ratelimit,
  identifier: string
) {
  if (!isRateLimiterConfigured) {
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
    };
  }
  return await limiter.limit(identifier);
}
