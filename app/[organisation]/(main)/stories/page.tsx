"use client"

import { useTeam } from "@/contexts/TeamContext"
import React, { useState, useRef } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { PlusIcon, GripVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface Task {
    id: number
    content: string
    status: 'Backlog' | 'Todo' | 'In Progress' | 'In Review' | 'Done'
}

const TaskItem: React.FC<{ task: Task; moveTask: (id: number, status: Task['status']) => void }> = ({ task, moveTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const ref = useRef<HTMLDivElement>(null)
    drag(ref)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
        >
            <Card
                ref={ref}
                className={`mb-2 ${isDragging ? 'opacity-50' : ''} cursor-pointer`}
            >
                <CardContent className="p-3 flex items-center">
                    <GripVertical className="h-5 w-5 text-gray-400 mr-2 cursor-move" />
                    <div className="flex-grow">{task.content}</div>
                    {task.status === 'Done' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {task.status === 'In Progress' && <Clock className="h-5 w-5 text-blue-500" />}
                    {task.status === 'In Review' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                </CardContent>
            </Card>
        </motion.div>
    )
}

const Column: React.FC<{
    status: Task['status'];
    tasks: Task[];
    moveTask: (id: number, status: Task['status']) => void;
    onAddTask: (status: Task['status']) => void;
}> = ({ status, tasks, moveTask, onAddTask }) => {
    const [, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item: { id: number }) => moveTask(item.id, status),
    }))

    const ref = useRef<HTMLDivElement>(null)
    drop(ref)

    return (
        <Card ref={ref} className="flex-1">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    {status}
                    <Badge variant="secondary">{tasks.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <AnimatePresence>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} moveTask={moveTask} />
                    ))}
                </AnimatePresence>
                <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => onAddTask(status)}
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add {status}
                </Button>
            </CardContent>
        </Card>
    )
}

const KanbanBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, content: 'Design new landing page', status: 'Todo' },
        { id: 2, content: 'Implement authentication', status: 'In Progress' },
        { id: 3, content: 'Write API documentation', status: 'Done' },
        { id: 4, content: 'Set up CI/CD pipeline', status: 'Backlog' },
        { id: 5, content: 'Refactor database schema', status: 'In Review' },
    ])

    const moveTask = (id: number, newStatus: Task['status']) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        )
    }

    const addTask = (status: Task['status']) => {
        const taskName = prompt('Enter task name:')
        if (taskName?.trim()) {
            setTasks([...tasks, {
                id: Date.now(),
                content: taskName.trim(),
                status
            }])
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <Column status="Backlog" tasks={tasks.filter((t) => t.status === 'Backlog')} moveTask={moveTask} onAddTask={addTask} />
                    <Column status="Todo" tasks={tasks.filter((t) => t.status === 'Todo')} moveTask={moveTask} onAddTask={addTask} />
                    <Column status="In Progress" tasks={tasks.filter((t) => t.status === 'In Progress')} moveTask={moveTask} onAddTask={addTask} />
                    <Column status="In Review" tasks={tasks.filter((t) => t.status === 'In Review')} moveTask={moveTask} onAddTask={addTask} />
                    <Column status="Done" tasks={tasks.filter((t) => t.status === 'Done')} moveTask={moveTask} onAddTask={addTask} />
                </div>
            </div>
        </DndProvider>
    )
}

export default function StoriesHome() {
    const { teamName } = useTeam()
    const [activeTab, setActiveTab] = useState('all')

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">{teamName}</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="bugs">Bug reports</TabsTrigger>
                    <TabsTrigger value="chores">Chores</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <Kanban />
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                    <Kanban />
                </TabsContent>

                <TabsContent value="bugs" className="space-y-4">
                    <Kanban />
                </TabsContent>
                <TabsContent value="chores" className="space-y-4">
                    <Kanban />
                </TabsContent>

            </Tabs>

        </div>
    )
}

function Kanban() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <KanbanBoard />
        </motion.div>
    )
}