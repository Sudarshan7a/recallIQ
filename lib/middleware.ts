import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export function getUserFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);
  return payload ? payload.userId : null;
}
