"use server"
import prisma from "../prisma"

export async function createOrganisation(name: string, domain: string) {
    const organisation = await prisma.organisation.create({
        data: {
            name,
            domain,
        }
    })
    return organisation;
}

export async function addMember(domain: string, userId: string) {
    const organisation = await prisma.organisation.update({
        where: {
            domain
        },
        data: {
            users: {
                connect: {
                    id: userId
                }
            }
        }
    })
    return organisation;
}

export async function getOrganisation(domain: string) {
    const organisation = await prisma.organisation.findUnique({
        where: {
            domain
        }
    })
    return organisation;
}