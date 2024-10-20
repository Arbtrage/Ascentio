'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileIcon, MailIcon, MapPinIcon, PhoneIcon, PlusIcon, SearchIcon, UserIcon, UserPlus } from 'lucide-react'

type User = {
    id: number
    name: string
    email: string
    phone: string
    address: string
    avatar: string
    status: 'active' | 'inactive'
}

const initialUsers: User[] = [
    { id: 1, name: "Fabrice Edouard", email: "fabrice@example.com", phone: "+33 1 23 45 67 89", address: "123 Rue de Paris, 75001 Paris", avatar: "/placeholder.svg?height=128&width=128", status: 'active' },
    { id: 2, name: "Martial Lerille", email: "martial@example.com", phone: "+33 1 98 76 54 32", address: "456 Avenue des Champs-Élysées, 75008 Paris", avatar: "/placeholder.svg?height=128&width=128", status: 'inactive' },
    { id: 3, name: "Gabrielle Dujardin", email: "gabrielle@example.com", phone: "+33 6 10 15 15 37", address: "58 rue de la Fontaine au Roi 75010 PARIS", avatar: "/placeholder.svg?height=128&width=128", status: 'active' },
]

export default function InnovativeUserManagement() {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isAddingUser, setIsAddingUser] = useState(false)
    const [newUser, setNewUser] = useState<Partial<User>>({})

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const addUser = () => {
        if (newUser.name && newUser.email) {
            setUsers([...users, { ...newUser, id: users.length + 1, avatar: "/placeholder.svg?height=128&width=128", status: 'active' } as User])
            setNewUser({})
            setIsAddingUser(false)
        }
    }

    return (
        <div className="flex h-screen ">
            <div className="w-1/3 bg-white border-r overflow-hidden flex flex-col pl-4">
                <div className=" grid grid-cols-4 gap-4 border-b items-center justify-center">
                    <div className="relative col-span-3">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            className="pl-10 pr-4 py-1 w-full"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="p-4">
                        <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                            <DialogTrigger asChild>
                                <Button className="w-full"><PlusIcon className="mr-2" size={32} />Add New User</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New User</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">Name</Label>
                                        <Input id="name" value={newUser.name || ''} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">Email</Label>
                                        <Input id="email" value={newUser.email || ''} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="col-span-3" />
                                    </div>
                                </div>
                                <Button onClick={addUser}>Add User</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <ScrollArea className="flex-grow">
                    <AnimatePresence>
                        {filteredUsers.map((user) => (
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
                                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
            <div className="flex-1 p-6 overflow-auto">
                <AnimatePresence mode="wait">
                    {selectedUser ? (
                        <motion.div
                            key={selectedUser.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                                <Button variant="outline">Archiver</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <Label>Téléphone</Label>
                                    <div className="flex items-center mt-1">
                                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-500" />
                                        <Input value={selectedUser.phone} readOnly />
                                    </div>
                                </div>
                                <div>
                                    <Label>E-mail</Label>
                                    <div className="flex items-center mt-1">
                                        <MailIcon className="w-4 h-4 mr-2 text-gray-500" />
                                        <Input value={selectedUser.email} readOnly />
                                    </div>
                                </div>
                                <div>
                                    <Label>Statut</Label>
                                    <div className="flex items-center mt-1">
                                        <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
                                        <Input value={selectedUser.status === 'active' ? 'Actif' : 'Inactif'} readOnly />
                                    </div>
                                </div>
                                <div>
                                    <Label>Adresse</Label>
                                    <div className="flex items-center mt-1">
                                        <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                                        <Input value={selectedUser.address} readOnly />
                                    </div>
                                </div>
                            </div>
                            <Tabs defaultValue="dossier">
                                <TabsList>
                                    <TabsTrigger value="dossier">Dossier</TabsTrigger>
                                    <TabsTrigger value="historique">Historique</TabsTrigger>
                                    <TabsTrigger value="questionnaire">Questionnaire</TabsTrigger>
                                    <TabsTrigger value="rendez-vous">Rendez-vous</TabsTrigger>
                                </TabsList>
                                <TabsContent value="dossier" className="mt-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <FileIcon className="w-5 h-5 mr-2 text-purple-600" />
                                                <span className="font-medium">Justificatif de domicile</span>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <FileIcon className="w-4 h-4 mr-2" />
                                                Voir
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-500">Documentdomicile.pdf</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
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