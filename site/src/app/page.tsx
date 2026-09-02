import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Invitation } from "@/components/Invitation";
import { Schedule } from "@/components/Schedule";
import { DressCode } from "@/components/DressCode";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Invitation />
        <Schedule />
        <DressCode />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
