"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import axios from 'axios'
import { Textarea } from '@/components/ui/textarea'

const AddNewTeam = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newTeam, setNewTeam] = useState<any>({})
    const [loading, setLoading] = useState(false)

    const addTeam = async () => {
        setLoading(true);
        if (!newTeam.name || !newTeam.description) return;
        const res = await axios.post('/api/teams', { name: newTeam.name, description: newTeam.description });

        setLoading(false);
        if (res.status === 200) alert('Project added successfully');
        else alert('Error adding user');

    }

    return (
        <div >
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
        </div>
    )
}

export default AddNewTeam