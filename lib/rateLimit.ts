import { NextResponse } from "next/server";

const rateLimits = new Map<string, number[]>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimits.entries()) {
    const valid = timestamps.filter(t => now - t < WINDOW_MS);
    if (valid.length === 0) {
      rateLimits.delete(ip);
    } else {
      rateLimits.set(ip, valid);
    }
  }
}, WINDOW_MS);

export function checkRateLimit(request: Request): NextResponse | null {
  // Try to get IP from headers, fallback to a generic bucket if missing
  // Note: Vercel uses x-real-ip or x-forwarded-for
  const ip = request.headers.get("x-real-ip") || 
             request.headers.get("x-forwarded-for")?.split(",")[0] || 
             "anonymous";
             
  const now = Date.now();
  let timestamps = rateLimits.get(ip) || [];
  
  // Remove older timestamps
  timestamps = timestamps.filter(t => now - t < WINDOW_MS);
  
  if (timestamps.length >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: "Too many requests, please try again later." },
      { 
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": MAX_REQUESTS.toString(),
          "X-RateLimit-Remaining": "0"
        }
      }
    );
  }
  
  timestamps.push(now);
  rateLimits.set(ip, timestamps);
  
  return null; // OK
}
