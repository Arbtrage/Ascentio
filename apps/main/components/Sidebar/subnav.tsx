"use client";

import React, { useState } from 'react'
import { Button } from "@ui/components/button"
import { subLinks } from './links'


const Subnav = ({ name }: { name: string }) => {

    const data = subLinks[name];

    return (
        <div className="h-screen px-5 py-8 overflow-y-auto bg-white border-r sm:w-64 w-60 duration-800 animate-in fade-in">
            <nav className="mt-4 -mx-3 space-y-6">
                {data?.items.map((item) => (
                    <div key={item.id} className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">{item.name}</label>
                        {item.subItems.map((subItem) => (
                            <a key={subItem.id} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href={subItem.href}>
                                {subItem.icon}
                                <span className="mx-2 text-sm font-medium">{subItem.label}</span>
                            </a>
                        ))}
                    </div>
                ))}
            </nav>
        </div>
    )
}

export default Subnav
