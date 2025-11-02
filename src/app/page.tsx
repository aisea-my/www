"use client";

import { DitheredWaves } from "@/components/DitheredWaves";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { TextShimmer } from "@/components/ui/text-shimmer";

const LUMA_REGISTER_URL = "https://luma.com/ai-sea-week";

const EVENT_DATES = "24 Nov 2025 - 30 Nov 2025";

const HERO_CONTENT = {
  title: "AISEA",
  description:
    "Be part of Southeast Asia's largest grassroots builder movement.",
  dates: EVENT_DATES,
} as const;

export default function Home() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <DitheredWaves />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 px-4">
        <BlurFade delay={0} duration={0.8} yOffset={20}>
          <TextShimmer
            as="h1"
            className="font-[family-name:var(--font-perfectly-nineties)] text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold leading-none [--base-color:#e4e4e7] [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),#60a5fa,#a78bfa,#f472b6,#fbbf24,#ffffff,#0000_calc(50%+var(--spread)))]"
            duration={1}
            spread={20}
            once
            delay={1.75}
          >
            {HERO_CONTENT.title}
          </TextShimmer>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="font-[family-name:var(--font-geist-mono)] text-white/60 text-sm sm:text-base md:text-lg font-light">
            {HERO_CONTENT.dates}
          </p>
        </BlurFade>

        <BlurFade delay={0.4}>
          <p className="font-[family-name:var(--font-geist-mono)] text-white/80 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            {HERO_CONTENT.description}
          </p>
        </BlurFade>

        <BlurFade delay={0.5}>
          <Button
            asChild
            size="lg"
            className="font-[family-name:var(--font-geist-mono)] mt-2 bg-white text-black hover:bg-white/90 font-medium rounded-full text-sm md:text-base"
          >
            <a
              href={LUMA_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
          </Button>
        </BlurFade>
      </div>
    </div>
  );
}
