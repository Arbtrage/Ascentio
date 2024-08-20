"use client";


import React from 'react'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from '@ui/components/card';

const GetStarted = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            disable: "phone",
            duration: 1000,
            easing: "ease-out-cubic",
        });
    });
    return (
        <main className='grow'>
            <section className='relative h-screen mx-auto flex justify-center max-w-6xl pt-32'>

                card
            </section>
        </main>
    )
}

export default GetStarted
