import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import { profile } from "@/data/resume";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const title = `${profile.name} | ${profile.role}`;
const description = profile.summary;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

// Runs before first paint so the saved or system theme never flashes the wrong
// colors, and marks JS as available so scroll animations may hide content.
const bootScript = `(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem("theme")}catch(e){}
if(s==="dark"||(!s&&matchMedia("(prefers-color-scheme: dark)").matches))d.classList.add("dark");d.classList.add("js")})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${outfit.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
