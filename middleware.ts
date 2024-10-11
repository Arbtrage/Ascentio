import { NextResponse, NextRequest } from 'next/server';

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    let hostname = req.headers
        .get("host")!
        .replace(".localhost:3000", '')
        .replace(".ascentio.xyz", '')

    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
        }`;

    if (
        hostname === "localhost:3000" ||
        hostname === "ascentio.xyz") {
        const customUrl = new URL(`${path === "/" ? "" : "/get-started"}`, req.url);
        return NextResponse.rewrite(
            customUrl
        );
    }

    const newUrl = new URL(`/${hostname}${path}`, req.url);
    return NextResponse.rewrite(newUrl);
}