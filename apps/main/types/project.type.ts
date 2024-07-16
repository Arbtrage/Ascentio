export type projectData = {
    name: string,
    description: string
}


export enum ProjectType {
    workflow = "WORKFLOW",
    roadmap = "ROADMAP"
}

export type createProjectData = {
    name: string,
    description: string,
    type: ProjectType
}