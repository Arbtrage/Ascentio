"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [top, setTop] = useState<boolean>(true);
    const scrollHandler = (): void => {
        if (window.pageYOffset > 10) {
            setTop(false);
        } else {
            setTop(true);
        }
    };

    useEffect(() => {
        scrollHandler();
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [top]);

    return (
        <header className="fixed top-2 z-30 w-full md:top-6">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                    {/* Site branding */}
                    <div className="flex flex-1 items-center">
                        <Image
                            src={"/icon.png"}
                            alt="logo"
                            width={40}
                            height={40}
                            className="cursor-pointer"
                            onClick={() => router.push("/")}
                        />
                    </div>

                    {/* Desktop sign in links */}
                    <ul className="flex flex-1 items-center justify-end gap-3">
                        <li>
                            <Link
                                href="/get-started"
                                className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
                            >
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}