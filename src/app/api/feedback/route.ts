import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { version, email, message } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, error: "Email requerido" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Hemos recibido tu mensaje en Neo WiFi",
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
        body {
        font-family: "Helvetica Neue", Arial, sans-serif;
        background-color: #f8f9fa;
        margin: 0;
        padding: 30px;
        color: #333;
        }
        .container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        .logo {
        text-align: center;
        margin-bottom: 25px;
        }
        .logo-icon {
        font-size: 36px;
        background: linear-gradient(45deg, #5389e7, #3498db);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
        margin-bottom: 5px;
        }
        .header {
        font-size: 28px;
        font-weight: 600;
        color: #2c3e50;
        text-align: center;
        margin-bottom: 5px;
        letter-spacing: -0.5px;
        }
        .subheader {
        text-align: center;
        color: #7f8c8d;
        font-size: 15px;
        margin-bottom: 30px;
        font-weight: 300;
        }
        .divider {
        height: 1px;
        background: linear-gradient(
          to right,
          transparent,
          #e0e0e0,
          transparent
        );
        margin: 25px 0;
        }
        .content {
        font-size: 16px;
        line-height: 1.6;
        color: #444;
        margin: 25px 0;
        text-align: left;
        }
        .highlight {
        background-color: #f0f7ff;
        border-left: 4px solid #3498db;
        padding: 15px;
        margin: 20px 0;
        border-radius: 0 6px 6px 0;
        }
        .message-box {
        background: #f8fafc;
        border: 1px solid #dbeafe;
        border-radius: 10px;
        padding: 18px;
        margin: 20px 0;
        color: #334155;
        white-space: pre-wrap;
        }
        .button-container {
        text-align: center;
        margin: 35px 0 25px;
        }
        .button {
        display: inline-block;
        padding: 14px 32px;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 500;
        letter-spacing: 0.5px;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
        }
        .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(52, 152, 219, 0.4);
        }
        .features {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        flex-wrap: wrap;
        }
        .feature {
        flex-basis: 48%;
        margin-bottom: 20px;
        }
        .feature-icon {
        font-size: 22px;
        width: fit-content;
        padding: 2px;
        display: flex;
        background: #eee;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        }
        .feature-title {
        font-weight: 600;
        margin-bottom: 5px;
        color: #2c3e50;
        }
        .feature-desc {
        font-size: 14px;
        color: #666;
        }
        .footer {
        text-align: center;
        color: #95a5a6;
        font-size: 13px;
        margin-top: 35px;
        font-weight: 300;
        }
        .social {
        text-align: center;
        margin-top: 15px;
        }
        .social a {
        display: inline-block;
        margin: 0 8px;
        color: #7f8c8d;
        text-decoration: none;
        font-size: 18px;
        }
        @media (max-width: 600px) {
        body {
          padding: 15px;
        }
        .container {
          padding: 25px;
        <div class="header">Gracias por escribirnos</div>
        <div class="subheader">Recibimos tu mensaje y te responderemos a la brevedad</div>
          flex-basis: 100%;
        }
        }
        </style>
        Hola, te confirmamos que recibimos correctamente tu mensaje desde Neo WiFi.
        <div class="logo">
        <div class="logo-icon">📡</div>
        </div>
        ${version ? `Versión asociada: ${version}` : "Gracias por compartir tu comentario con nosotros."}

        <div class="divider"></div>
        <div class="message-box">
        <strong>Tu mensaje:</strong><br />
        ${message ? message : "No se recibió un mensaje en el formulario."}
            Accede a información detallada sobre cada antena del sistema
            provincial.
          </div>
        <a href="https://neo-wifi.vercel.app" class="button"
          >Volver a Neo WiFi</a
          <div class="feature-icon">💻</div>
          <div class="feature-title">Gestión Simplificada</div>
          <div class="feature-desc">
            Administra tu conexión desde tu PC de manera eficiente y sin
            complicaciones.
          </div>
        Si necesitas agregar más detalles, puedes responder a este correo.
        </div>

        <div class="button-container">
        <a href="https://neo-wifi.vercel.app/download" class="button"
          >Prueba Neo-Wifi App</a
        >
        </div>

        <div class="divider"></div>

        <div class="footer">
        © 2025 Neo-Wifi App. Todos los derechos reservados.
        </div>

        <div class="social">
        <a href="mailto:calcagni.gabriel86@gmail.com">✉️</a>
        <a href="https://calcagni-gabriel.vercel.app">🌐</a>
        <a href="tel:5492665290020">📱</a>
        </div>
        </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json(
      {
        success: true,
        message: `Se ha enviado una respuesta a ${email}. Si no la ves, revisa también la carpeta de SPAM.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "No se envió el email [" + error + "]" },
      { status: 500 }
    );
  }
}
