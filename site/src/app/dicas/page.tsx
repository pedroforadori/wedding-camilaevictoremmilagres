import { redirect } from "next/navigation";

// Rota antiga da arquitetura multi-página — o conteúdo agora vive na âncora
// #dicas da home (ver src/app/page.tsx e src/components/DicasSection.tsx).
export default function DicasRedirect() {
  redirect("/#dicas");
}
