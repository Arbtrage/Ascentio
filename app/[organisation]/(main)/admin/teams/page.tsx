'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from 'lucide-react'
import AddNewTeam from '@/components/Modals/AddNewTeam'
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'



export default function TeamsOverview() {
    const [teams, setTeams] = useState<any>([])
    const router = useRouter()
    const { data, error, isLoading } = useSWR('/api/teams', fetcher)

    useEffect(() => {
        if (data) {
            setTeams(data)
        }
    }, [data])

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>
    console.log(data)
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
                    {teams.map((team: any) => (
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
                                        <span className="text-sm text-gray-600">{team.users.length} members</span>
                                    </div>
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {team.users.slice(0, 3).map((member: any) => (
                                            <Avatar key={member.id} className="inline-block border-2 border-white">
                                                <AvatarImage src={member.avatar} alt={member.name} />
                                                <AvatarFallback>{member.name.split(' ').map((n: any) => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                        {team.users.length > 3 && (
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-xs font-medium text-gray-800">
                                                +{team.users.length - 3}
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
                    <AddNewTeam />
                </motion.div>
            </div>
        </div>
    )
}