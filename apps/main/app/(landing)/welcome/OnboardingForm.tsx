"use client";

import { useState } from "react";
import { onboarding } from "./onboarding";
import { Input } from "@ui/components/input"
import { Button } from "@ui/components/button"

export function OnboardingForm({ index }: { index: number }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const question = onboarding.questions[currentIndex];
    const [value, setValue] = useState("");
    const [data, setData] = useState<any>([]);
    const [selectedChoice, setSelectedChoice] = useState("");

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
        if (index >= onboarding.questions.length - 1) {
            console.log("submitting")
        }
    }

    return (
        <div className="flex w-full">
            <div className="w-full flex flex-col">
                <h1 className="text-xl">{question?.question}</h1>

                {question?.type === "input" && (
                    <Input
                        type="text"
                        placeholder="Enter your answer"
                        className="input-bordered input w-full max-w-xs"
                    />
                )}

                {question?.type === "avatar" && (
                    <div className="flex space-x-4">
                        {question.choices?.map((choice, i) => (
                            <button
                                key={i}
                                className={`p-4 border-2 ${selectedChoice === choice ? "border-blue-500" : "border-gray-300"}`}
                                onClick={() => setSelectedChoice(choice)}
                            >
                                {choice}
                            </button>
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

                <Button onClick={handleSubmit} className="mt-10">Submit</Button>
            </div>
        </div>
    )
}