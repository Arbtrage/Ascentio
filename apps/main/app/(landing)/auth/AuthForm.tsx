"use client";
import { useState } from "react";
import { Button } from "@ui/components/button"
import { Input } from "@ui/components/input"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";



export function AuthForm() {

    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const router = useRouter();



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (!signup) {
            console.log("Logging in with:");
            await signIn("login", { email: email, password: password });
            router.push("/en")
        } else {
            console.log("Signing up with:");
            await signIn("register", { email: email, password: password });
            router.push("/en")
        }
    };

    return (
        <>
            <div className="flex justify-center">

                <div className="w-full max-w-md">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {signup ? "Sign Up" : "Sign In"}
                        </h1>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="mt-2">
                                <div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mt-2">
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                        </div>

                        {!signup && <>
                            <div className="mt-6">
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        </>}

                        <div className="mt-6">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                                onSubmit={handleSubmit}
                            >
                                {loading ? "Loading..." : signup ? "Sign Up" : "Sign In"}
                            </Button>
                        </div>




                        {/* Login options with google and github */}
                        {!signup && <>
                            <div className="mt-6 flex flex-col gap-2">
                                <div className="text-md">
                                    <Button
                                        variant={"outline"}
                                        className="font-medium w-full flex gap-2"
                                    >
                                        <FcGoogle size={25} />
                                        Login with Google
                                    </Button>
                                </div>
                                <div className="text-md">
                                    <Button
                                        variant={"outline"}
                                        className="font-medium w-full flex gap-2"
                                    >
                                        <FaGithub size={25} />
                                        Login with Github
                                    </Button>
                                </div>
                            </div>
                        </>}

                        {/* Toggle between signup and login */}
                        {signup ? <>
                            <div className="mt-6 flex items-end justify-center w-full">
                                <div className="text-sm">
                                    <Button
                                        variant={"link"}
                                        onClick={() => setSignup(false)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500 w-full"
                                    >
                                        Already have an account? Login
                                    </Button>
                                </div>
                            </div>
                        </> : <>
                            <div className="mt-6 flex items-center justify-center w-full">
                                <div className="text-sm">
                                    <Button
                                        onClick={() => setSignup(true)}
                                        variant={"link"}
                                        className="font-medium text-indigo-600 hover:text-indigo-500 w-full"
                                    >
                                        Don't have an account? Sign Up
                                    </Button>
                                </div>
                            </div>
                        </>}


                    </div>
                </div>
            </div>
        </>
    );
}