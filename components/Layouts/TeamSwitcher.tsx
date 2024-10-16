"use client"

import * as React from "react"
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTeam } from "@/contexts/TeamContext";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps { }

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
    const [open, setOpen] = React.useState(false)

    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

    const { setTeamName, allTeams, teamName } = useTeam();


    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn("w-[200px] justify-between rounded-full", className)}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/${teamName}.png`}
                                alt={teamName}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {teamName}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search team..." />
                        <CommandList>
                            <CommandEmpty>No team found.</CommandEmpty>
                            {allTeams.map((group: any) => (
                                <CommandGroup key={group.label} heading={group.label}>
                                    {group.teams.map((team: any) => (
                                        <CommandItem
                                            key={team.value}
                                            onSelect={() => {
                                                setTeamName(team.label)
                                                setOpen(false)
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src={`https://avatar.vercel.sh/${team.value}.png`}
                                                    alt={team.label}
                                                    className="grayscale"
                                                />
                                                <AvatarFallback>SC</AvatarFallback>
                                            </Avatar>
                                            {team.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    teamName === team.label
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewTeamDialog(true)
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create Team
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create team</DialogTitle>
                    <DialogDescription>
                        Add a new team to manage products and customers.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Team name</Label>
                            <Input id="name" placeholder="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Team tagline</Label>
                            <Input id="name" placeholder="Will be your team's tagline" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan">Team Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">
                                        <span className="font-medium">Hobby</span> -{" "}
                                        <span className="text-muted-foreground">
                                            For small teams with simple needs
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="pro">
                                        <span className="font-medium">Professional</span> -{" "}
                                        <span className="text-muted-foreground">
                                            For complex web and API projects
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}