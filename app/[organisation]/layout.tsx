import MainLayout from "@/components/Layouts/mainLayout";

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
}: {
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

