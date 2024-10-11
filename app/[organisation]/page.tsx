interface Props {
    params: {
        organisation: string;
    };
}

export default async function Home({ params }: Props) {
    console.log(params);
    return (
        <>
            <h1>Page</h1>
        </>
    );
}