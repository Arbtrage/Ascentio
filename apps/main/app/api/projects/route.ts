import { NextResponse } from "next/server";
import { getAllProjects } from "../../../lib/actions/project";


export const GET = async () => {
    const projects = await getAllProjects();

    return NextResponse.json(projects);
};