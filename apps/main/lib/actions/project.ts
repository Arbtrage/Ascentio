"use server";

import prisma from "../prisma";
import { getSession } from "../auth";
import { createProjectData} from "../../types/project.type";



export const getAllProjects = async () => {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("Access denied")
        }
        const projects = await prisma.project.findMany({
            where: {
                userId: session?.user.id
            }
        });
        if (projects.length === 0) {
            return { status: 200, data: null };
        }
        return { status: 200, data: projects };
    } catch (error) {
        return { status: 400, data: error };
    }
}

export const getProject = async (id: string) => {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("Access denied")
        }
        const project = await prisma.project.findFirst({
            where: {
                id,
                userId: session?.user.id
            }
        });
        return { status: 200, data: project };
    } catch (error) {
        return { status: 400, data: error };
    }
}


export const createProject = async (data: createProjectData) => {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("Access denied")
        }
        const project=await prisma.project.create({
            data: {
                ...data,
                type: data.type,
                userId: session?.user.id
            }
        });
        return { status: 201, data: project };
    } catch (error) {
        return { status: 400, data: error };
    }
}