"use client";

import React from "react";
import useSWR from 'swr'
import { fetcher } from "../../../../lib/utils";
import Boxes from "@ui/components/ui/boxes";

export default function Project({ id }: { id: string }) {

    const { data, error, isLoading } = useSWR(`/api/projects/${id}`, fetcher);

    if (isLoading) return <Boxes />

    console.log(data)

    return (
        <div>
            <h1>Project</h1>

            <p>{data?.data.name}</p>

            <p>{data?.data.description}</p>
        </div>
    )
}