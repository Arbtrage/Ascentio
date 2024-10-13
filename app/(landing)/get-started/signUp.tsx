"use client";

import React from "react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const SignUp = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            disable: "phone",
            duration: 1000,
            easing: "ease-out-cubic",
        });
    }, []);

    const router = useRouter();
    const [orgName, setOrgName] = useState<string>("")

    return (
        <Card
            className="max-w-[85rem] h-fit transition-all duration-700 ease-in-out"
            data-aos="fade-out"
            data-aos-delay="300"
        >
            <div className="container max-w-6xl mx-auto m-5 mb-10">
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <Badge>Contact</Badge>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                                    Get started in 3 easy steps
                                </h4>
                                {/* <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-sm text-left">
                                    Managing a small business today is already tough. Avoid
                                    further complications by ditching outdated, tedious trade
                                    methods.
                                </p> */}
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start text-left">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Add Organisation</p>
                                <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it easy to use and understand.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start text-left">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Create an account</p>
                                <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it easy to use and understand.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start text-left">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Add Team Members</p>
                                <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it easy to use and understand.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="justify-center flex items-center">
                        <div className="rounded-md w-full p-4 flex flex-col border gap-4">
                            <Label htmlFor="name">Organisation Name</Label>
                            <Input
                                id="orgName"
                                placeholder="Enter your Organisation"
                                type="text"
                                name="name"
                                required
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                            />
                            <Button type="submit" onClick={() => { router.push(`${process.env.NEXT_PUBLIC_PROTOCOL}://${orgName}.${process.env.NEXT_PUBLIC_URL}/onboarding`) }}>Get Started</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SignUp;
