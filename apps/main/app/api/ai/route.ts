import { NextResponse, NextRequest } from "next/server";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';


export const promptTemplate = (userInput: string) => {
    return `You are an assistant helping to generate a multiple-choice flowchart about a topic. Only return the flowchart in mermaid JS format with no other text.
    Each node has to have a type, which is one of the following: 
    - startEvent
    - endEvent
    - activity
    You should include the node type in it's label, like this "Start ¡!startEvent!¡" or "Do something ¡!activity!¡".
    The diagram direction should be TD, top down.
    Only return the flowchart in mermaid JS format with no markdown markers.
    Topic: ${userInput}`;
};

export const POST = async (
    request: NextRequest,
) => {
    const query = await request.json();
    console.log(query)
    const google = createGoogleGenerativeAI({
        apiKey: "AIzaSyCkOW1dqsreicAB87JHrHHOz3BCfcR9Hog",
    });
    const { text } = await generateText({
        model: google("models/gemini-1.5-flash-latest"),
        prompt: promptTemplate(query),
    });

    console.log(text)

    return NextResponse.json(text);
};