"use client";

import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const formatPathname = (path: string) => {
        const paths = path.split("/");
        const pathSegment = paths[paths.length - 1];
        if (!pathSegment) return "";
        return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
    };

    return (
        <>
            <header className="flex flex-row justify-between items-center w-full h-16 bg-[#EFEEEE]">
                <div className="flex flex-row items-center">
                    <h1 className="text-2xl font-bold">{formatPathname(pathname)}</h1>
                </div>
            </header>
        </>
    );
}
