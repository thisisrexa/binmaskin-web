"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { COMPANY } from "@/lib/company";
import { NAV_SECTIONS } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === "/";
  const hrefFor = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-70 h-0.5 bg-transparent"
        aria-hidden="true"
      >
        <i className="scroll-progress block h-full w-full bg-accent" />
      </div>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-lg">
        <div className="wrap">
          <div className="flex h-[var(--hdr)] items-center justify-between gap-4">
            <Link href="/" aria-label="Binmaskin home" className="flex min-h-11 shrink-0 items-center">
              <BrandMark className="h-[22px] max-w-[min(46vw,240px)] md:h-[26px]" priority />
            </Link>
            <nav
              className="hidden gap-8 text-[12px] font-normal tracking-[0.14em] text-muted-foreground uppercase lg:flex ar:tracking-normal ar:normal-case"
              aria-label="Primary"
            >
              {NAV_SECTIONS.map((id) => (
                <a key={id} href={hrefFor(id)} className="nav-link">
                  {t(id)}
                </a>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-3">
              <div
                className="hidden h-11 items-stretch border border-border bg-transparent sm:inline-flex"
                role="group"
                aria-label="Language"
              >
                <LangSwitch locale={locale} pathname={pathname} />
              </div>
              <div className="hidden lg:block">
                <a href={hrefFor("contact")} className="btn btn-solid btn-sm">
                  {t("cta")}
                </a>
              </div>
              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger
                    className="icon-btn inline-flex"
                    aria-label="Menu"
                    aria-expanded={open}
                  >
                    <Menu />
                  </SheetTrigger>
                  <SheetContent
                    side={locale === "ar" ? "left" : "right"}
                    showCloseButton={false}
                    className="max-w-none gap-0 border-0 bg-cream p-0 shadow-none duration-500 data-[side=left]:w-full data-[side=left]:sm:max-w-none data-[side=right]:w-full data-[side=right]:sm:max-w-none"
                  >
                    <SheetTitle className="sr-only">{t("home")}</SheetTitle>
                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between border-b border-border px-[var(--gutter)] py-5">
                        <BrandMark className="h-6" />
                        <button
                          type="button"
                          className="icon-btn inline-flex"
                          aria-label="Close"
                          onClick={() => setOpen(false)}
                        >
                          <X />
                        </button>
                      </div>
                      <nav className="flex flex-1 flex-col px-[var(--gutter)] pt-2 pb-8">
                        {(["home", ...NAV_SECTIONS] as const).map((id) => (
                          <a
                            key={id}
                            href={id === "home" ? (home ? "#home" : "/") : hrefFor(id)}
                            onClick={() => setOpen(false)}
                            className="m-link"
                          >
                            {t(id)}
                          </a>
                        ))}
                        <div className="mt-10 inline-flex h-11 w-fit items-stretch border border-border sm:hidden">
                          <LangSwitch locale={locale} pathname={pathname} />
                        </div>
                        <div className="mt-auto pt-10 text-[0.95rem] text-muted-foreground">
                          <a href={`mailto:${COMPANY.email}`} className="block py-1 transition-colors hover:text-accent">
                            {COMPANY.email}
                          </a>
                          <a href={`tel:${COMPANY.phoneTel}`} className="block py-1 transition-colors hover:text-accent">
                            {COMPANY.phone}
                          </a>
                        </div>
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function LangSwitch({ locale, pathname }: { locale: string; pathname: string }) {
  return (
    <>
      <Link
        href={pathname}
        locale="en"
        aria-pressed={locale === "en"}
        className={cn(
          "flex min-w-11 items-center px-3.5 text-[11px] tracking-[0.16em] uppercase transition-colors",
          locale === "en" ? "bg-navy text-cream" : "text-muted-foreground hover:text-foreground",
        )}
      >
        EN
      </Link>
      <Link
        href={pathname}
        locale="ar"
        aria-pressed={locale === "ar"}
        className={cn(
          "flex min-w-11 items-center px-3.5 font-sans-ar text-[13px] transition-colors",
          locale === "ar" ? "bg-navy text-cream" : "text-muted-foreground hover:text-foreground",
        )}
      >
        عربي
      </Link>
    </>
  );
}
