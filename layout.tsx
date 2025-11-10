import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SPYMEDIA.net — Cinematic Creative Media",
  description:
    "SPYMEDIA.net captures reality beyond sight with photography, drone, 3D and creative media experiences.",
  metadataBase: new URL("https://spymedia.net"),
  openGraph: {
    title: "SPYMEDIA.net — Cinematic Creative Media",
    description:
      "Photography, drone, 3D, and cinematic storytelling. Explore the SPYMEDIA experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${poppins.variable} bg-charcoal text-white`}
      >
        <div className="noisy-overlay" />
        {children}
      </body>
    </html>
  );
}

