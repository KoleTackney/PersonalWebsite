import nodeMailer from 'nodemailer';

//const { EMAIL, EMAIL_PASSWORD } = process.env;
const EMAIL = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;
console.log('EMAIL: ', EMAIL);
console.log('EMAIL_PASSWORD', pass)

export const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass
    }
});

export const mailOptions = {
    from: EMAIL,
    to: EMAIL,
};

