import { type NextApiRequest, type NextApiResponse } from "next";
import { mailOptions, transporter } from "../../utils/nodemailerconfig";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    console.log('Request received.');

    if (req.method !== 'POST') {
        console.log('Only POST requests are accepted.');
        res.status(400).send('Only POST requests are accepted.');
        return;
    }

    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        console.log('Please fill in all fields.');
        res.status(400).send('Please fill in all fields.');
        return;
    }

    try {
        await transporter.sendMail({
            ...mailOptions,
            subject: `Message from ${name} - ${subject}`,
            text: message,
            html: `<h1>Message from ${name}</h1>
            <h2>${subject}</h2>
            <h2>${email}</h2>
            <p>${message}</p>`
        });
        res.status(200).send('Message sent successfully.');
    } catch (error) {
        console.log('Message not sent.');
        console.log(error);
        res.status(400).send('Message not sent.');
    }
};

export default handler;