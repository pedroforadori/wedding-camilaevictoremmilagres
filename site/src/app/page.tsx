import { Hero } from "@/components/Hero";
import { WatercolorWaves } from "@/components/WatercolorWaves";
import { Countdown } from "@/components/Countdown";
import { Invitation } from "@/components/Invitation";
import { Schedule } from "@/components/Schedule";

export default function Home() {
  return (
    <>
      <Hero />
      <WatercolorWaves className="h-16 w-full sm:h-24" />
      <section className="px-6 py-16">
        <Countdown />
      </section>
      <Invitation />
      <Schedule />
    </>
  );
}
