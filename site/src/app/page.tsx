import { Hero } from "@/components/Hero";
import { CountdownInline } from "@/components/Countdown";
import { Invitation } from "@/components/Invitation";
import { Schedule } from "@/components/Schedule";
import { RsvpSection } from "@/components/RsvpSection";
import { DicasSection } from "@/components/DicasSection";
import { ComoChegarSection } from "@/components/ComoChegarSection";
import { PresentesSection } from "@/components/PresentesSection";
import { MensagensSection } from "@/components/MensagensSection";

// Página única com seções por âncora (replicando o menu do site de
// referência — ver `primaryNav` em content/wedding.ts). `mensagens` lê o
// mural de recados do disco a cada request, então a home inteira precisa
// ser dinâmica.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <Invitation />
      <section className="px-6 pb-16">
        <CountdownInline />
      </section>
      <Schedule />
      <RsvpSection />
      <DicasSection />
      <ComoChegarSection />
      <PresentesSection />
      <MensagensSection />
    </>
  );
}
