'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { ArrowUpRight, ArrowDownRight, Users, Briefcase, TrendingUp, Activity, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'

// Sample data (replace with real data in a production environment)
const productivityData = [
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 75 },
    { name: 'Mar', value: 85 },
    { name: 'Apr', value: 82 },
    { name: 'May', value: 90 },
    { name: 'Jun', value: 88 },
]

const teamPerformanceData = [
    { name: 'Development', completed: 85, ongoing: 10, planned: 5 },
    { name: 'Design', completed: 75, ongoing: 20, planned: 5 },
    { name: 'Marketing', completed: 60, ongoing: 30, planned: 10 },
    { name: 'Sales', completed: 90, ongoing: 5, planned: 5 },
]

const projectStatusData = [
    { name: 'Completed', value: 12 },
    { name: 'In Progress', value: 8 },
    { name: 'Planned', value: 5 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export default function AdminOverview() {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="min-h-screen  p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Overview</h1>
            </motion.div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="teams">Teams</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard title="Total Employees" value="250" icon={Users} change={5} />
                        <StatCard title="Active Projects" value="18" icon={Briefcase} change={-2} />
                        <StatCard title="Team Efficiency" value="92%" icon={TrendingUp} change={3} />
                        <StatCard title="Avg. Task Completion" value="3.2 days" icon={Clock} change={-10} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Productivity Trend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        value: {
                                            label: "Productivity",
                                            color: "hsl(var(--chart-1))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={productivityData}>
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

                        <Card>
                            <CardHeader>
                                <CardTitle>Project Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        completed: {
                                            label: "Completed",
                                            color: "hsl(var(--chart-1))",
                                        },
                                        inProgress: {
                                            label: "In Progress",
                                            color: "hsl(var(--chart-2))",
                                        },
                                        planned: {
                                            label: "Planned",
                                            color: "hsl(var(--chart-3))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={projectStatusData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {projectStatusData.map((entry, index) => (
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ActivityFeed />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="teams" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    completed: {
                                        label: "Completed",
                                        color: "hsl(var(--chart-1))",
                                    },
                                    ongoing: {
                                        label: "Ongoing",
                                        color: "hsl(var(--chart-2))",
                                    },
                                    planned: {
                                        label: "Planned",
                                        color: "hsl(var(--chart-3))",
                                    },
                                }}
                                className="h-[400px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={teamPerformanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" />
                                        <Bar dataKey="ongoing" stackId="a" fill="var(--color-ongoing)" />
                                        <Bar dataKey="planned" stackId="a" fill="var(--color-planned)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                    <ProjectList />
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                    <ResourceUtilization />
                </TabsContent>
            </Tabs>
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
                    {change > 0 ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                    {Math.abs(change)}% from last month
                </p>
            </CardContent>
        </Card>
    )
}

function ActivityFeed() {
    const activities = [
        { id: 1, user: 'John Doe', action: 'completed task', project: 'Website Redesign', time: '2 hours ago' },
        { id: 2, user: 'Jane Smith', action: 'commented on', project: 'Mobile App', time: '4 hours ago' },
        { id: 3, user: 'Mike Johnson', action: 'started', project: 'Database Migration', time: 'Yesterday' },
    ]

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{activity.user} {activity.action} <span className="font-bold">{activity.project}</span></p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ProjectList() {
    const projects = [
        { id: 1, name: 'Website Redesign', progress: 75, status: 'On Track' },
        { id: 2, name: 'Mobile App Development', progress: 40, status: 'At Risk' },
        { id: 3, name: 'Database Migration', progress: 90, status: 'Completed' },
        { id: 4, name: 'AI Integration', progress: 10, status: 'Just Started' },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Status of all ongoing projects</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {projects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="font-medium">{project.name}</p>
                                <div className="flex items-center space-x-2">
                                    <Progress value={project.progress} className="w-[100px]" />
                                    <span className="text-sm text-gray-500">{project.progress}%</span>
                                </div>
                            </div>
                            <div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${project.status === 'On Track' ? 'bg-green-100 text-green-800' :
                                    project.status === 'At Risk' ? 'bg-yellow-100 text-yellow-800' :
                                        project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {project.status === 'On Track' && <CheckCircle className="mr-1 h-3 w-3" />}
                                    {project.status === 'At Risk' && <AlertCircle className="mr-1 h-3 w-3" />}
                                    {project.status === 'Completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                                    {project.status === 'Just Started' && <Activity className="mr-1 h-3 w-3" />}
                                    {project.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function ResourceUtilization() {
    const resourceData = [
        { category: 'Human Resources', utilized: 85, available: 15 },
        { category: 'Equipment', utilized: 70, available: 30 },
        { category: 'Software Licenses', utilized: 95, available: 5 },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Overview of organizational resource usage</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {resourceData.map((item) => (
                        <div key={item.category} className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">{item.category}</span>
                                <span className="text-sm text-gray-500">{item.utilized}% Utilized</span>
                            </div>
                            <Progress value={item.utilized} className="h-2" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}