import type { Metadata } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CountdownCorner } from "@/components/Countdown";
import "./globals.css";

// Fontes enviadas pela Camila: Cinzel para os textos, Lile Dahliya Script
// para o nome dos noivos.
const displaySerif = localFont({
  variable: "--font-display",
  src: [
    { path: "../fonts/cinzel-regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/cinzel-bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/cinzel-black.ttf", weight: "900", style: "normal" },
  ],
});

const script = localFont({
  variable: "--font-script",
  src: "../fonts/lile-dahliya-script.otf",
  weight: "400",
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Camila e Victor | São Miguel dos Milagres",
  description:
    "Site do casamento de Camila e Victor, em São Miguel dos Milagres, Alagoas. Três dias de celebração à beira-mar.",
  metadataBase: new URL("https://www.camilaevictoremmilagres.com.br"),
  openGraph: {
    title: "Camila e Victor",
    description:
      "Site do casamento de Camila e Victor, em São Miguel dos Milagres, Alagoas.",
    siteName: "Camila e Victor",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${displaySerif.variable} ${script.variable} ${body.variable}`}
    >
      <body className="min-h-full flex flex-col bg-foam text-ink font-body antialiased">
        <Header />
        <CountdownCorner />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
