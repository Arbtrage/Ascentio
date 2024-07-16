"use server";

import prisma from "../prisma";
import { getSession } from "../auth";
import { projectData } from "../../types/project.type";

export const createProject = async (data: projectData) => {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("Access denied")
        }
        await prisma.project.create({
            data: {
                ...data,
                userId: session?.user.id
            }
        });
        return { status: 201, data: "Project Successfully Created" };
    } catch (error) {
        return { status: 400, data: error };
    }
}


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