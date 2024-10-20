"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { pagesData } from './navData';

const SubNav = () => {
    const path = usePathname();
    const pathItems = path.split('/').filter(Boolean);
    const firstPathItem = pathItems[0] || "home";
    const secondPathItem = pathItems[1] || "";

    const data = pagesData[firstPathItem];

    return (
        <div className="flex gap-6 md:gap-10">
            <Link href={data.href} className="flex items-center space-x-2">
                <span className="inline-block text-xl font-bold">{data.name}</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
                {data.links && data.links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center text-sm font-medium ${path.includes(link.href) ? 'text-active-foreground' : 'text-muted-foreground'}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default SubNav;
