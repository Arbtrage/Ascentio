


import type { Metadata } from "next";
import Project from "./projectClient";

export const metadata: Metadata = {
    title: "Projects | Ascentio"
};

export default async function ProjectPage({ params }: { params: { id: string } }) {
    return <Project id={params.id} />;
}