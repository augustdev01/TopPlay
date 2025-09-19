import crypto from "crypto";

export interface WavePaymentParams {
  amount: number;
  orderId: string;
  playerName: string;
  competitionName: string;
}

export interface WaveTransactionStatus {
  success: boolean;
  status?: "pending" | "success" | "failed" | "cancelled";
  amount?: number;
  transactionId?: string;
  customerPhone?: string;
  error?: string;
}

// Construction du lien Wave Business direct
export function buildWavePaymentUrl(params: WavePaymentParams): string {
  // URL de base Wave Business (format: https://pay.wave.com/m/MERCHANT_ID/c/COUNTRY/)
  const baseUrl =
    process.env.WAVE_PAYMENT_BASE_URL ||
    "https://pay.wave.com/m/M_ci_c6B-ctQ1-KdZ/c/ci/";

  // Paramètres Wave
  const waveParams = new URLSearchParams({
    amount: params.amount.toString(),
    // On peut ajouter des paramètres personnalisés si Wave les supporte
    reference: params.orderId,
    description: `Vote pour ${params.playerName} - ${params.competitionName}`,
  });

  return `${baseUrl}?${waveParams.toString()}`;
}

// Génération d'un ID de transaction unique pour le suivi
export function generateTransactionId(): string {
  return crypto.randomBytes(16).toString("hex");
}

// Système de vérification par polling intelligent
export async function checkPaymentStatus(
  orderId: string
): Promise<WaveTransactionStatus> {
  try {
    // Comme on n'a pas d'API Wave, on va utiliser une approche intelligente :
    // 1. Vérifier si l'utilisateur est revenu sur notre site (présence dans la session)
    // 2. Demander à l'utilisateur de confirmer le paiement
    // 3. Optionnellement, permettre la saisie d'un code de transaction

    // Pour l'instant, on simule une vérification
    // En production, cela pourrait être :
    // - Un webhook si Wave le supporte
    // - Une vérification manuelle avec code de transaction
    // - Un système de confirmation utilisateur

    return {
      success: true,
      status: "pending",
      error: "Vérification manuelle requise",
    };
  } catch (error) {
    console.error("Erreur vérification paiement:", error);
    return {
      success: false,
      error: "Erreur de vérification",
    };
  }
}

// Fonction pour valider un code de transaction saisi par l'utilisateur
export function validateTransactionCode(code: string): boolean {
  // Validation basique du format du code de transaction Wave
  // Les codes Wave ont généralement un format spécifique
  const waveCodePattern = /^[A-Z0-9]{8,20}$/;
  return waveCodePattern.test(code.toUpperCase());
}

// Génération d'un state sécurisé pour le suivi
export function generateSecureState(orderId: string): string {
  const secret = process.env.STATE_SECRET || "default-secret";
  const timestamp = Date.now();
  const data = `${orderId}-${timestamp}`;
  const hash = crypto.createHmac("sha256", secret).update(data).digest("hex");

  return Buffer.from(`${data}-${hash}`).toString("base64");
}

// Vérification du state sécurisé
export function verifySecureState(state: string, orderId: string): boolean {
  try {
    const decoded = Buffer.from(state, "base64").toString();
    const [receivedOrderId, timestamp, hash] = decoded.split("-");

    if (receivedOrderId !== orderId) return false;

    // Vérifier que le state n'est pas trop ancien (15 minutes max)
    const now = Date.now();
    const stateTime = parseInt(timestamp);
    if (now - stateTime > 15 * 60 * 1000) return false;

    // Vérifier le hash
    const secret = process.env.STATE_SECRET || "default-secret";
    const expectedHash = crypto
      .createHmac("sha256", secret)
      .update(`${receivedOrderId}-${timestamp}`)
      .digest("hex");

    return hash === expectedHash;
  } catch (error) {
    return false;
  }
}
