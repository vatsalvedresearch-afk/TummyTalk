import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tummy Talk",
  description: "Paediatric GI Symptom Companion — educational prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
