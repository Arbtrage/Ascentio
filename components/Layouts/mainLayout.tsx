import React from "react";
import { cn } from "@/lib/utils";
import Header from "../Header";
import SideNav from "../Misc/sideNav";
import { TeamProvider } from "@/contexts/TeamContext";
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
                <TeamProvider>
                    <SideNav />
                    <div className="relative flex flex-1 flex-col overflow-y-auto">
                        <main>
                            <Header />
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full overflow-y-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </TeamProvider>
            </div>
        </>
    );
}