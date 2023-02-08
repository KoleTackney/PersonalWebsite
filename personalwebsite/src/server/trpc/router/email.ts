import { mailOptions, transporter } from './../../../utils/nodemailerconfig';
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

async function sendEmail(input: { subject: string, email: string, name: string, message: string }) {
    //Send email here
    try {
        await transporter.sendMail({
            ...mailOptions,
            subject: `Message from ${input.name} - ${input.subject}`,
            text: input.message,
            html: `<h1>Message from ${input.name} - ${input.email}</h1><h2>${input.subject}</h2><p>${input.message}</p>`
        });
    } catch (error) {
        console.log('Message not sent.');
        console.log(error);
        return {
            greeting: `Message not sent.`,
            Error: error
        };
    }
    return true;
}


export const emailRouter = router({
    sendEmail: publicProcedure
        .input(z.object({
            subject: z.string(),
            email: z.string().email(),
            name: z.string(),
            message: z.string(),

        }))
        .query(({ input }) => {
            //Send email here
            const result = sendEmail(input);
            console.log(result);
            return result;
        })
});
