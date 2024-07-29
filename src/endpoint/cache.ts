import { createHash } from "crypto";

export function getCacheKey(fullUrl: string): string {
  const hash = createHash("sha256").update(fullUrl).digest("hex");
  return hash;
}
