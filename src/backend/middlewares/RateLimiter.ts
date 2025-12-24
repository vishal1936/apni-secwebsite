// Basic rate limiter - in production, use a proper rate limiting library
const requests = new Map<string, { count: number; resetTime: number }>();

export class RateLimiter {
  static checkLimit(ip: string, limit: number = 100, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const userRequests = requests.get(ip);

    if (!userRequests || now > userRequests.resetTime) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (userRequests.count >= limit) {
      return false;
    }

    userRequests.count++;
    return true;
  }
}