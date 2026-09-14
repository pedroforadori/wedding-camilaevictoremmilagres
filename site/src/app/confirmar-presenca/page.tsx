import { redirect } from "next/navigation";

// Rota antiga da arquitetura multi-página — o conteúdo agora vive na âncora
// #rsvp da home (ver src/app/page.tsx e src/components/RsvpSection.tsx).
export default function ConfirmarPresencaRedirect() {
  redirect("/#rsvp");
}
