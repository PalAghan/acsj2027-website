// LOCALHOST DEMO ONLY. Not part of the real website. Shows how registration emails could work.
// Run with: npm run demo:server   (and keep `npm run dev` running in another terminal)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

const PORT = Number(process.env.DEMO_PORT || 3000);
const ORGANISER = process.env.ORGANISER_EMAIL || '';
const ALLOWED_ORIGINS = new Set(['http://localhost:4321', 'http://127.0.0.1:4321']);
const CATEGORIES = {
  journalist: { label: 'Journalist (demo)', amount: 1000 },
  researcher: { label: 'Researcher (demo)', amount: 1500 },
  other: { label: 'Other participant (demo)', amount: 2000 },
};
const money = (n) => 'KES ' + n.toLocaleString('en-US', { minimumFractionDigits: 2 }) + ' (dummy amount)';
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const hasControlChars = (s) => /[\u0000-\u001f\u007f]/.test(s);

const hits = new Map();
const rateLimited = (ip) => {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60000);
  list.push(now); hits.set(ip, list);
  return list.length > 5;
};

const pdf = (build) => new Promise((resolve) => {
  const doc = new PDFDocument({ margin: 50 });
  const chunks = [];
  doc.on('data', (c) => chunks.push(c));
  doc.on('end', () => resolve(Buffer.concat(chunks)));
  build(doc);
  doc.end();
});

const invoicePdf = (r) => pdf((d) => {
  const paid = r.payment === 'now';
  d.fontSize(22).fillColor('#10583a').text(paid ? 'RECEIPT (DEMO)' : 'INVOICE (DEMO)');
  d.moveDown(0.3).fontSize(10).fillColor('#b00020').text('DEMO DOCUMENT: dummy data, not a real invoice. No payment is required.');
  d.moveDown().fillColor('#000').fontSize(11);
  d.text('6th African Conference of Science Journalists (ACSJ 2027)');
  d.text('26 – 28 April 2027, Nairobi, Kenya');
  d.moveDown().text(`Reference: ${r.reference}`);
  d.text(`Document number: ${r.docNumber}`);
  d.text(`Date: ${new Date().toDateString()}`);
  d.moveDown().text('Billed to:').font('Helvetica-Bold').text(r.name).font('Helvetica').text(r.email);
  if (r.organisation) d.text(r.organisation);
  d.moveDown().text(`Item: Conference registration, ${CATEGORIES[r.category].label}`);
  d.text(`Amount: ${money(CATEGORIES[r.category].amount)}`);
  d.moveDown().font('Helvetica-Bold').text(paid ? 'Status: PAID (simulated)' : 'Status: UNPAID. Due in 14 days (dummy date)').font('Helvetica');
  if (!paid) d.moveDown(0.5).text('Payment details: to be confirmed by MESHA (dummy placeholder).');
});

const programmePdf = () => pdf((d) => {
  d.fontSize(22).fillColor('#10583a').text('Conference Programme (SAMPLE)');
  d.moveDown(0.3).fontSize(10).fillColor('#b00020').text('SAMPLE ONLY: not the real programme. Sessions are dummy placeholders.');
  d.fillColor('#000').fontSize(12);
  [['Day 1, 26 April 2027', ['09:00  Opening (sample)', '10:30  Plenary (sample)', '14:00  Networking (sample)']],
   ['Day 2, 27 April 2027', ['09:00  Workshop (sample)', '11:00  Panel discussion (sample)', '15:00  Exhibition (sample)']],
   ['Day 3, 28 April 2027', ['09:00  Panel discussion (sample)', '12:00  Wrap-up (sample)', '13:00  Closing (sample)']]]
    .forEach(([day, items]) => { d.moveDown().font('Helvetica-Bold').text(day).font('Helvetica'); items.forEach((i) => d.text(i)); });
});

const transport = process.env.SMTP_HOST
  ? nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465), secure: String(process.env.SMTP_PORT || 465) === '465', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
  : null;

