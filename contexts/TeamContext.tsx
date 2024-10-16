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
        const storedTeamName = localStorage.getItem('teamName');
        return storedTeamName !== null ? storedTeamName : allTeams[0].teams[0].label;
    });


    // Effect to update localStorage when teamName changes
    useEffect(() => {
        localStorage.setItem('teamName', teamName);
    }, [teamName]);

    const value = {
        teamName,
        setTeamName,
        allTeams // Adding the allTeams to the context value
    };

    return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};
