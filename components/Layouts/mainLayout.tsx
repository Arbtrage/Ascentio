
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
    IconBrandTabler,
    IconReport,
    IconDirectionsFilled,
    IconReload,
    IconLayoutKanbanFilled
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Header from "../Header";
import TeamSwitcher from "./TeamSwitcher";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Stories",
            href: "#",
            icon: (
                <IconLayoutKanbanFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Iterations",
            href: "#",
            icon: (
                <IconReload className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Epics",
            href: "#",
            icon: (
                <IconDirectionsFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Docs",
            href: "#",
            icon: (
                <IconReport className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(true);
    return (
        <>
            <div className={cn(
                "rounded-md flex flex-col md:flex-row w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}>
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {links.map((link, idx) => (
                                    <SidebarLink key={idx} link={link} />
                                ))}
                            </div>
                        </div>
                        <TeamSwitcher />
                    </SidebarBody>
                </Sidebar>
                <div className="relative flex flex-1 flex-col">
                    <main>
                        <Header />
                        <div className="bg-white w-full p-4">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image
                src="/icon.png"
                alt="logo"
                width={30}
                height={30}
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-lg text-black dark:text-white whitespace-pre"
            >
                Ascentio
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
        >
            <Image
                src="/icon.png"
                alt="logo"
                width={20}
                height={20}
            />
        </Link>
    );
};

