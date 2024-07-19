"use server";
import prisma from "../prisma";
import { OnboardData } from "../../types/user.type";
import { getSession } from "../auth";


export const onboardUser = async (data: OnboardData) => {

    try {
        const nameEntry = data.find(d => d.label === "Name")?.value;
        const additionalDetails = data.reduce((acc, cur) => {
            if (cur.label !== "Name") {
                acc[cur.label] = cur.value;
            }
            return acc;
        }, {} as { [key: string]: string });

        const session = await getSession();
        if (!session) {
            throw new Error("Access denied")
        }

        const user = await prisma.user.findFirst({
            where: {
                id: session.user.id
            }
        })

        if (!user) {
            throw new Error("User not found")
        }
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: nameEntry,
                survey: JSON.stringify(additionalDetails)
            }
        })

        return { status: 200, message: "User onboarded" }
    } catch (error) {
        return { status: 400, message: error }
    }


}