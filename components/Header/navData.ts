type PageData = {
    [key: string]: {
        name: string;
        href: string;
        links?: {
            name: string;
            href: string;
        }[];
    };
};


export const pagesData: PageData = {
    home: {
        name: "Ascentio",
        href: "/",
    },
    stories: {
        name: "Stories",
        href: "/stories",
    },
    admin: {
        name: "Ascentio Admin",
        href: "/admin",
        links: [

            {
                name: "Users",
                href: "/admin/users",
            },
            {
                name: "Projects",
                href: "/admin/projects",
            },
            {
                name: "Teams",
                href: "/admin/teams",
            },
            {
                name: "Settings",
                href: "/admin/settings",
            },
        ]
    }
}