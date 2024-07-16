"use client";

import { useState } from "react";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Label } from "@ui/components/label";
import { Textarea } from "@ui/components/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@ui/components/dialog";
import { createProject } from "../../lib/actions/project";
import { ProjectType } from "../../types/project.type";

function CreateForm({ triggerLabel, title, descriptionColor, borderColor, onSubmit }: any) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const formData = { name, description };
            const response = await onSubmit(formData);
            if (response.status === 201) {
                router.push(`/projects/${response.data.id}`);
            } else {
                toast.error("Failed to create project. Please try again.");
            }
        } catch (err) {
            toast.error("An error occurred while creating the project.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`w-full text-${descriptionColor} text-md border-${borderColor}`} variant={"outline"}>
                    {triggerLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{`Create a new ${title}`}</DialogTitle>
                        <DialogDescription>
                            Enter the name and the description of the {title.toLowerCase()}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogFooter>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Usage of CreateForm for Roadmap
function CreateRoadmap() {
    const onSubmit = async (formData: any) => {
        return await createProject({ ...formData, type: ProjectType.roadmap });
    };

    return <CreateForm onSubmit={onSubmit} triggerLabel="Roadmap" title="Roadmap" descriptionColor="blue-600" borderColor="blue-900" />;
}

// Usage of CreateForm for Workflow
function CreateWorkflow() {
    const onSubmit = async (formData: any) => {
        return await createProject({ ...formData, type: ProjectType.workflow });
    };

    return <CreateForm onSubmit={onSubmit} triggerLabel="Workflow" title="Workflow" descriptionColor="red-600" borderColor="red-900" />;
}

export { CreateRoadmap, CreateWorkflow };
