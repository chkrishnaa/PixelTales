import fetch from "node-fetch";
import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const LOGO_URL =
  "https://res.cloudinary.com/dqajspazz/image/upload/v1788035634/PixelTalesLogoDark_fdk4dc.png";

const loadTemplate = async (templateName) => {
  const templatePath = join(
    __dirname,
    "..",
    "emailTemplates",
    `${templateName}.html`,
  );
  return fs.readFile(templatePath, "utf-8");
};

const renderTemplate = (template, values) =>
  Object.entries(values).reduce(
    (html, [key, value]) =>
      html.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value || ""),
    template,
  );

const sendEmail = async (to, subject, text, html, options = {}) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "PixelTales",
          email: process.env.SENDER_EMAIL,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        textContent: text,
        htmlContent: html,
        replyTo: options?.replyTo ? { email: options.replyTo } : undefined,
        attachment: options?.attachments?.map((file) => ({
          name: file.filename || "attachment",
          content: file.content?.toString("base64"),
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Brevo API error");
    }

    return data;
  } catch (error) {
    console.error("Brevo API Email Error:", error.message);
    throw error;
  }
};

export const sendOTPEmail = async (
  to,
  otp,
  subject = "🔐 Your PixelTales Password Reset OTP",
  message = "Use the one-time password below to reset your PixelTales account password. This OTP is valid for 10 minutes.",
  templateName = "otp-email",
) => {
  const template = await loadTemplate(templateName);

  const siteUrl = process.env.CLIENT_URL || "http://localhost:5173";

  const html = renderTemplate(template, {
    title: subject,
    message,
    otp,
    year: String(new Date().getFullYear()),
    supportEmail: process.env.SENDER_EMAIL || "no-reply@pixeltales.com",
    logo_url: LOGO_URL,
    site_url: siteUrl,
  });

  const text = `${subject}\n\n${message}\n\nYour code: ${otp}`;

  return sendEmail(to, subject, text, html);
};

export const sendTemplateEmail = async (
  to,
  subject,
  message,
  templateName = "generic",
) => {
  const template = await loadTemplate(templateName);

  const siteUrl = process.env.CLIENT_URL || "http://localhost:5173";

  const html = renderTemplate(template, {
    title: subject,
    message,
    year: String(new Date().getFullYear()),
    supportEmail: process.env.SENDER_EMAIL || "no-reply@pixeltales.com",

    dashboard_url: `${siteUrl}/dashboard`,
    profile_url: `${siteUrl}/profile`,
  });

  const text =
    `${subject}\n\n${message}\n\n` +
    `Dashboard: ${siteUrl}/dashboard\n` +
    `Profile: ${siteUrl}/profile`;

  return sendEmail(to, subject, text, html);
};

export default sendEmail;
