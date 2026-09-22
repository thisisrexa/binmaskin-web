import { escapeXml } from '@/lib/xml';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

const NAVY = '#111C2D';
const BRONZE = '#8A7A5C';
const IVORY = '#F7F4EF';

function row(label: string, value: string) {
  return `<tr>
  <td style="padding:10px 0;border-bottom:1px solid #e5dfd4;color:${BRONZE};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;vertical-align:top;width:120px;">${escapeXml(label)}</td>
  <td style="padding:10px 0 10px 16px;border-bottom:1px solid #e5dfd4;color:${NAVY};font-size:14px;line-height:1.6;">${value}</td>
</tr>`;
}

export function contactEmailHtml(payload: ContactPayload) {
  const message = escapeXml(payload.message).replace(/\r?\n/g, '<br/>');
  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:${IVORY};font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5dfd4;">
    <div style="background:${NAVY};padding:20px 24px;">
      <span style="color:${IVORY};font-size:13px;letter-spacing:0.18em;text-transform:uppercase;">Binmaskin Solutions</span>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 16px;color:${NAVY};font-size:16px;">New inquiry from the website</p>
      <table role="presentation" style="width:100%;border-collapse:collapse;">
        ${row('Name', escapeXml(payload.name))}
        ${row('Email', `<a href="mailto:${escapeXml(payload.email)}" style="color:${BRONZE};">${escapeXml(payload.email)}</a>`)}
        ${row('Phone', escapeXml(payload.phone) || '—')}
        ${row('Topic', escapeXml(payload.topic))}
        ${row('Message', message)}
      </table>
    </div>
    <div style="padding:12px 24px;border-top:1px solid #e5dfd4;color:#9a927f;font-size:11px;">
      binmaskin.solutions · Dubai, UAE
    </div>
  </div>
</body>
</html>`;
}

const check = contactEmailHtml({
  name: '<b>A</b>',
  email: 'a@b.co',
  phone: '',
  topic: 'general',
  message: 'hi\nthere',
});

if (
  !check.includes('&lt;b&gt;A&lt;/b&gt;') ||
  !check.includes('hi<br/>there') ||
  !check.includes(NAVY)
) {
  throw new Error('contactEmailHtml broke');
}
