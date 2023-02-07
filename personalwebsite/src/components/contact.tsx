import { useState } from "react";
import Title from "./title";

type ContactProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function Contact() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    //Loop through the form data and check if any fields are empty
    const emptyFields: string[] = [];
    formData.forEach((value, key) => {
      if (value === "") {
        emptyFields.push(key);
      }
    });

    if (emptyFields.length > 0) {
      let forgotToFillOut = "Please fill out the following fields: ";
      emptyFields.forEach((field) => {
        forgotToFillOut += field + ", ";
        console.log(field);
      });
      alert(forgotToFillOut);
      return;
    }

    const contact: ContactProps = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };
    // Replace with trpc call
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      alert("Something went wrong, please try again later");
      return;
    } else {
      setEmailSent(true);
    }
  };

  return emailSent
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
              placeholder="Name"
              className="p-2 bg-transparent border-2 rounded-md focus:outline-none"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Adress"
              className="my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none"
            />
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              className="my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none"
            />
            <textarea
              id="message"
              name="message"
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
