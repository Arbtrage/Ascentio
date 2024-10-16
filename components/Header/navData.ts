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
    admin: {
        name: "Ascentio Admin",
        href: "/admin",
        links: [
            {
                name: "Overview",
                href: "/admin/overview",
            },
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
        ]
    }
}