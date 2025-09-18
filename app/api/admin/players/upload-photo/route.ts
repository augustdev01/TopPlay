// app/api/upload-player-photo/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as unknown as File | null;
    const slug = (formData.get("slug") as string) || `player-${Date.now()}`;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier reçu" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalName = (file as any).name || `${slug}.jpg`;
    const ext = path.extname(originalName) || ".jpg";
    const fileName = `${slug}-${Date.now()}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "players");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    // on renvoie le chemin public (tu peux préfixer par NEXT_PUBLIC_BASE_URL si tu veux l'URL complète)
    const url = `/uploads/players/${fileName}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Erreur upload-player-photo:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
