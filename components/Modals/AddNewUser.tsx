"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from '@/types/user'
import axios from 'axios'

const AddNewUser = () => {
    const [isAddingUser, setIsAddingUser] = useState(false)
    const [newUser, setNewUser] = useState<Partial<User>>({})
    const [loading, setLoading] = useState(false)

    const addUser = async () => {
        setLoading(true);
        if (!newUser.email || !newUser.name) return;
        const res = await axios.post('/api/users', { email: newUser.email, name: newUser.name });

        setLoading(false);
        if (res.status === 200) alert('User added successfully');
        else alert('Error adding user');

    }

    return (
        <div >
            <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                <DialogTrigger asChild>
                    <Button >Add New User</Button>
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
                    <Button onClick={addUser} disabled={loading}>{loading ? 'Adding...' : 'Add User'}</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewUser
