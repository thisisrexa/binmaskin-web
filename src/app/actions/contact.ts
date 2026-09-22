'use server';

import nodemailer from 'nodemailer';

import type { ContactPayload } from '@/lib/email-template';

import { COMPANY } from '@/lib/company';
import { contactEmailHtml } from '@/lib/email-template';

export type ContactResult = 'failed' | 'invalid' | 'sent' | 'unavailable';

function validEmail(email: string) {
  const at = email.indexOf('@');
  const dot = email.lastIndexOf('.');
  return (
    at > 0 && dot > at + 1 && dot < email.length - 1 && !email.includes(' ')
  );
}

export async function sendContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();
  if (!name || !message || !validEmail(email)) return 'invalid';

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } =
    process.env;
  if (!SMTP_HOST || !SMTP_FROM) return 'unavailable';

  const clean: ContactPayload = {
    name,
    email,
    phone: payload.phone.trim(),
    topic: payload.topic,
    message,
  };

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT ?? 587) === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    await transport.sendMail({
      from: SMTP_FROM,
      to: CONTACT_TO ?? COMPANY.email,
      replyTo: email,
      subject: `Website inquiry — ${clean.topic} — ${name}`,
      html: contactEmailHtml(clean),
    });
    return 'sent';
  } catch {
    return 'failed';
  }
}
