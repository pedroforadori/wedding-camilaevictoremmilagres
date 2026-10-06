import Stripe from "stripe";

// Sem STRIPE_SECRET_KEY (a conta nova do Stripe dos noivos ainda não existe,
// out/2026) o pagamento com cartão cai no checkout simulado
// (/presentes/checkout-simulado), igual ao site da Vania & Mauro. Basta
// definir as env vars na Vercel para o fluxo real entrar no ar.
export function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  return new Stripe(secretKey);
}

// "simulado" só fora da produção (local e previews da Vercel): convidados de
// verdade nunca devem cair numa tela de pagamento de demonstração. Em produção
// sem chave, o botão "Cartão" aparece como "em breve" e só o Pix funciona.
export type CardMode = "stripe" | "simulado" | "off";

export function getCardMode(): CardMode {
  if (process.env.STRIPE_SECRET_KEY) return "stripe";
  return process.env.VERCEL_ENV === "production" ? "off" : "simulado";
}
