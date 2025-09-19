import jwt from "jsonwebtoken";
import crypto from "crypto";

const SECRET = process.env.STATE_SECRET!;

export interface StatePayload {
  orderId: string;
  competitionId: string;
  playerId: string;
  amount: number;
  iat: number;
  exp: number;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AdminPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    const payload = jwt.verify(
      token,
      JWT_SECRET || "supersecret"
    ) as AdminPayload;
    console.log("✅ JWT payload:", payload);
    return payload;
  } catch (error) {
    console.error("❌ JWT invalide:", error);
    return null;
  }
}

export function signState(payload: Omit<StatePayload, "iat" | "exp">): string {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: StatePayload = {
    ...payload,
    iat: now,
    exp: now + 15 * 60, // 15 minutes
  };

  return jwt.sign(fullPayload, SECRET, { algorithm: "HS256" });
}

export function verifyState(token: string): StatePayload | null {
  try {
    return jwt.verify(token, SECRET) as StatePayload;
  } catch (error) {
    console.error("Erreur vérification state:", error);
    return null;
  }
}

export function generateTransactionId(): string {
  return crypto.randomBytes(16).toString("hex");
}
