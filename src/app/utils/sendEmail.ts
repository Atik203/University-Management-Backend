import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'atikurrahaman0304@gmail.com',
      pass: 'wkkj zxtq ijja zsxz',
    },
  });

  await transporter.sendMail({
    from: 'atikurrahaman0304@gmail.com', // sender address
    to,
    subject: 'Change Password', // Subject line
    text: 'Reset Your Password Within 1hours', // plain text body
    html,
  });
};
