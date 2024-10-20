'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, Loader2Icon } from 'lucide-react'

type Project = {
    id: string
    name: string
    description: string
    tasks: number
    progress: number
}

const initialProjects: Project[] = [
    { id: '1', name: 'Website Redesign', description: 'Overhaul of company website', tasks: 12, progress: 75 },
    { id: '2', name: 'Mobile App Development', description: 'Create a new mobile app', tasks: 20, progress: 30 },
    { id: '3', name: 'Marketing Campaign', description: 'Q4 marketing initiative', tasks: 8, progress: 50 },
]

export default function ProjectsOverview() {
    const [projects, setProjects] = useState<Project[]>(initialProjects)
    const [newProject, setNewProject] = useState<Partial<Project>>({})
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const router = useRouter()

    const addProject = () => {
        if (newProject.name && newProject.description) {
            setProjects([...projects, { ...newProject, id: Date.now().toString(), tasks: 0, progress: 0 } as Project])
            setNewProject({})
            setIsDialogOpen(false)
        }
    }

    return (
        <div className="min-h-screen  p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Projects</h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => router.push(`/admin/projects/${project.id}`)}>
                                <CardHeader>
                                    <CardTitle>{project.name}</CardTitle>
                                    <CardDescription>{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600">Tasks: {project.tasks}</span>
                                        <span className="text-sm text-gray-600">Progress: {project.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
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
                            <Card className="h-full flex items-center justify-center cursor-pointer border-dashed border-2 border-gray-300 hover:border-purple-500 transition-colors duration-300">
                                <CardContent>
                                    <Button variant="ghost" size="lg">
                                        <PlusIcon className="mr-2 h-6 w-6" />
                                        New Project
                                    </Button>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Project</DialogTitle>
                                <DialogDescription>
                                    Add a new project to your dashboard. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newProject.name || ''}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={newProject.description || ''}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={addProject}>Save Project</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </motion.div>
            </div>
        </div>
    )
}