'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, ListIcon, Loader2Icon } from 'lucide-react'

type Task = {
    id: string
    name: string
    status: 'todo' | 'in-progress' | 'done'
}

type Project = {
    id: string
    name: string
    description: string
    tasks: Task[]
    progress: number
}

export default function ProjectDetails({ params }: { params: { id?: string } }) {
    const [project, setProject] = useState<Project | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (params.id) {
            const mockProject: Project = {
                id: params.id,
                name: 'Website Redesign',
                description: 'Overhaul of company website with modern design and improved UX',
                tasks: [
                    { id: '1', name: 'Design mockups', status: 'done' },
                    { id: '2', name: 'Frontend development', status: 'in-progress' },
                    { id: '3', name: 'Backend integration', status: 'todo' },
                    { id: '4', name: 'User testing', status: 'todo' },
                ],
                progress: 35,
            }
            setProject(mockProject)
        } else {
            console.error('Project ID is undefined')
            router.push('/admin/projects')
        }
        setIsLoading(false)
    }, [params.id, router])

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <Loader2Icon className="animate-spin h-8 w-8 text-purple-600" />
        </div>
    }

    if (!project) {
        return <div className="flex items-center justify-center h-screen">
            <p className="text-xl text-gray-600">Project not found</p>
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
                <Button variant="ghost" onClick={() => router.push('/admin/projects')} className="mb-4">
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back to Projects
                </Button>
                <h1 className="text-4xl font-bold text-gray-800">{project.name}</h1>
                <p className="text-xl text-gray-600 mt-2">{project.description}</p>
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
                            <CardTitle>Tasks</CardTitle>
                            <CardDescription>Manage and track your project tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="all">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="todo">To Do</TabsTrigger>
                                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                                    <TabsTrigger value="done">Done</TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">
                                    {project.tasks.map((task) => (
                                        <div key={task.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                                            <span>{task.name}</span>
                                            <span className={`px-2 py-1 rounded text-sm ${task.status === 'todo' ? 'bg-yellow-200 text-yellow-800' :
                                                task.status === 'in-progress' ? 'bg-blue-200 text-blue-800' :
                                                    'bg-green-200 text-green-800'
                                                }`}>
                                                {task.status}
                                            </span>
                                        </div>
                                    ))}
                                </TabsContent>
                                {/* Add content for other tabs */}
                            </Tabs>
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
                            <CardTitle>Project Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">Progress</span>
                                        <span className="text-sm font-medium">{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="w-full" />
                                </div>
                                <div className="flex items-center">
                                    <ListIcon className="mr-2 h-4 w-4 text-gray-500" />
                                    <span>{project.tasks.length} Total Tasks</span>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="mr-2 h-4 w-4 text-yellow-500" />
                                    <span>{project.tasks.filter(t => t.status === 'todo').length} To Do</span>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="mr-2 h-4 w-4 text-blue-500" />
                                    <span>{project.tasks.filter(t => t.status === 'in-progress').length} In Progress</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                                    <span>{project.tasks.filter(t => t.status === 'done').length} Completed</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}