import { FaHome } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { MdOutlineViewKanban } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";
import { SiCreatereactapp } from "react-icons/si";
import { VscInsert } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoMdHelp } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { BsInboxesFill } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";


import { FaQuestion } from "react-icons/fa";

import { SubLinks } from "../../types/links.type";

export const mainLinks = {
    items: [
        {
            id: 1,
            icon: <FaHome size={20} />,
            label: "home",
        },
        {
            id: 2,
            icon: <FaRegUser size={20} />,
            label: "profile",
        },
        {
            id: 3,
            icon: <TiMessages size={20} />,
            label: "messaging",
        },
        {
            id: 4,
            icon: <IoMdHelp size={20} />,
            label: "help",
        }
    ]
}


export const subLinks: SubLinks = {
    "home": {
        items: [
            {
                id: 1,
                name: "Analytics",
                subItems: [
                    {
                        id: 1,
                        icon: <MdOutlineViewKanban size={20} />,
                        label: "Kanban",
                        href: "/analytics/kanban",
                    },
                    {
                        id: 2,
                        icon: <FaRegCalendarAlt size={20} />,
                        label: "Calendar",
                        href: "/analytics/calendar",
                    },
                    {
                        id: 3,
                        icon: <IoStatsChartOutline size={20} />,
                        label: "Stats",
                        href: "/analytics/stats",
                    },
                ]
            },
            {
                id: 2,
                name: "Projects",
                subItems: [
                    {
                        id: 1,
                        icon: <FaProjectDiagram size={20} />,
                        label: "All Projects",
                        href: "projects/all",
                    },
                    {
                        id: 2,
                        icon: <SiCreatereactapp size={20} />,
                        label: "Create Project",
                        href: "projects/create",
                    }
                ]
            }
        ]
    },
    "profile": {
        items: [
            {
                id: 1,
                name: "Team",
                subItems: [
                    {
                        id: 1,
                        icon: <RiTeamLine size={20} />,
                        label: "My Teams",
                        href: "teams/all",
                    },
                    {
                        id: 2,
                        icon: <VscInsert size={20} />,
                        label: "Create Team",
                        href: "team/create",
                    },
                ]
            },
            {
                id: 2,
                name: "Settings",
                subItems: [
                    {
                        id: 1,
                        icon: <CgProfile size={20} />,
                        label: "Profile",
                        href: "settings/profile",
                    },
                    {
                        id: 2,
                        icon: <MdAccountBalance size={20} />,
                        label: "Account",
                        href: "settings/account",
                    },
                ]
            },
        ]
    },
    "messaging": {
        items: [
            {
                id: 1,
                name: "Inbox",
                subItems: [
                    {
                        id: 1,
                        icon: <BsInboxesFill size={20} />,
                        label: "Inbox",
                        href: "messaging/inbox",
                    },
                ]
            },
        ]
    },
    "help": {
        items: [
            {
                id: 1,
                name: "Help",
                subItems: [
                    {
                        id: 1,
                        icon: <FaQuestion size={20} />,
                        label: "FAQ",
                        href: "help/faq",
                    },
                    {
                        id: 2,
                        icon: <BiSupport size={20} />,
                        label: "Support",
                        href: "help/support",
                    },
                ]
            },
        ]
    }
}