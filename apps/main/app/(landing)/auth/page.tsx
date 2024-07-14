import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "../../../lib/auth";
import { AuthForm } from "./AuthForm";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Log in | Ascentio",
    description: "Log in to Ascentio",
    alternates: { canonical: "/login" },
};

export default async function AuthenticationPage() {

    const session = await getSession();
    if (session) {
        redirect("/dashboard");
    }

    return (
        <div className="flex h-screen flex-col justify-center text-gray-900 duration-500 animate-in fade-in">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col text-center mb-5">
                    <h1 className="font-cal text-5xl font-semibold">Ascentio</h1>
                    <p className="mt-4">Your AI personal assistant for poject management.</p>
                </div>
                <div className="mt-4">
                    <Suspense>
                        <AuthForm />
                    </Suspense>
                </div>

                <p className="px-8 pt-10 text-center text-sm text-gray-500">
                    By clicking continue, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="underline underline-offset-4 hover:text-gray-900"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-gray-900"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}