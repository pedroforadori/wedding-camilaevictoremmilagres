import { redirect } from "next/navigation";

// Rota antiga da arquitetura multi-página — o conteúdo agora vive na âncora
// #presentes da home (ver src/app/page.tsx e
// src/components/PresentesSection.tsx).
export default function PresentesRedirect() {
  redirect("/#presentes");
}
