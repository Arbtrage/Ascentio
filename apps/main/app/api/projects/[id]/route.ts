import { NextResponse, NextRequest } from "next/server";
import { getProject } from "../../../../lib/actions/project";


export const GET = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const project = await getProject(params.id);

    return NextResponse.json(project);
};