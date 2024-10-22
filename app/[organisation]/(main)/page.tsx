'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { CheckCircle, Clock, AlertCircle, BarChart2, PieChart as PieChartIcon, TrendingUp, Plus } from 'lucide-react'

// Sample data (replace with real data in a production environment)
const taskCompletionData = [
    { name: 'Mon', completed: 5, total: 8 },
    { name: 'Tue', completed: 7, total: 10 },
    { name: 'Wed', completed: 6, total: 7 },
    { name: 'Thu', completed: 4, total: 6 },
    { name: 'Fri', completed: 8, total: 9 },
    { name: 'Sat', completed: 3, total: 4 },
    { name: 'Sun', completed: 2, total: 3 },
]

const taskDistributionData = [
    { name: 'To Do', value: 4 },
    { name: 'In Progress', value: 3 },
    { name: 'Done', value: 8 },
]

const productivityTrendData = [
    { name: 'Week 1', value: 65 },
    { name: 'Week 2', value: 75 },
    { name: 'Week 3', value: 80 },
    { name: 'Week 4', value: 85 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="bg-background p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Task
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Tasks Completed" value="15" icon={CheckCircle} change={5} />
                    <StatCard title="Tasks In Progress" value="7" icon={Clock} change={-2} />
                    <StatCard title="Overdue Tasks" value="3" icon={AlertCircle} change={1} />
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Task Completion</CardTitle>
                                    <CardDescription>Your task completion rate over the past week</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer
                                        config={{
                                            completed: {
                                                label: "Completed",
                                                color: "hsl(var(--chart-1))",
                                            },
                                            total: {
                                                label: "Total",
                                                color: "hsl(var(--chart-2))",
                                            },
                                        }}
                                        className="h-[300px]"
                                    >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={taskCompletionData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Legend />
                                                <Bar dataKey="completed" fill="var(--color-completed)" />
                                                <Bar dataKey="total" fill="var(--color-total)" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Task Distribution</CardTitle>
                                    <CardDescription>Current status of your tasks</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer
                                        config={{
                                            todo: {
                                                label: "To Do",
                                                color: "hsl(var(--chart-1))",
                                            },
                                            inProgress: {
                                                label: "In Progress",
                                                color: "hsl(var(--chart-2))",
                                            },
                                            done: {
                                                label: "Done",
                                                color: "hsl(var(--chart-3))",
                                            },
                                        }}
                                        className="h-[300px]"
                                    >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={taskDistributionData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {taskDistributionData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="tasks">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Tasks</CardTitle>
                                <CardDescription>Your most recent tasks and their status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TaskList />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <Card>
                            <CardHeader>
                                <CardTitle>Productivity Trend</CardTitle>
                                <CardDescription>Your productivity score over the past month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        value: {
                                            label: "Productivity Score",
                                            color: "hsl(var(--chart-1))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={productivityTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
}

function StatCard({ title, value, icon: Icon, change }: { title: string, value: string, icon: any, change: number }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${change > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {change > 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingUp className="mr-1 h-4 w-4 rotate-180" />}
                    {Math.abs(change)} from last week
                </p>
            </CardContent>
        </Card>
    )
}

function TaskList() {
    const tasks = [
        { id: 1, title: 'Complete project proposal', status: 'In Progress', dueDate: '2023-06-15' },
        { id: 2, title: 'Review team presentations', status: 'To Do', dueDate: '2023-06-18' },
        { id: 3, title: 'Update client documentation', status: 'Done', dueDate: '2023-06-10' },
        { id: 4, title: 'Prepare for quarterly meeting', status: 'To Do', dueDate: '2023-06-20' },
        { id: 5, title: 'Finalize budget report', status: 'In Progress', dueDate: '2023-06-17' },
    ]

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>{task.title.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                        </div>
                    </div>
                    <Badge
                        variant={task.status === 'Done' ? 'default' : task.status === 'In Progress' ? 'secondary' : 'outline'}
                    >
                        {task.status}
                    </Badge>
                </div>
            ))}
        </div>
    )
}