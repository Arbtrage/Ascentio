'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, Users } from 'lucide-react'

type TeamMember = {
    id: string
    name: string
    role: string
    avatar: string
}

type Team = {
    id: string
    name: string
    description: string
    members: TeamMember[]
}

const initialTeams: Team[] = [
    {
        id: '1',
        name: 'Development Team',
        description: 'Frontend and backend developers',
        members: [
            { id: '1', name: 'John Doe', role: 'Frontend Developer', avatar: '/placeholder.svg?height=32&width=32' },
            { id: '2', name: 'Jane Smith', role: 'Backend Developer', avatar: '/placeholder.svg?height=32&width=32' },
        ]
    },
    {
        id: '2',
        name: 'Design Team',
        description: 'UI/UX designers and graphic artists',
        members: [
            { id: '3', name: 'Alice Johnson', role: 'UI Designer', avatar: '/placeholder.svg?height=32&width=32' },
            { id: '4', name: 'Bob Williams', role: 'UX Researcher', avatar: '/placeholder.svg?height=32&width=32' },
        ]
    },
    {
        id: '3',
        name: 'Marketing Team',
        description: 'Marketing specialists and content creators',
        members: [
            { id: '5', name: 'Charlie Brown', role: 'Marketing Manager', avatar: '/placeholder.svg?height=32&width=32' },
            { id: '6', name: 'Diana Davis', role: 'Content Writer', avatar: '/placeholder.svg?height=32&width=32' },
        ]
    },
]

export default function TeamsOverview() {
    const [teams, setTeams] = useState<Team[]>(initialTeams)
    const [newTeam, setNewTeam] = useState<Partial<Team>>({})
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const router = useRouter()

    const addTeam = () => {
        if (newTeam.name && newTeam.description) {
            setTeams([...teams, { ...newTeam, id: Date.now().toString(), members: [] } as Team])
            setNewTeam({})
            setIsDialogOpen(false)
        }
    }

    return (
        <div className="min-h-screen p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Teams</h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {teams.map((team) => (
                        <motion.div
                            key={team.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => router.push(`/admin/teams/${team.id}`)}>
                                <CardHeader>
                                    <CardTitle>{team.name}</CardTitle>
                                    <CardDescription>{team.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Users className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm text-gray-600">{team.members.length} members</span>
                                    </div>
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {team.members.slice(0, 3).map((member) => (
                                            <Avatar key={member.id} className="inline-block border-2 border-white">
                                                <AvatarImage src={member.avatar} alt={member.name} />
                                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {team.members.length > 3 && (
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-xs font-medium text-gray-800">
                                                +{team.members.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Card className="h-full flex items-center justify-center cursor-pointer border-dashed border-2 border-gray-300 hover:border-teal-500 transition-colors duration-300">
                                <CardContent>
                                    <Button variant="ghost" size="lg">
                                        <PlusIcon className="mr-2 h-6 w-6" />
                                        New Team
                                    </Button>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Team</DialogTitle>
                                <DialogDescription>
                                    Add a new team to your organization. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newTeam.name || ''}
                                        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={newTeam.description || ''}
                                        onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={addTeam}>Create Team</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </motion.div>
            </div>
        </div>
    )
}