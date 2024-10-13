import MainLayout from "@/components/Layouts/mainLayout";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";


interface Props {
    params: {
        organisation: string;
    };
}

export async function generateMetadata({ params }: Props) {
    const name = params.organisation
    return {
        title: name,
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
    console.log(session)
    if (!session) {
        redirect('/get-started');
    }

    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}

