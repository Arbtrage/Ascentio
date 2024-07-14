import Sidebar from "../../components/Sidebar";
import { getSession } from "../../lib/auth";
import PagesLayout from "../../components/Layout";
import { NoSession } from "@ui/components/nosession"

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getSession();
    if (!session) return <NoSession />


    return (
        <div className="flex flex-row">
            <Sidebar />
            <PagesLayout>
                {children}
            </PagesLayout>
        </div>
    );
}