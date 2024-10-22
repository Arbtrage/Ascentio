'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AddNewProject from '@/components/Modals/AddNewProject'
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'

export default function ProjectsOverview() {
    const [projects, setProjects] = useState<any>([])
    const router = useRouter()
    const { data, error, isLoading } = useSWR('/api/projects', fetcher)

    useEffect(() => {
        if (data) {
            setProjects(data)
        }
    }, [data])

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

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
                    {projects.map((project: any) => (
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
                                        <span className="text-sm text-gray-600">Tasks: {project.tasks || 0}</span>
                                        <span className="text-sm text-gray-600">Progress: {project.progress || 0}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${project.progress || 0}%` }}></div>
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
                    <AddNewProject />
                </motion.div>
            </div>
        </div>
    )
}