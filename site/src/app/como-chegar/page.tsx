import { redirect } from "next/navigation";

// Rota antiga da arquitetura multi-página — o conteúdo agora vive na âncora
// #como-chegar da home (ver src/app/page.tsx e
// src/components/ComoChegarSection.tsx).
export default function ComoChegarRedirect() {
  redirect("/#como-chegar");
}
