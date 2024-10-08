"use client"

import { SquaresPattern } from "@ui/components/squares";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroHome from "../../components/Landing/Hero";

import Footer from "../../components/Landing/Footer";
const page = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <SquaresPattern />
      <main className="grow">
        <HeroHome />
      </main>
      <Footer />
    </>
  )
}

export default page
