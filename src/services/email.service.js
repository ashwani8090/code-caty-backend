const nodemailer = require("nodemailer");
const { smtp } = require("../config");

const transport = nodemailer.createTransport(smtp);

const sendEmail = async (to, subject, text, html) => {
  const msg = { from: process.env.SMTP_EMAIL, to, subject, text, html };
  try {
    await transport.sendMail(msg);
  } catch (err) {
    console.log("Error sending email: ", err);
    throw new Error(err);
  }
};

const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${process.env.EMAIL_VERIFICATION_URL}${token}`;

  const htmlContent = `
    <p>Dear user,</p>
    <p>To verify your email, click on the button below:</p>
    <a href="${verificationEmailUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 20px; font-size: 16px; text-align: center; text-decoration: none; border-radius: 4px;">
      Verify Email
    </a>
    <p>If you did not create an account, please ignore this email.</p>
  `;

  const text = `Dear user,
  To verify your email, click on this link: ${verificationEmailUrl}
  If you did not create an account, then ignore this email.`;

  await sendEmail(to, subject, text, htmlContent);
};

module.exports = {
  sendVerificationEmail,
  sendEmail,
};
