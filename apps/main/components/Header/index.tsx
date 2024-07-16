"use client";

import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const formatPathname = (path: string) => {
        const paths = path.split("/");
        const pathSegment = paths[paths.length - 1];

        if (!pathSegment) return "";
        if (pathSegment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            return "Canvas"; 
        }

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
