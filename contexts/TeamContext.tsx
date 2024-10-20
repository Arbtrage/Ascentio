"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

interface Team {
    label: string;
    value: string;
}

interface TeamGroup {
    label: string;
    teams: Team[];
}

interface TeamContextType {
    teamName: string;
    setTeamName: Dispatch<SetStateAction<string>>;
    allTeams: TeamGroup[];
}

const TeamContext = createContext<TeamContextType>({
    teamName: '',
    setTeamName: () => { },
    allTeams: []
});

export const useTeam = () => useContext(TeamContext);

interface TeamProviderProps {
    children: ReactNode;
}

export const TeamProvider = ({ children }: TeamProviderProps) => {
    const allTeams: TeamGroup[] = [
        {
            label: "Personal Account",
            teams: [
                {
                    label: "Alicia Koch",
                    value: "personal",
                },
            ],
        },
        {
            label: "Teams",
            teams: [
                {
                    label: "Acme Inc.",
                    value: "acme-inc",
                },
                {
                    label: "Monsters Inc.",
                    value: "monsters",
                },
            ],
        },
    ];

    const [teamName, setTeamName] = useState<string>(() => {
        if (typeof window !== "undefined") {  // Check if window object is available
            const storedTeamName = localStorage.getItem('teamName');
            return storedTeamName !== null ? storedTeamName : allTeams[0].teams[0].label;
        }
        return allTeams[0].teams[0].label;  // Default value when not on client-side
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('teamName', teamName);
        }
    }, [teamName]);

    const value = {
        teamName,
        setTeamName,
        allTeams
    };

    return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};
