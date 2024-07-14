import { getSession } from "../../lib/auth";
import { NoSession } from "@ui/components/nosession"

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getSession();
    if (!session) return <NoSession />
    return (
        <>
            {children}
        </>
    );
}