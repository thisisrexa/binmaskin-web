import { useTranslations } from "next-intl";

import { Eyebrow } from "@/components/sections/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const GROUPS = [
  {
    id: "digital",
    lic: "digitalLic",
    title: "digitalTitle",
    lead: "digitalLead",
    cards: [
      { n: "01", k: "d1", lic: "d1lic", items: ["d1a", "d1b", "d1c", "d1d", "d1e", "d1f"] },
      { n: "02", k: "d2", lic: "d2lic", items: ["d2a", "d2b", "d2c", "d2d", "d2e", "d2f"] },
      { n: "03", k: "d3", lic: "d3lic", items: ["d3a", "d3b", "d3c", "d3d", "d3e", "d3f"] },
      { n: "04", k: "d4", lic: "d4lic", items: ["d4a", "d4b", "d4c", "d4d", "d4e"] },
    ],
  },
  {
    id: "building",
    lic: "buildingLic",
    title: "buildingTitle",
    lead: "buildingLead",
    cards: [
      { n: "01", k: "b1", lic: "b1lic", items: ["b1a", "b1b", "b1c", "b1d"] },
      { n: "02", k: "b2", lic: "b2lic", items: ["b2a", "b2b", "b2c", "b2d"] },
      { n: "03", k: "b3", lic: "b3lic", items: ["b3a", "b3b", "b3c", "b3d"] },
      { n: "04", k: "b4", lic: "b4lic", items: ["b4a", "b4b", "b4c", "b4d"] },
    ],
  },
] as const;

export function Businesses() {
  const t = useTranslations("biz");

  return (
    <section id="businesses" className="wrap py-24 max-md:py-16">
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
      <div className="mt-16 flex flex-col gap-20">
        {GROUPS.map((group) => (
          <div key={group.id}>
            <Reveal>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <p className="text-[11px] tracking-[0.18em] text-accent uppercase ar:tracking-normal ar:normal-case">
                  {t(group.id)}
                </p>
                <span className="text-[10.5px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
                  {t(group.lic)}
                </span>
              </div>
              <h3 className="max-w-copy whitespace-pre-line text-[clamp(1.65rem,3.5vw,2.35rem)] font-light">
                {t(group.title)}
              </h3>
              <p className="mt-4 max-w-copy text-muted-foreground">{t(group.lead)}</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border max-md:grid-cols-1">
              {group.cards.map((card, i) => (
                <Reveal key={card.k} delay={i * 0.08}>
                  <article className="group relative min-h-[280px] overflow-hidden bg-background p-[clamp(1.25rem,3vw,2.6rem)] transition-colors duration-700 hover:bg-white/55 max-md:min-h-0">
                    <span
                      className="absolute start-0 top-0 h-0.5 w-12 origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100 max-md:scale-x-100 rtl:origin-right"
                      aria-hidden="true"
                    />
                    <div className="mb-6 flex items-baseline justify-between gap-3">
                      <span className="svc-num">{card.n}</span>
                      <span className="text-[10.5px] tracking-[0.16em] text-faint uppercase ar:tracking-normal ar:normal-case">
                        {t(card.lic)}
                      </span>
                    </div>
                    <h4 className="svc-title text-[clamp(1.2rem,4.5vw,1.85rem)] font-light">
                      {t(card.k)}
                    </h4>
                    <p className="mt-3 max-w-copy text-muted-foreground max-md:text-[0.98rem]">
                      {t(`${card.k}p`)}
                    </p>
                    <ul className="mt-4 grid grid-cols-2 gap-x-4">
                      {card.items.map((k) => (
                        <li
                          key={k}
                          className="border-b border-border py-2 text-[0.88rem] text-muted-foreground before:me-2 before:text-accent before:content-['—']"
                        >
                          {t(k)}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
