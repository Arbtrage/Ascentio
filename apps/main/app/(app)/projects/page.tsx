import type { Metadata } from "next";
import AllProjects from "./allProjectsClient";

export const metadata: Metadata = {
    title: "Projects | Ascentio"
};

export default async function ProjectsPage() {
    return <AllProjects />;
}