import { getPerson } from '@/lib/people';
import { toVCard } from '@/lib/vcard';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> },
) {
  const { locale, slug } = await params;
  const person = getPerson(slug);
  if (!person) return new Response(null, { status: 404 });

  const body = toVCard({
    given: person.given,
    family: person.family,
    org: person.org,
    title: locale === 'ar' ? 'الشريك المؤسس' : person.title,
    email: person.email,
    url: person.website,
    linkedin: person.linkedin,
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${person.username}.vcf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
