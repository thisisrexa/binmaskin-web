import { getPerson, personText } from '@/lib/people';
import { toVCard } from '@/lib/vcard';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> },
) {
  const { locale, slug } = await params;
  const person = getPerson(slug);
  if (!person) return new Response(null, { status: 404 });

  const copy = personText(person, locale);
  const body = toVCard({
    given: person.given,
    family: person.family,
    fn: locale === 'ar' ? copy.name : `${person.given} ${person.family}`,
    org: copy.org,
    title: copy.title,
    email: person.email,
    phone: person.phone,
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
