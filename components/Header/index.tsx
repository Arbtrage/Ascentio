import { Bell, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserNav } from "./UserNav"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-5 flex h-16 items-center space-x-4 justify-between">
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="inline-block font-bold">ACME Admin</span>
                    </Link>
                    <nav className="hidden gap-6 md:flex">
                        <Link
                            href="/dashboard"
                            className="flex items-center text-sm font-medium text-muted-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/users"
                            className="flex items-center text-sm font-medium text-muted-foreground"
                        >
                            Users
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center text-sm font-medium text-muted-foreground"
                        >
                            Settings
                        </Link>
                    </nav>
                </div>
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
                        <UserNav />
                    </nav>
                </div>
            </div>
        </header>
    )
}