"use client";
import { useState } from "react";
import { Button } from "@ui/components/button"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from "@ui/components/input"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export function AuthForm() {

    const router = useRouter();
    const [signup, setSignup] = useState(false)
    const [loading, setLoading] = useState(false)



    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            const { email, password } = values;
            if (signup) {
                const response = await signIn("register", { email, password, redirect: false });
                if (!response?.ok) {
                    toast.error(response?.error);
                } else {
                    router.push("/welcome")
                }
            } else {
                const response = await signIn("login", { email, password, redirect: false });
                if (!response?.ok) {
                    toast.error(response?.error);
                } else {
                    router.push("/dashboard")
                }
            }
        },
    });
    const onToggle = () => {
        setLoading(false);
        setSignup(!signup)
        formik.resetForm()
    }

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
                        <form onSubmit={formik.handleSubmit}>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                placeholder="Email"
                                className="mt-2"
                                required
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                            ) : null}

                            <Input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder="Password"
                                className="mt-2"
                                required
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                            ) : null}


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
                                >
                                    {loading ? "Loading..." : signup ? "Sign Up" : "Sign In"}
                                </Button>
                            </div>

                        </form>


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
                                        onClick={onToggle}
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
                                        onClick={onToggle}
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