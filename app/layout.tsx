import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoteSport - Votez pour vos joueurs favoris",
  description:
    "Plateforme de vote pour compétitions sportives avec paiement sécurisé via Wave",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Providers>{children}</Providers>{" "}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