const deliver = async (ref, kind, mail) => {
  if (transport) { await transport.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, ...mail }); return 'sent'; }
  const dir = path.join('demo-outbox', ref);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${kind}.html`), `<p><b>To:</b> ${esc(mail.to)}<br><b>Subject:</b> ${esc(mail.subject)}</p><hr>${mail.html}`);
  for (const a of mail.attachments || []) fs.writeFileSync(path.join(dir, `${kind}-${a.filename}`), a.content);
  return 'saved';
};

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  const cors = ALLOWED_ORIGINS.has(origin) ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' } : {};
  const send = (code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json', ...cors }); res.end(JSON.stringify(obj)); };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  if (req.url !== '/api/register' || req.method !== 'POST') return send(404, { ok: false, error: 'Not found' });
  if (!ALLOWED_ORIGINS.has(origin)) return send(403, { ok: false, error: 'Origin not allowed' });
  if (rateLimited(req.socket.remoteAddress)) return send(429, { ok: false, error: 'Too many attempts. Please wait a minute.' });
  let body = '';
  for await (const chunk of req) { body += chunk; if (body.length > 10000) return send(413, { ok: false, error: 'Request too large' }); }
  let data; try { data = JSON.parse(body); } catch { return send(400, { ok: false, error: 'Invalid request' }); }
  if (clean(data.website, 100)) return send(200, { ok: true, reference: 'IGNORED', mode: 'saved' }); // honeypot for bots
  const r = { name: clean(data.name, 100), email: clean(data.email, 150), organisation: clean(data.organisation, 150), category: clean(data.category, 30), payment: clean(data.payment, 10) };
  const bad = r.name.length < 2 || hasControlChars(r.name) || hasControlChars(r.organisation) || !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(r.email) || !CATEGORIES[r.category] || !['now', 'later'].includes(r.payment);
  if (bad) return send(400, { ok: false, error: 'Please check your details and try again.' });
  r.reference = 'DEMO-' + Date.now().toString(36).toUpperCase();
  r.docNumber = (r.payment === 'now' ? 'RCT-' : 'INV-') + r.reference;
  try {
    const attachments = [
      { filename: `${r.payment === 'now' ? 'receipt' : 'invoice'}-${r.reference}.pdf`, content: await invoicePdf(r), contentType: 'application/pdf' },
      { filename: 'ACSJ2027-sample-programme.pdf', content: await programmePdf(), contentType: 'application/pdf' },
    ];
    const banner = '<p style="background:#fff3cd;padding:8px"><b>DEMO MESSAGE.</b> This is a test of the registration email. Nothing here is real.</p>';
    const mode = await deliver(r.reference, 'confirmation', {
      to: r.email, subject: `DEMO: Registration received, ${r.reference}`, attachments,
      html: `${banner}<p>Dear ${esc(r.name)},</p><p>Thank you for registering for the 6th African Conference of Science Journalists (26 – 28 April 2027, Nairobi).</p><p>Your reference is <b>${r.reference}</b>. Attached are your ${r.payment === 'now' ? 'receipt' : 'invoice'} and the sample programme.</p><p>MESHA</p>`,
    });
    if (ORGANISER) await deliver(r.reference, 'organiser-notice', {
      to: ORGANISER, subject: `DEMO: New registration request, ${r.reference}`,
      html: `${banner}<ul><li>Name: ${esc(r.name)}</li><li>Email: ${esc(r.email)}</li><li>Organisation: ${esc(r.organisation || '-')}</li><li>Category: ${esc(CATEGORIES[r.category].label)}</li><li>Payment: ${r.payment === 'now' ? 'Pay now (simulated)' : 'Pay later (invoice)'}</li></ul>`,
    });
    console.log(`[demo] ${r.reference} ${mode === 'sent' ? 'emails sent' : 'saved to demo-outbox/' + r.reference}`);
    send(200, { ok: true, reference: r.reference, mode });
  } catch (e) { console.error('[demo] failed:', e.message); send(500, { ok: false, error: 'Could not send the email. Check the terminal for details.' }); }
});
server.listen(PORT, '127.0.0.1', () => console.log(`Demo registration server running at http://localhost:${PORT} (${transport ? 'sending real email' : 'no SMTP set: saving emails to demo-outbox/'})`));
