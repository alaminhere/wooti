import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (code, email) => {
  await transporter.sendMail({
    from: `"Wooti" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Account',
    text: `Your verification code is: ${code}`,

    html: `
      <div style="
        max-width: 500px;
        margin: auto;
        padding: 40px 20px;
        font-family: Arial, sans-serif;
        background: #f9fafb;
      ">
        <div style="
          background: white;
          padding: 40px 30px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        ">
          <h1 style="
            margin: 0;
            color: #111827;
            font-size: 28px;
          ">
            Wooti
          </h1>

          <p style="
            margin-top: 20px;
            color: #4b5563;
            font-size: 16px;
            line-height: 1.6;
          ">
            Verify your account using the code below.
          </p>

          <div style="
            margin: 30px 0;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #2563eb;
          ">
            ${code}
          </div>

          <p style="
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
          ">
            This code will expire soon. If you didn’t request this,
            you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
};

export default sendVerificationEmail;
