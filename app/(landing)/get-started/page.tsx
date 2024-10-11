"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { List } from "@/components/Misc/List";
import SignUp from "./signUp";

export default function GetStarted(){
    const [step, setStep] = useState(0);

    useEffect(() => {
        AOS.init({
            once: true,
            disable: "phone",
            duration: 1000,
            easing: "ease-out-cubic",
        });
    }, []);

    return (
        <main className="grow">
            <section
                className="relative h-screen mx-auto flex justify-center max-w-6xl pt-32"
                data-aos="zoom-y-out"
            >
                {step === 0 ? (
                    <Card className="max-w-[85rem] mx-auto p-4 sm:px-6 lg:px-8 h-fit transition-all duration-700 ease-in-out">
                        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                            <div
                                className="lg:col-span-3 justify-center items-center"
                                data-aos="fade-right"
                                data-aos-delay="300"
                            >
                                <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
                                    Welcome
                                </h1>
                                <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
                                    Build Products better and more efficiently . Introducing a new
                                    way for your team to collaborate.
                                </p>

                                <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                                    <div className="w-full sm:w-auto">
                                        <label className="sr-only">Search</label>
                                        <Input
                                            type="text"
                                            id="hero-input"
                                            name="hero-input"
                                            className="py-3 px-4 block w-full min-w-80 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                            placeholder="Enter organisation name"
                                        />
                                    </div>
                                    <Button>Search</Button>
                                </div>
                                <Button
                                    variant={"link"}
                                    className="w-full sm:w-auto py-3 gap-x-2 text-sm font-medium rounded-lg border border-transparent "
                                    onClick={() => setStep(1)}
                                >
                                    First Time Here ?
                                </Button>
                            </div>
                            <div className="lg:col-span-4 mt-10 lg:mt-0" data-aos="fade-left">
                                <List />
                            </div>
                        </div>
                    </Card>
                ) :
                    <SignUp />}
            </section>
        </main>
    );
};
