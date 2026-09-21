import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { LegalPage, type LegalId } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";

const DOCS = ["privacy", "terms", "cookies", "security"] as const;

function isDoc(value: string): value is LegalId {
  return (DOCS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return DOCS.map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isDoc(doc)) return {};
  const tl = await getTranslations({ locale, namespace: "legal" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: `/${doc}`,
    title: tl(doc),
    description: tm(`${doc}Desc`),
  });
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { doc } = await params;
  if (!isDoc(doc)) notFound();
  return <LegalPage id={doc} />;
}
