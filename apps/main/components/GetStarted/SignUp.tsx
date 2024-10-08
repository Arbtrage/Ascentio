"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "@ui/components/card";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { Badge } from "@ui/components/badge";
import { CalendarIcon, Check, MoveRight, PhoneCall } from "lucide-react";

const SignUp = () => {
    const [photoName, setPhotoName] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoRef = useRef<HTMLInputElement>(null); // Explicitly type the ref as HTMLInputElement
  
    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setPhotoName(file.name);
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && typeof e.target.result === 'string') {
            setPhotoPreview(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
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
                        <div className="rounded-md min-w-md flex flex-col border p-8 gap-4">
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
                                Book the meeting <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SignUp;
