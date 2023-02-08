import { useState } from "react";
import Title from "./title";
import { trpc } from "../utils/trpc";
import { date, z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  message: z.string().min(1),
  subject: z.string().min(1),
});

export function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  trpc.email.sendEmail.useQuery({
    name,
    email,
    subject,
    message,
  }, {
    enabled: sendEmail,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const data = schema.parse({
        email: formData.get("email"),
        name: formData.get("name"),
        message: formData.get("message"),
        subject: formData.get("subject"),
      });

      setEmail(data.email);
      setName(data.name);
      setMessage(data.message);
      setSubject(data.subject);
      setSendEmail(true);
    } catch (error) {
      console.log(error);
      alert("Please fill out all fields");
      return;
    }
  };

  return sendEmail
    ? (
      <div className="flex flex-col mx-auto pb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-32 h-32 justify-center animate-pulse items-center mx-auto text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="justify-center text-center font-semibold pt-3">
          Thank you for your message! I will be sure to respond as soon as
          possible.
        </h3>
      </div>
    )
    : (
      <div className="flex flex-col mx-auto">
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <Title>Contact</Title>
            <input
              type="text"
              id="name"
              name="name"
              required={true}
              placeholder="Name"
              className="p-2 bg-transparent border-2 rounded-md focus:outline-none"
            />
            <input
              type="email"
              id="email"
              name="email"
              required={true}
              placeholder="Email Adress"
              className="my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none"
            />
            <input
              type="text"
              id="subject"
              name="subject"
              required={true}
              placeholder="Subject"
              className="my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none"
            />
            <textarea
              id="message"
              name="message"
              required={true}
              placeholder="Message"
              className="p-2 bg-transparent border-2 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="text-center inline-block my-3 px-3 py-3 w-max font-medium rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-stone-100 drop-shadow-md motion-safe:hover:scale-105 motion-safe:hover:stroke-transparent"
            >
              Send me a message
            </button>
          </form>
        </div>
      </div>
    );
}
