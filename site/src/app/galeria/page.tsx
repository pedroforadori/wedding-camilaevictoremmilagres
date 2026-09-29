import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = { title: "Galeria | Camila e Victor" };

export default function GaleriaPage() {
  return <Gallery />;
}
