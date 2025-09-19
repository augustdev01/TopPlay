import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Déconnecté" });
  res.cookies.set("admin_token", "", { expires: new Date(0), path: "/" });
  return res;
}
