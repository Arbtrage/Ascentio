type SubLinkItem = {
    id: number;
    icon: any;
    label: string;
    href: string;
};

type SubLinkCategory = {
    id: number;
    name: string;
    subItems: SubLinkItem[];
};

export type SubLinks = {
    [key: string]: {  // Index signature
        items: SubLinkCategory[];
    };
};