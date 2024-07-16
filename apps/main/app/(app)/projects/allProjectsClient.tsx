"use client";
import useSWR from 'swr'
import { fetcher } from '../../../lib/utils';
import Boxes from "@ui/components/ui/boxes";
import { Button } from "@ui/components/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@ui/components/card";
import { Separator } from "@ui/components/separator"

import { NoProject, ProjectsCards } from '../../../components/Project';

const projectsData = [
    { name: 'Project 1', description: 'Description for project 1' },
    { name: 'Project 2', description: 'Description for project 2' },
    { name: 'Project 3', description: 'Description for project 3' },
    { name: 'Project 4', description: 'Description for project 4' },
];

const cardData = [
    { id: 1, text: "Total Projects" },
    { id: 2, text: "Completed Projects" },
]

export default function AllProjects() {

    const { data, error, isLoading } = useSWR('/api/projects', fetcher);

    return (
        <div className="w-full">
            <div className="grid gap-0 grid-cols-3 p-4 min-h-[200px] animate-fadeIn">
                {cardData.map((item) => (
                    <Card key={item.id} className="w-full h-full flex flex-col justify-center items-center">
                        <CardHeader>
                            <CardTitle>{item.text}</CardTitle>
                        </CardHeader>
                        <CardContent className='text-5xl'>
                            0
                        </CardContent>
                    </Card>
                ))}
                <Card className="w-full h-full flex flex-col justify-center items-center">
                    <CardHeader>
                        <CardTitle>Create Project</CardTitle>
                    </CardHeader>
                    <CardContent className='w-full flex flex-row gap-2 items-center pt-3'>
                        <Button className='w-full text-blue-600 text-md border-blue-900' variant={"outline"}>Workflow</Button>
                        <Button className='w-full text-red-600 text-md border-red-900' variant={"outline"}>Roadmap</Button>
                    </CardContent>
                </Card>
            </div>

            <Separator />

            <h1 className="text-xl font-bold text-slate-800 mt-4 mb-2">All Projects</h1>

            {isLoading ? <Boxes /> : !error && data.data ? <ProjectsCards projects={projectsData} /> : <NoProject />}
        </div>
    );
}