import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { version, email, message } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, error: "Email requerido" },
        { status: 400 },
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
<title>Neo WiFi - Comprobante</title>
<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #EDF2F0;
    margin: 0;
    padding: 0;
    color: #16222B;
  }
  .mono {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  .eyebrow {
    font-size: 12px;
    letter-spacing: 2px;
    color: #0B6E76;
    font-weight: 700;
    text-transform: uppercase;
  }
  .headline {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 26px;
    font-weight: 900;
    letter-spacing: -0.5px;
    color: #16222B;
    text-transform: uppercase;
  }
  .subhead {
    font-size: 14px;
    color: #5C6B73;
  }
  .body-text {
    font-size: 15px;
    line-height: 1.6;
    color: #2E3A42;
  }
  .terminal-label {
    font-size: 11px;
    letter-spacing: 1px;
    color: #7FA8A2;
    text-transform: uppercase;
  }
  .terminal-line {
    font-size: 13px;
    color: #CFE8E4;
    line-height: 1.7;
  }
  .feature-tag {
    font-size: 12px;
    font-weight: 700;
    color: #0B6E76;
    border: 1px solid #0B6E76;
    padding: 3px 7px;
    letter-spacing: 0.5px;
  }
  .feature-title {
    font-size: 14px;
    font-weight: 700;
    color: #16222B;
  }
  .feature-desc {
    font-size: 13px;
    color: #5C6B73;
    line-height: 1.5;
  }
  .btn {
    display: block;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;
    padding: 14px 0;
    border-radius: 3px;
  }
  .btn-solid {
    background-color: #0B6E76;
    color: #ffffff !important;
  }
  .btn-outline {
    background-color: transparent;
    color: #16222B !important;
    border: 2px solid #16222B;
  }
  .footer-text {
    font-size: 12px;
    color: #8A9A94;
  }
  .footer-link {
    font-size: 12px;
    color: #5C6B73;
    text-decoration: none;
  }
  @media (max-width: 600px) {
    .container-table { width: 100% !important; }
    .feature-cell { display: block !important; width: 100% !important; padding: 0 0 20px 0 !important; }
  }
</style>
</head>
<body>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#EDF2F0;">
<tr><td align="center" style="padding:32px 16px;">

<table role="presentation" class="container-table" width="600" cellpadding="0" cellspacing="0"
  style="max-width:600px; width:100%; background:#ffffff; border:1px solid #C9D6D2;">

  <!-- Top strip -->
  <tr>
    <td style="padding:24px 36px 0 36px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td valign="middle">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="bottom" style="padding:0 1px;"><div style="width:5px;height:8px;background:#0B6E76;"></div></td>
                <td valign="bottom" style="padding:0 1px;"><div style="width:5px;height:13px;background:#0B6E76;"></div></td>
                <td valign="bottom" style="padding:0 1px;"><div style="width:5px;height:18px;background:#0B6E76;"></div></td>
                <td valign="bottom" style="padding:0 1px;"><div style="width:5px;height:23px;background:#0B6E76;"></div></td>
                <td style="padding-left:10px;" class="eyebrow mono">neo-wifi &middot; comprobante</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Headline -->
  <tr>
    <td style="padding:20px 36px 0 36px;">
      <div class="headline">Mensaje recibido</div>
      <div class="subhead" style="padding-top:4px;">Te respondemos a la brevedad</div>
    </td>
  </tr>

  <!-- Dashed divider -->
  <tr>
    <td style="padding:22px 36px 0 36px;">
      <div style="border-top:1px dashed #C9D6D2;"></div>
    </td>
  </tr>

  <!-- Body text -->
  <tr>
    <td style="padding:22px 36px 0 36px;">
      <div class="body-text">Recibimos correctamente tu mensaje desde Neo WiFi. Quedó registrado con estos datos:</div>
    </td>
  </tr>

  <!-- Terminal card -->
  <tr>
    <td style="padding:16px 36px 0 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#101820;">
        <tr>
          <td style="padding:12px 16px 4px 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:8px;height:8px;background:#E24B4A;border-radius:50%;font-size:0;line-height:0;">&nbsp;</td>
                <td style="width:6px;"></td>
                <td style="width:8px;height:8px;background:#EF9F27;border-radius:50%;font-size:0;line-height:0;">&nbsp;</td>
                <td style="width:6px;"></td>
                <td style="width:8px;height:8px;background:#5DCAA5;border-radius:50%;font-size:0;line-height:0;">&nbsp;</td>
                <td style="padding-left:10px;" class="terminal-label mono">contacto.log</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 16px 16px 16px;">
            <div class="terminal-line mono">&gt; version: 1.4.2</div>
            <div class="terminal-line mono">&gt; mensaje: "La app se cierra sola cuando cambio<br>&nbsp;&nbsp;de antena en zona rural, ¿es un bug conocido?"</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Features -->
  <tr>
    <td style="padding:28px 36px 0 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="feature-cell" width="50%" valign="top" style="padding-right:14px;">
            <span class="feature-tag mono">AN</span>
            <div class="feature-title" style="padding-top:10px;">Monitoreo de antenas</div>
            <div class="feature-desc" style="padding-top:4px;">Accedé a información detallada sobre cada antena del sistema provincial.</div>
          </td>
          <td class="feature-cell" width="50%" valign="top" style="padding-left:14px;">
            <span class="feature-tag mono">PC</span>
            <div class="feature-title" style="padding-top:10px;">Gestión simplificada</div>
            <div class="feature-desc" style="padding-top:4px;">Administrá tu conexión desde tu PC de manera eficiente y sin complicaciones.</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Note -->
  <tr>
    <td style="padding:22px 36px 0 36px;">
      <div class="footer-text">¿Necesitás agregar algo más? Respondé directamente a este correo.</div>
    </td>
  </tr>

  <!-- Buttons -->
  <tr>
    <td style="padding:26px 36px 0 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding-bottom:10px;"><a href="https://neo-wifi.vercel.app" class="btn btn-solid">Volver a Neo WiFi</a></td></tr>
        <tr><td><a href="https://neo-wifi.vercel.app/download" class="btn btn-outline">Probar la app</a></td></tr>
      </table>
    </td>
  </tr>

  <!-- Divider -->
  <tr>
    <td style="padding:28px 36px 0 36px;">
      <div style="border-top:1px dashed #C9D6D2;"></div>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:18px 36px 28px 36px;">
      <div class="footer-text mono">© 2025 neo-wifi &middot; san luis, argentina</div>
      <div style="padding-top:8px;">
        <a href="mailto:calcagni.gabriel86@gmail.com" class="footer-link mono">[correo]</a>&nbsp;&nbsp;
        <a href="https://calcagni-gabriel.vercel.app" class="footer-link mono">[web]</a>&nbsp;&nbsp;
        <a href="tel:5492665290020" class="footer-link mono">[tel]</a>
      </div>
    </td>
  </tr>

</table>
</td></tr>
</table>

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
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { error: "No se envió el email [" + error + "]" },
      { status: 500 },
    );
  }
}
