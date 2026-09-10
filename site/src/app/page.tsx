import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Invitation } from "@/components/Invitation";
import { Schedule } from "@/components/Schedule";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="px-6 py-16">
        <Countdown />
      </section>
      <Invitation />
      <Schedule />
    </>
  );
}
