
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, company, email, service, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nuevo Contacto desde Website</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
          .header { background-color: #000; color: #fff; padding: 15px; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; font-size: 0.9em; color: #666; }
          .value { margin-top: 5px; }
          .footer { margin-top: 20px; font-size: 0.8em; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0;">Nuevo Mensaje de Contacto</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nombre:</div>
              <div class="value">${name}</div>
            </div>
            ${company ? `
            <div class="field">
              <div class="label">Empresa:</div>
              <div class="value">${company}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            ${service ? `
            <div class="field">
              <div class="label">Servicio de Interés:</div>
              <div class="value">${service}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Mensaje:</div>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div class="footer">
            Enviado desde el formulario de contacto de noskygroup.com
          </div>
        </div>
      </body>
      </html>
    `;

        const data = await resend.emails.send({
            from: 'NOSKY Website <onboarding@resend.dev>', // Using default until domain is verified, or use provided domain if available.
            to: ['fergi@noskygroup.com'], // Primary destination
            subject: `Nuevo Proyecto: ${name} - ${service || 'General'}`,
            html: emailHtml,
            replyTo: email,
        });

        if (data.error) {
            console.error("Resend Error:", data.error);
            return NextResponse.json({ error: data.error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
