import { getSession } from "@/lib/auth";
export default async function UserPage() {
    const session = await getSession();
    return (
        <>
            <h1>Users Page</h1>
        </>
    );
}