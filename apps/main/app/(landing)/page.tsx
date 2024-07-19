"use client"

import { useEffect } from "react";
import { SquaresPattern } from "@ui/components/squares";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroHome from "../../components/Landing/Hero";
import Header from "../../components/Landing/Header";
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
      <Header />
      <main className="grow">
        <HeroHome />
      </main>
      <Footer />
    </>
  )
}

export default page
