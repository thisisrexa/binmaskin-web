'use server';

import nodemailer from 'nodemailer';

import type { ContactPayload } from '@/lib/email-template';

import { COMPANY } from '@/lib/company';
import {
  contactEmailHtml,
  contactEmailText,
  topicLabel,
} from '@/lib/email-template';

export type ContactResult = 'failed' | 'invalid' | 'sent' | 'unavailable';

function validEmail(email: string) {
  const at = email.indexOf('@');
  const dot = email.lastIndexOf('.');
  return (
    at > 0 &&
    at === email.lastIndexOf('@') &&
    dot > at + 1 &&
    dot < email.length - 1 &&
    !/[\s<>]/.test(email)
  );
}

function isContactPayload(input: unknown): input is ContactPayload {
  if (!input || typeof input !== 'object') return false;
  const fields = input as Record<string, unknown>;
  return (['name', 'email', 'phone', 'topic', 'message'] as const).every(
    (key) => typeof fields[key] === 'string',
  );
}

function validContact(payload: ContactPayload) {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const phone = payload.phone.trim();
  const message = payload.message.trim();
  return (
    Boolean(name) &&
    name.length <= 100 &&
    !/[\n\r]/.test(name) &&
    Boolean(message) &&
    message.length <= 5000 &&
    email.length <= 254 &&
    validEmail(email) &&
    phone.length <= 40 &&
    !/[\n\r]/.test(phone) &&
    ['finance', 'general', 'partnership', 'project', 'technical'].includes(
      payload.topic,
    )
  );
}

export async function sendContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (!isContactPayload(payload) || !validContact(payload)) return 'invalid';

  const name = payload.name.trim();
  const email = payload.email.trim();
  const phone = payload.phone.trim();
  const message = payload.message.trim();

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } =
    process.env;
  if (!SMTP_HOST || !SMTP_FROM) return 'unavailable';

  const clean: ContactPayload = {
    name,
    email,
    phone,
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
      subject: `Website inquiry — ${topicLabel(clean.topic)} — ${name}`,
      text: contactEmailText(clean),
      html: contactEmailHtml(clean),
    });
    return 'sent';
  } catch {
    return 'failed';
  }
}
