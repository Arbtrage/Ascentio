
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
    let domain = req.nextUrl.searchParams.get("domain");
    const path = req.nextUrl.searchParams.get('path')
    if (!domain) {
        const session = await getSession();
        domain = session?.user?.domain || "";
    }

    if (domain === "") {
        return NextResponse.json([]);
    }

    const orgData = await prisma.organisation.findUnique({
        where: {
            domain
        },
        select: {
            projects: true
        }
    })
    if (path) revalidatePath(path)
    return NextResponse.json(orgData?.projects || []);
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json();
    const { name, description } = body;
    const org = await prisma.organisation.findUnique({
        where: {
            domain: session.user.domain
        }
    })
    await prisma.project.create({
        data: {
            name: name,
            description: description,
            organisationId: org?.id,
            adminId: session.user.id
        },
    })
    return NextResponse.json({ success: true }, { status: 200 })
}