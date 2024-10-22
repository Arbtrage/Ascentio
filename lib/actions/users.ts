"use server";
import prisma from "../prisma";
import { getSession } from "../auth";

interface AddUser {
    name: string
    email: string
}

export async function AddUser({ email, name }: AddUser) {
    const session = await getSession()
    if (!session) return false;
    try {
        const org = await prisma.organisation.findUnique({
            where: {
                domain: session.user.domain
            }
        })
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: 'password',
                organisationId: org?.id
            },
        })
        return true
    } catch (error) {
        return false
    }
}