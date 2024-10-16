import { Bell, Search } from "lucide-react"
import Link from "next/link"
import SubNav from "./subNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserNav } from "./UserNav"
import { getSession } from "@/lib/auth";

export default async function Header() {
    const session = await getSession();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-5 flex h-16 items-center space-x-4 justify-between">
                <SubNav />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="pl-8 md:w-[300px] lg:w-[300px]"
                            />
                        </div>
                    </div>
                    <nav className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <UserNav session={session} />
                    </nav>
                </div>
            </div>
        </header>
    )
}