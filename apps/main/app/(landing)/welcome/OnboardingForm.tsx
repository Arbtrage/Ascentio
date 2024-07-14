"use client";

import { useState } from "react";
import { onboarding } from "./onboarding";
import { Input } from "@ui/components/input"
import { useRouter } from "next/navigation";
import { Button } from "@ui/components/button"
import { onboardUser } from "../../../lib/actions/user";
import { toast } from "sonner";

export function OnboardingForm() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();
    const question = onboarding.questions[currentIndex];
    const [value, setValue] = useState("");
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState("");

    const [isFinal, setIsFinal] = useState(false);


    const getStarted = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const response = await onboardUser(data);
        if (response.status === 200) {
            router.push("/dashboard");
        } else {
            toast.error("Something went wrong");
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let entry = { label: question?.label, value: "" };
        if (question?.type === "input") {
            entry.value = value;
        } else if (question?.type === "avatar" || question?.type === "single_choice") {
            entry.value = selectedChoice;
        }
        setData([...data, entry]);
        setValue("");
        setSelectedChoice("");
        setCurrentIndex(currentIndex + 1);
        if (currentIndex >= onboarding.questions.length - 1) {
            setIsFinal(true);
        }
    }

    return (
        <div className="flex w-full">
            <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl">{question?.question}</h1>

                <form onSubmit={handleSubmit} className="duration-500 animate-in fade-in">
                    {question?.type === "input" && (
                        <>
                            <Input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                width={"w-full"}
                                placeholder="Enter your answer"
                                className="input-bordered input w-full"
                            />
                            <Button type="submit" className="mt-10 w-full">Next</Button>
                        </>
                    )}

                    {question?.type === "avatar" && (
                        <div className="flex flex-row gap-4 justify-center">
                            {question.choices?.map((choice, i) => (
                                <Button
                                    key={i}
                                    variant={selectedChoice?.includes(choice) ? "secondary" : "outline"}
                                    className={`p-4 border-2 ${selectedChoice === choice ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={() => setSelectedChoice(choice)}
                                >
                                    {choice}
                                </Button>
                            ))}
                        </div>
                    )}

                    {question?.type === "single_choice" && (
                        <div className="flex flex-col space-y-2">
                            {question.choices?.map((choice, i) => (
                                <Button key={i} variant={selectedChoice?.includes(choice) ? "secondary" : "outline"} onClick={() => setSelectedChoice(choice)}>
                                    {choice}
                                </Button>
                            ))}
                        </div>
                    )}
                </form>

                {/* UI to show that the onboarding is now complete and ready to go */}
                {isFinal && <>
                    <p className="text-lg">Thanks for completing the onboarding. You can now start using Ascentio.</p>
                    <Button className="mt-10 w-full" onClick={getStarted} disabled={loading}>{loading ? "Loading..." : "Get Started"}</Button>
                </>}
            </div>
        </div>
    )
}