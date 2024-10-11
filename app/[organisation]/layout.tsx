import MainLayout from "@/components/Layouts/mainLayout";
interface siteData {
    name: string;
    description: string;
    image: string;
    logo: string;
}

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
    params,
    children,
}: {
    params: { domain: string };
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <MainLayout>
                    {children}
                </MainLayout>
            </body>
        </html>
    );
}

