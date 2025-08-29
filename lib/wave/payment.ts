import crypto from 'crypto';

export interface WavePaymentParams {
  amount: number;
  currency?: string;
  description: string;
  state: string;
  redirectUrl: string;
  callbackUrl?: string;
}

export interface WaveTransactionStatus {
  success: boolean;
  status?: 'pending' | 'success' | 'failed' | 'cancelled';
  amount?: number;
  currency?: string;
  transactionId?: string;
  customerPhone?: string;
  error?: string;
}

export function buildWaveCheckoutUrl(params: WavePaymentParams): string {
  const baseUrl = process.env.WAVE_BUSINESS_BASE_URL!;
  
  const waveParams = new URLSearchParams({
    amount: params.amount.toString(),
    currency: params.currency || 'XOF',
    description: params.description,
    state: params.state,
    success_url: params.redirectUrl,
    error_url: params.redirectUrl,
    cancel_url: params.redirectUrl,
  });

  if (params.callbackUrl) {
    waveParams.set('webhook_url', params.callbackUrl);
  }

  return `${baseUrl}?${waveParams.toString()}`;
}

export function verifyWaveSignature(data: any, signature: string): boolean {
  const secret = process.env.WAVE_BUSINESS_SECRET!;
  
  const payload = JSON.stringify(data);
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

export async function verifyTransactionWithWave(transactionRef: string): Promise<WaveTransactionStatus> {
  try {
    const apiUrl = `${process.env.WAVE_BUSINESS_API_URL}/transactions/${transactionRef}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.WAVE_BUSINESS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, error: 'Transaction non trouvée' };
      }
      return { success: false, error: 'Erreur API Wave' };
    }

    const transaction = await response.json();
    
    return {
      success: true,
      status: mapWaveStatus(transaction.status),
      amount: transaction.amount,
      currency: transaction.currency,
      transactionId: transaction.id,
      customerPhone: transaction.customer_phone
    };
  } catch (error) {
    console.error('Erreur vérification Wave:', error);
    return { success: false, error: 'Erreur de connexion' };
  }
}

function mapWaveStatus(waveStatus: string): 'pending' | 'success' | 'failed' | 'cancelled' {
  switch (waveStatus) {
    case 'completed':
    case 'success':
      return 'success';
    case 'pending':
    case 'processing':
      return 'pending';
    case 'failed':
    case 'error':
      return 'failed';
    case 'cancelled':
    case 'canceled':
      return 'cancelled';
    default:
      return 'pending';
  }
}

export async function checkOrderStatus(orderId: string): Promise<{
  success: boolean;
  status?: string;
  transactionRef?: string;
  error?: string;
}> {
  try {
    // Simulation d'une vérification via l'API Wave
    // En réalité, Wave Business fournirait un moyen de vérifier les paiements
    // soit via webhook, soit via API de vérification
    
    const response = await fetch(`${process.env.WAVE_BUSINESS_API_URL}/orders/${orderId}/status`, {
      headers: {
        'Authorization': `Bearer ${process.env.WAVE_BUSINESS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return { success: false, error: 'Impossible de vérifier le statut' };
    }

    const data = await response.json();
    
    return {
      success: true,
      status: mapWaveStatus(data.status),
      transactionRef: data.transaction_id
    };
  } catch (error) {
    console.error('Erreur vérification order:', error);
    return { success: false, error: 'Erreur de vérification' };
  }
}