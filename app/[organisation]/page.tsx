interface Props {
    params: {
        organisation: string;
    };
}

export default async function Home({ params }: Props) {
    return (
        <>
            <h1>Page</h1>
        </>
    );
}