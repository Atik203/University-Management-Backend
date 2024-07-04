import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.nodemailer_auth_user_email,
      pass: config.nodemailer_auth_user_password,
    },
  });

  await transporter.sendMail({
    from: config.nodemailer_auth_user_email, // sender address
    to,
    subject: 'Reset Your Password Within 1hours', // Subject line
    text: 'Reset Your Password Within 1hours', // plain text body
    html,
  });
};
