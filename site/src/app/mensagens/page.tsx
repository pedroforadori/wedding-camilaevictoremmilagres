import { redirect } from "next/navigation";

// Rota antiga da arquitetura multi-página — o conteúdo agora vive na âncora
// #mensagens da home (ver src/app/page.tsx e
// src/components/MensagensSection.tsx).
export default function MensagensRedirect() {
  redirect("/#mensagens");
}
