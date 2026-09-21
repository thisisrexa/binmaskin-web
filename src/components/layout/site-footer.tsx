import { useTranslations } from "next-intl";

import { BrandMark } from "@/components/layout/brand-mark";
import { Link } from "@/i18n/navigation";
import { COMPANY } from "@/lib/company";
import { NAV_SECTIONS } from "@/lib/nav";

export function SiteFooter() {
  const t = useTranslations("foot");
  const tn = useTranslations("nav");
  const tl = useTranslations("legal");

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="wrap">
        <div className="grid grid-cols-[minmax(14rem,1.5fr)_repeat(3,minmax(8rem,1fr))] items-start gap-12 pt-16 pb-12 max-lg:grid-cols-2 max-md:grid-cols-1">
          <div className="max-lg:col-span-full">
            <BrandMark className="h-10 max-w-full" />
            <p className="mt-6 max-w-copy whitespace-pre-line text-[0.9rem] text-muted-foreground">
              {t("blurb")}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-normal tracking-[0.2em] text-faint uppercase ar:tracking-normal ar:normal-case">
              {t("company")}
            </h4>
            {NAV_SECTIONS.map((id) => (
              <Link
                key={id}
                href={`/#${id}`}
                className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
              >
                {tn(id)}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-normal tracking-[0.2em] text-faint uppercase ar:tracking-normal ar:normal-case">
              {t("legal")}
            </h4>
            {(["security", "privacy", "terms", "cookies"] as const).map((id) => (
              <Link
                key={id}
                href={`/${id}`}
                className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
              >
                {tl(id)}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-normal tracking-[0.2em] text-faint uppercase ar:tracking-normal ar:normal-case">
              {t("reach")}
            </h4>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
            >
              {COMPANY.email}
            </a>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
            >
              {COMPANY.phone}
            </a>
            <a
              href={COMPANY.instagram}
              target="_blank"
              rel="noopener"
              className="flex min-h-11 items-center py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-accent"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-border py-5 text-[12px] text-faint">
          <span>{t("copy")}</span>
          <span>
            {t("lic")} · {COMPANY.licence} · {COMPANY.chamber}
          </span>
        </div>
      </div>
    </footer>
  );
}
