"use server";
import WelcomeEmail from "@/emails/signup";
import { resend } from "../../lib/resend";

interface signupProps {
    userFirstname: string;
    email: string
}

const sendEmail = async (data: signupProps) => {
    try {
        const response = await resend.emails.send({
            from: "Ascentio <welcome@hello.ascentio.xyz>",
            to: data.email,
            subject: "Welcome to Ascentio",
            react: WelcomeEmail({ userFirstname: data.userFirstname }),
        });
        console.log("Email sent",response);
        return { status: 200, message: "Email sent" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: error };
    }
};

export default sendEmail;