"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Eyebrow } from "@/components/sections/eyebrow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/ui/reveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY } from "@/lib/company";

const BUSINESS_OPTIONS = ["digital", "building", "unsure"] as const;

export function Contact() {
  const t = useTranslations("contact");
  const tf = useTranslations("f");
  const tb = useTranslations("biz");
  const tc = useTranslations("cta3");
  const tm = useTranslations("cta");
  const [sent, setSent] = useState(false);

  const send = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2600);
  };

  return (
    <section id="contact">
      <div className="wrap py-24 max-md:py-16">
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2>{t.rich("title", { em: (chunks) => <em>{chunks}</em> })}</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-[1.1fr_1fr] gap-16 max-lg:grid-cols-1">
          <Reveal>
            <form
              className="relative border border-border bg-secondary p-[clamp(1.75rem,3.5vw,3rem)]"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <span className="absolute start-0 top-0 h-0.5 w-11 bg-accent" aria-hidden="true" />
              <div className="mb-8">
                <Label htmlFor="cf-name">{tf("name")}</Label>
                <Input id="cf-name" type="text" placeholder={tf("nameph")} />
              </div>
              <div className="mb-8">
                <Label htmlFor="cf-email">{tf("email")}</Label>
                <Input id="cf-email" type="email" placeholder="you@company.com" />
              </div>
              <div className="mb-8">
                <Label htmlFor="cf-phone">{tf("phone")}</Label>
                <Input id="cf-phone" type="tel" placeholder="+971 · · ·" />
              </div>
              <div className="mb-8">
                <Label id="cf-business-label">{tf("business")}</Label>
                <Select defaultValue="digital">
                  <SelectTrigger aria-labelledby="cf-business-label">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_OPTIONS.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v === "unsure" ? tf("unsure") : tb(v)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-8">
                <Label htmlFor="cf-msg">{tf("msg")}</Label>
                <Textarea id="cf-msg" placeholder={tf("msgph")} />
              </div>
              <button type="submit" className="btn btn-solid">
                <span>{sent ? tf("sent") : tf("send")}</span>
                <svg className="arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </form>
          </Reveal>
          <Reveal delay={0.1}>
            {[
              { k: tf("email"), v: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { k: tf("wa"), v: COMPANY.phone, href: `tel:${COMPANY.phoneTel}` },
              { k: "Instagram", v: COMPANY.instagramHandle, href: COMPANY.instagram },
            ].map((r) => (
              <div key={r.k} className="border-b border-border py-5">
                <div className="text-[11px] tracking-[0.18em] text-faint uppercase ar:tracking-normal ar:normal-case">
                  {r.k}
                </div>
                <a
                  className="mt-1.5 block text-[1.05rem] transition-colors hover:text-accent"
                  href={r.href}
                  {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {r.v}
                </a>
              </div>
            ))}
            <div className="border-b border-border py-5">
              <div className="text-[11px] tracking-[0.18em] text-faint uppercase ar:tracking-normal ar:normal-case">
                {tf("office")}
              </div>
              <div className="mt-1.5 text-[1.05rem]">{tf("officev")}</div>
            </div>
            <div className="py-5">
              <div className="text-[11px] tracking-[0.18em] text-faint uppercase ar:tracking-normal ar:normal-case">
                {tf("hours")}
              </div>
              <div className="mt-1.5 text-[1.05rem]">{tf("hoursv")}</div>
            </div>
            <div className="mt-8 h-[min(280px,42vw)] min-h-[200px] overflow-hidden border border-border bg-secondary grayscale-[0.45] contrast-[1.05] max-md:h-[220px]">
              <iframe
                title="Dubai, United Arab Emirates"
                src="https://www.google.com/maps?q=Dubai,+United+Arab+Emirates&z=11&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block size-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
      <div className="relative overflow-hidden bg-navy py-[clamp(3rem,7vw,5.5rem)] text-cream">
        <span
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_90%_at_100%_0%,rgba(138,122,92,.22),transparent_60%)]"
          aria-hidden="true"
        />
        <div className="wrap">
          <div className="relative flex flex-wrap items-end gap-8">
            <div className="max-w-copy min-w-[min(100%,240px)] flex-[1_1_16rem]">
              <p className="mb-3 text-[11px] tracking-[0.2em] text-bronze uppercase ar:tracking-normal ar:normal-case">
                {tc("kicker")}
              </p>
              <h2 className="max-w-[18ch] text-[clamp(1.65rem,3vw,2.35rem)] text-cream">
                {tc("title")}
              </h2>
              <p className="mt-3 max-w-copy text-cream/62">{tc("p")}</p>
            </div>
            <div className="ms-auto flex flex-[0_0_auto] flex-wrap items-end justify-end gap-3 max-md:w-full max-md:flex-col max-md:items-stretch">
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="btn btn-invert max-md:w-full"
              >
                {tc("wa")}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="btn btn-ghost-light max-md:w-full">
                {tc("mail")}
              </a>
              <span className="mt-1 w-full text-end text-[11px] tracking-[0.14em] text-cream/45 uppercase max-md:text-start ar:tracking-normal ar:normal-case">
                {tm("micro2")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
