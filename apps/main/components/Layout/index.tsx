import Header from "../Header";

export default async function PagesLayout({
    children,
}: {
    children: React.ReactNode;
    }) {
    return (
        <div className="flex flex-col w-full h-screen bg-[#EFEEEE] px-5">
            <Header />
            {children}
        </div>
    );
}