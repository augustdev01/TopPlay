import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/config";

const handler = NextAuth(authConfig);

// 🔹 App Router : export GET et POST
export { handler as GET, handler as POST };
