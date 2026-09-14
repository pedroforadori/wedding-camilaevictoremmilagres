import { redirect } from "next/navigation";

// Rota antiga da arquitetura multi-página — o conteúdo agora vive na âncora
// #programacao da home (ver src/app/page.tsx e src/components/Schedule.tsx).
export default function ProgramacaoRedirect() {
  redirect("/#programacao");
}
