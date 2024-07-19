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
import { CreateRoadmap, CreateWorkflow } from '../../../components/Modals/createProject';
import { NoProject, ProjectsCards } from '../../../components/Project';

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
                        <CreateWorkflow />
                        <CreateRoadmap />
                    </CardContent>
                </Card>
            </div>

            <Separator />

            <h1 className="text-xl font-bold text-slate-800 mt-4 mb-2">All Projects</h1>

            {isLoading ? <Boxes /> : !error && data.data ? <ProjectsCards projects={data.data} /> : <NoProject />}
        </div>
    );
}