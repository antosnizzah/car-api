import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (email: string, subject: string, message: string, html: string) => {
    try {
        console.log('EMAIL:', process.env.EMAIl);
        console.log('PASSWORD:', process.env.PASSWORD);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: message,
            html: html,
        };

        const mailRes = await transporter.sendMail(mailOptions);
        console.log('mailRes', mailRes);

        let mailResponse: string = '';
        if (mailRes.accepted.length > 0) {
            mailResponse = 'Email sent successfully';
        } else if (mailRes.rejected.length > 0) {
            mailResponse = 'Email not sent';
        } else {
            mailResponse = 'Email server error';
        }
        return mailResponse;
    } catch (error: any) {
        return JSON.stringify(error.message, null, 500);
    }
};

export const sendRegistrationEmailTemplate = async (email: string, subject: string, username: string, verificationUrl: string) => {
    const templatePath = path.join(__dirname, 'views', 'emails', 'value3.ejs');
    const html = await ejs.renderFile(templatePath, { username, verificationUrl, imageUrl: 'https://i.pinimg.com/236x/bf/30/49/bf3049c49ba999b811202dd950168b03.jpg' });

    return sendEmail(email, subject, `Hello ${username},`, html);
};
