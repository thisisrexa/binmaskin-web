import { useTranslations } from "next-intl";

import { Eyebrow } from "@/components/sections/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { StatsCounter } from "@/components/ui/stats-counter";

const STATS: {
  n: 1 | 2 | 3 | 4;
  value?: number;
  minDigits?: number;
  suffix?: string;
}[] = [
  { n: 1, value: 2, minDigits: 2 },
  { n: 2 },
  { n: 3, value: 100, suffix: "%" },
  { n: 4 },
];

export function About() {
  const t = useTranslations("about");
  const tq = useTranslations("quote");

  return (
    <section id="about" className="wrap py-24 max-md:py-16">
      <Reveal>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-copy whitespace-pre-line">
          {t.rich("title", { em: (chunks) => <em>{chunks}</em> })}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-6 max-w-copy text-[1.125rem] text-muted-foreground">
          {t("lead")}
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="about-quote mt-12 max-w-copy border-s-2 border-accent ps-8 text-[clamp(1.25rem,2.4vw,1.7rem)] leading-[1.45] whitespace-pre-line text-foreground italic">
          {tq("text")}
        </p>
      </Reveal>
      <div className="mt-12 grid grid-cols-4 gap-8 max-lg:grid-cols-2">
        {STATS.map((stat, i) => (
          <Reveal key={stat.n} delay={i * 0.08}>
            <div className="stat-n">
              {stat.value != null ? (
                <StatsCounter
                  value={stat.value}
                  minDigits={stat.minDigits}
                  suffix={stat.suffix}
                  duration={1.4}
                />
              ) : (
                t(`v${stat.n}`)
              )}
            </div>
            <div className="stat-l">{t(`s${stat.n}`)}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
