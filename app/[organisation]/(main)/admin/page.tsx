"use client"


import { useTeam } from "@/contexts/TeamContext";
export default function AdminHome() {
    const { teamName } = useTeam();
    return (
        <>
            <h1>Admin home</h1>
            <p>{teamName}</p>
        </>
    );
}