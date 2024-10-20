'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftIcon, Loader2Icon, PlusIcon, Users } from 'lucide-react'

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

export default function TeamDetails({ params }: { params: { id?: string } }) {
    const [team, setTeam] = useState<Team | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [newMember, setNewMember] = useState<Partial<TeamMember>>({})
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (params.id) {
            const mockTeam: Team = {
                id: params.id,
                name: 'Development Team',
                description: 'Frontend and backend developers working on our main product',
                members: [
                    { id: '1', name: 'John Doe', role: 'Frontend Developer', avatar: '/placeholder.svg?height=128&width=128' },
                    { id: '2', name: 'Jane Smith', role: 'Backend Developer', avatar: '/placeholder.svg?height=128&width=128' },
                    { id: '3', name: 'Alice Johnson', role: 'Full Stack Developer', avatar: '/placeholder.svg?height=128&width=128' },
                ]
            }
            setTeam(mockTeam)
        } else {
            console.error('Team ID is undefined')
            router.push('/admin/teams')
        }
        setIsLoading(false)
    }, [params.id, router])

    const addMember = () => {
        if (newMember.name && newMember.role && team) {
            const updatedTeam = {
                ...team,
                members: [...team.members, { ...newMember, id: Date.now().toString(), avatar: '/placeholder.svg?height=128&width=128' } as TeamMember]
            }
            setTeam(updatedTeam)
            setNewMember({})
            setIsDialogOpen(false)
        }
    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <Loader2Icon className="animate-spin h-8 w-8 text-teal-600" />
        </div>
    }

    if (!team) {
        return <div className="flex items-center justify-center h-screen">
            <p className="text-xl text-gray-600">Team not found</p>
        </div>
    }

    return (
        <div className="min-h-screen p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <Button variant="ghost" onClick={() => router.push('/admin/teams')} className="mb-4">
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back to Teams
                </Button>
                <h1 className="text-4xl font-bold text-gray-800">{team.name}</h1>
                <p className="text-xl text-gray-600 mt-2">{team.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>Manage your team members</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {team.members.map((member) => (
                                    <div key={member.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100">
                                        <Avatar>
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{member.name}</p>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="mt-4">
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Add Team Member
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add Team Member</DialogTitle>
                                        <DialogDescription>
                                            Add a new member to your team. Click save when you&apos;re done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input

                                                id="name"
                                                value={newMember.name || ''}
                                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="role" className="text-right">
                                                Role
                                            </Label>
                                            <Input
                                                id="role"
                                                value={newMember.role || ''}
                                                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={addMember}>Add Member</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Users className="h-5 w-5 text-gray-500" />
                                    <span>{team.members.length} Team Members</span>
                                </div>
                                <Tabs defaultValue="roles">
                                    <TabsList>
                                        <TabsTrigger value="roles">Roles</TabsTrigger>
                                        <TabsTrigger value="activity">Activity</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="roles">
                                        <ul className="space-y-2">
                                            {Array.from(new Set(team.members.map(m => m.role))).map((role, index) => (
                                                <li key={index} className="flex justify-between items-center">
                                                    <span>{role}</span>
                                                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs">
                                                        {team.members.filter(m => m.role === role).length}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </TabsContent>
                                    <TabsContent value="activity">
                                        <p className="text-sm text-gray-500">Recent team activity will be shown here.</p>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}