import React from "react";
import { cn } from "@/lib/utils";
import Header from "../Header";
import SideNav from "../Misc/sideNav";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className={cn(
                "rounded-md flex flex-col md:flex-row w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}>
                <SideNav />
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