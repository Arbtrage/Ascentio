import React from 'react'
import { Suspense } from "react";
import { SquaresPattern } from "@ui/components/squares";
import { OnboardingForm } from './OnboardingForm';

export default async function WelcomePage() {
    return (
        <div className="flex h-screen flex-col items-center text-gray-900 w-full duration-500 animate-in fade-in">
            <SquaresPattern />
            <div className="flex max-w-4xl mx-auto flex-col justify-center space-y-6 pt-10">
                <div className="flex flex-col text-center mb-5">
                    <h1 className="font-cal text-5xl font-semibold">Welcome to Ascentio</h1>
                    <p className="mt-4">Let{""}s get you started</p>
                </div>
                <div className="mt-4">
                    <Suspense>
                        <OnboardingForm index={0} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
