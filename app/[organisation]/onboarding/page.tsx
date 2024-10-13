"use client";

import React from "react";
import "aos/dist/aos.css";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp = ({ params }: { params: { organisation: string } }) => {
  console.log(params);
  const router = useRouter();

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await signIn("register", { email: values.email, password: values.password, name: values.name, redirect: false });
      if (response?.status === 200) {
        router.push(`/`);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      toast.success("Signed up successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3 ">
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Ascentio Admin Creation</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                molestiae
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <Image src={"/icon.png"} alt="logo" width={50} height={50} />
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300">Create your admin account</p>
            </div>

            <div className="flex justify-center items-center p-5">
              <Card
                className="w-full h-fit transition-all duration-700 ease-in-out"
              >
                <div className="container max-w-6xl mx-auto m-5 mb-10">
                  <div className="justify-center flex items-center">
                    <div className="w-full p-4 flex flex-col  gap-4">
                      <Formik
                        initialValues={{ name: "", email: "", password: "" }}
                        validationSchema={signUpSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form className="space-y-4">
                            <div className="grid w-full min-w-md items-center gap-1">
                              <Label>Name</Label>
                              <Field
                                name="name"
                                as={Input}
                                type="text"
                                className="w-full"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="grid w-full min-w-md items-center gap-1">
                              <Label>Email</Label>
                              <Field
                                name="email"
                                as={Input}
                                type="email"
                                className="w-full"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="grid w-full min-w-md items-center gap-1">
                              <Label>Password</Label>
                              <Field
                                name="password"
                                as={Input}
                                type="password"
                                className="w-full"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <Button
                              type="submit"
                              className="gap-4 w-full"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? "Submitting..."
                                : `Let's build something crazy`}
                              <MoveRight className="w-4 h-4" />
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
