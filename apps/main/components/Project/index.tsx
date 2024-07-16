"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@ui/components/card";
import { useRouter } from "next/navigation";


function ProjectsCards({ projects }: any) {
    const router = useRouter()
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 animate-fadeIn">
            {projects && projects.map((project: any, index: any) => (
                <Card key={index} className="w-full cursor-pointer transform transition-transform duration-300 hover:scale-105" onClick={() => router.push(`/projects/${project.id}`)}>
                    <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {project.description}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}


function NoProject() {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-600 animate-fadeIn">
            <p className="text-xl mb-4">Oops, you have no projects yet.</p>
            <p className="text-lg">Click the button to create your first project.</p>
        </div>
    )
}

export { ProjectsCards, NoProject }