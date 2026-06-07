import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST   || 'smtp.gmail.com',
  port:   Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send a 6-digit OTP email for password reset.
 */
export const sendOTPEmail = async (to, otp) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8" /></head>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 16px;">
              <table width="480" cellpadding="0" cellspacing="0"
                     style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0f766e,#06b6d4);padding:32px;text-align:center;">
                    <span style="font-size:28px;">🎬</span>
                    <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                      PixelTales
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:32px 36px;">
                    <h2 style="margin:0 0 8px;font-size:18px;color:#111827;">Password Reset OTP</h2>
                    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">
                      Use the one-time password below to reset your PixelTales account password.
                      This OTP is valid for <strong>10 minutes</strong>.
                    </p>

                    <!-- OTP box -->
                    <div style="text-align:center;margin:0 0 24px;">
                      <span style="display:inline-block;background:#f0fdfa;border:2px dashed #0d9488;
                                   border-radius:12px;padding:16px 40px;
                                   font-size:38px;font-weight:900;letter-spacing:12px;color:#0f766e;">
                        ${otp}
                      </span>
                    </div>

                    <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
                      If you did not request this, you can safely ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;padding:16px 36px;text-align:center;
                             border-top:1px solid #e5e7eb;">
                    <p style="margin:0;color:#9ca3af;font-size:11px;">
                      © ${new Date().getFullYear()} PixelTales. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from:    process.env.EMAIL_FROM || 'PixelTales <no-reply@pixeltales.com>',
    to,
    subject: '🔐 Your PixelTales Password Reset OTP',
    html,
  });
};
