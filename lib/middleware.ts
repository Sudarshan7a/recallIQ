import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export function getUserFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  const token = tokenFromHeader ?? req.cookies.get("token")?.value;

  if (!token) return null;
  const payload = verifyToken(token);
  return payload ? payload.userId : null;
}
