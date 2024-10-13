import MainLayout from "@/components/Layouts/mainLayout";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getOrganisation } from "@/lib/actions/organisation";

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

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: {
        organisation: string;
    }
}) {

    const session = await getSession();
    if (!session) {
        redirect('/auth');
    }

    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}

