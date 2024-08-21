
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: {
        organisation: string;
    };
}

export default async function Home({ params }: Props) {

    console.log(params.organisation);

    return (
        <>
            <h1>Page</h1>
        </>
    );
}