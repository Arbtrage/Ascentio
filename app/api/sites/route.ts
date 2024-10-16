import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
    const site = req.nextUrl.searchParams.get("id");

    if (!site) {
        return NextResponse.json({ error: "Missing site" }, { status: 400 });
    }
    try {
        const data = await prisma.organisation.findUnique({
            where: {
                domain: site
            },
            select: {
                name: true,
                logo: true
            }
        });
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};