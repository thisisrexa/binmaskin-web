"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { Eyebrow } from "@/components/sections/eyebrow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import work01 from "../../../public/img/work-01.jpg";
import work02 from "../../../public/img/work-02.jpg";
import work03 from "../../../public/img/work-03.jpg";
import work04 from "../../../public/img/work-04.jpg";

const SLIDES: { img: StaticImageData; line: "d1" | "d2" | "d3" | "d4"; year: string }[] = [
  { img: work01, line: "d1", year: "2025" },
  { img: work02, line: "d2", year: "2025" },
  { img: work03, line: "d3", year: "2026" },
  { img: work04, line: "d4", year: "2026" },
];

function WorkSlide({
  s,
  i,
  active,
}: {
  s: (typeof SLIDES)[number];
  i: number;
  active: boolean;
}) {
  const t = useTranslations("work");
  const tb = useTranslations("biz");

  return (
    <article className={cn("work-slide", active && "is-active")}>
      <div className="art relative">
        <Image
          src={s.img}
          alt={t(s.line)}
          fill
          sizes="(max-width: 768px) 100vw, min(86vw, 920px)"
          placeholder="blur"
          className="object-cover object-[80%_center]"
          draggable={false}
          priority={i === 0}
        />
      </div>
      <div className="veil" aria-hidden="true" />
      <span className="badge">{t("badge")}</span>
      <span className="big-num" aria-hidden="true">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="body">
        <div className="meta">
          <span>{tb(s.line)}</span>
          <span className="y">{s.year}</span>
        </div>
        <h3>{t(s.line)}</h3>
        <p>{t(`${s.line}p`)}</p>
        <a href="#contact" className="btn btn-sm">
          <span>{t("cta")}</span>
          <svg className="arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export function WorkCarousel() {
  const t = useTranslations("work");
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIdx(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const go = useCallback((i: number) => api?.scrollTo(i), [api]);

  return (
    <section id="work" className="wrap py-24 max-md:py-16">
      <Reveal>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2>{t.rich("title", { em: (c) => <em>{c}</em> })}</h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-6 max-w-copy text-[1.125rem] text-muted-foreground">
          {t("lead")}
        </p>
      </Reveal>
      <div className="relative mt-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="font-serif text-[1.1rem] text-faint">
            <b className="font-normal text-foreground">
              {String(idx + 1).padStart(2, "0")}
            </b>{" "}
            <span aria-hidden="true">/</span> {String(SLIDES.length).padStart(2, "0")}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="icon-btn inline-flex rtl:[&>svg]:-scale-x-100"
              aria-label={t("prev")}
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="icon-btn inline-flex rtl:[&>svg]:-scale-x-100"
              aria-label={t("next")}
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        {ready ? (
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              direction: locale === "ar" ? "rtl" : "ltr",
            }}
          >
            <CarouselContent className="ml-0 md:-ms-3">
              {SLIDES.map((s, i) => (
                <CarouselItem
                  key={s.line}
                  className="basis-full pl-0 md:basis-[min(86%,920px)] md:ps-3"
                >
                  <WorkSlide s={s} i={i} active={i === idx} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <WorkSlide s={SLIDES[0]} i={0} active />
        )}
        <div className="work-dots mt-8 flex justify-center gap-2.5" role="tablist" aria-label="Slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.line}
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === idx ? true : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
