import { Inter } from "next/font/google";
import { getOrganisation } from "@/lib/actions/organisation";

const inter = Inter({ subsets: ["latin"] });
interface Props {
    params: {
        organisation: string;
    };
}

export async function generateMetadata({ params }: Props) {
    const name = params.organisation;
    const organisation = await getOrganisation(name);
    
    return {
        title: organisation?.name || "Multipartner Site",
        description: "Multipartner Site",
        icons: {
            icon: './icon.png'
        },
    };
}

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
