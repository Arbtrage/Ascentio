"use client";

import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {Check, MoveRight } from "lucide-react";

const SignUp = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            disable: "phone",
            duration: 1000,
            easing: "ease-out-cubic",
        });
    }, []);

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
                                    Something new
                                </h4>
                                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-sm text-left">
                                    Managing a small business today is already tough. Avoid
                                    further complications by ditching outdated, tedious trade
                                    methods.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start text-left">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Easy to use</p>
                                <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it easy to use and understand.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start text-left">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Fast and reliable</p>
                                <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it easy to use and understand.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start text-left">
                            <Check className="w-4 h-4 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p>Beautiful and modern</p>
                                <p className="text-muted-foreground text-sm">
                                    We&apos;ve made it easy to use and understand.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="justify-center flex items-center">
                        <div className="rounded-md w-full p-4 flex flex-col border gap-4">
                            <div className="grid w-full min-w-md items-center gap-1">
                                <Label>Email</Label>
                                <Input type="email" />
                            </div>
                            <div className="grid w-full min-w-md items-center gap-1">
                                <Label >Password</Label>
                                <Input type="password" />
                            </div>
                            <div className="grid w-full min-w-md items-center gap-1">
                                <Label >Organisation Name</Label>
                                <Input type="text" />
                            </div>
                            <Button className="gap-4 w-full">
                                Let&apos;s build something crazy <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SignUp;
