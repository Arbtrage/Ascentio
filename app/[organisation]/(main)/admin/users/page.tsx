'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {  SearchIcon, UserPlus } from 'lucide-react'
import AddNewUser from '@/components/Modals/AddNewUser'
import UserCard from '@/components/Cards/UserCard'
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'

export default function Users() {
    const [users, setUsers] = useState<any>([])
    const { data, error, isLoading } = useSWR('/api/users', fetcher)

    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])

    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [searchTerm, setSearchTerm] = useState('')

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

    const filteredUsers = users.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex h-[calc(100vh-64px)]">
            <div className="w-1/3 bg-white border-r overflow-hidden flex flex-col pl-4">
                <div className=" flex flex-row p-2 gap-4 border-b items-center justify-center w-full">
                    <div className="relative w-[70%]">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            className="pl-10 pr-4 py-1 w-full"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <AddNewUser />
                </div>
                <ScrollArea className="flex-grow">
                    <AnimatePresence>
                        {filteredUsers.map((user: any) => (
                            <motion.div
                                key={user.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedUser?.id === user.id ? 'bg-purple-50' : ''}`}
                                onClick={() => setSelectedUser(user)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{user.name.split(' ').map((n: any) => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </ScrollArea>
            </div>
            <div className="flex-1 h-full p-6 overflow-auto">
                <AnimatePresence mode="wait">
                    {selectedUser ? (
                        <motion.div
                            key={selectedUser.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <UserCard user={selectedUser} />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-center justify-center h-full text-gray-500"
                        >
                            <UserPlus className="w-16 h-16 mb-4" />
                            <p className="text-xl font-medium">Select a user to view details</p>
                            <p className="text-sm mt-2">Or add a new user to get started</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}