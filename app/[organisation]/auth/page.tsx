"use client";

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { fetcher } from "@/lib/utils";
import useSWR from 'swr';
import { MoveRight } from "lucide-react";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AuthPage = ({ params }: { params: { organisation: string } }) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(`/api/sites?id=${params.organisation}`, fetcher);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await signIn("login", {
        email: values.email,
        password: values.password,
        domain: params.organisation,
        redirect: false,
      });
      if (response?.status === 200) {
        router.push(`/`);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      toast.success("Sign in successfull!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    console.error(error);
  }

  if (data) console.log(data)


  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            {!isLoading && (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={data.logo || "/icon.png"}
                  alt="logo"
                  width={200}
                  height={200}
                />
                <h1 className="text-3xl font-bold">{data.name || "Login"}</h1></div>
            )}
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={signInSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">

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
                    ? "Logging in..."
                    : `Login`}
                  <MoveRight className="w-4 h-4" />
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default AuthPage