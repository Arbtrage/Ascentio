"use client";

import React,{ useState } from "react";
import useSWR from 'swr';
import axios from 'axios';
import { fetcher } from "../../../../lib/utils";
import Boxes from "@ui/components/ui/boxes";

export default function Project({ id }: { id: string }) {
    const [query, setQuery] = useState('');
    const { data, error, isLoading } = useSWR(`/api/projects/${id}`, fetcher);

    if (isLoading) return <Boxes />

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/api/ai`, { query });
            console.log('Response:', response.data);
            // Handle response data or success state here
        } catch (error) {
            console.error('Error posting query:', error);
            // Handle error here
        }
    }
    return (
        <div>
            <h1>Project</h1>

            <p>{data?.data.name}</p>

            <p>{data?.data.description}</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your query"
                />
                <button type="submit">Submit Query</button>
            </form>

        </div>
    )
}