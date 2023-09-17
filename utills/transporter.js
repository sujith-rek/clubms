import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    from: process.env.EMAIL,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    secure: true,
});

