"use client";

import React, { useState } from 'react'
import { Button } from "@ui/components/button"
import { PiSignOut } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { signOut } from 'next-auth/react';
import { mainLinks } from './links';
import Subnav from './subnav'

export default function Sidebar() {

    const [subSection, setSubsection] = useState('home');
    const [selected, isSelected] = useState(false);
    const router = useRouter();
    const toggleSelected = (label: string) => {
        if (subSection === label || !selected) {
            isSelected(!selected);
        }
        setSubsection(label);
    }

    return (
        <div>
            <aside className="flex">
                <div className="flex flex-col items-center w-16 h-screen py-8 bg-white shadow border-r">
                    <nav className="flex flex-col items-center flex-1 space-y-5 ">
                        <Image src={"/icon.svg"} alt="logo" width={50} height={50} onClick={() => router.push("/dashboard")} className='cursor-pointer' />
                        {mainLinks.items.map((link) => (
                            <Button
                                key={link.id}
                                variant={"link"}
                                onClick={() => toggleSelected(link.label)}
                                className={`p-2 inline-block focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100 ${subSection === link.label ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                            >
                                {link.icon}
                            </Button>
                        ))}
                    </nav>

                    <div className="flex flex-col items-center mt-4 space-y-4">
                        <Button
                            variant={"link"}
                            onClick={async() => await signOut()}
                        >
                            <PiSignOut size={20} />
                        </Button>
                    </div>
                </div>

                {selected && <Subnav name={subSection} />}
            </aside>
        </div>
    )
}



