import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

export async function POST(req: Request)
{
    try
    {
        const{topic, text} = await req.json();
        const correct: string[] = [];
        const incorrect: string[] = [];
        const missing: string[] = [];

        const prompt = `A student is studying computer science. 
        Specifically, they are studying ${topic}. 
        Here is their understanding of the topic so far, as written by them: ${text}
        Create three lists: one with the correct concepts they have listed, one with 
        the incorrect concepts they listed, and one with concepts they did not list about
        the topic that a teacher in a college-level course may expect them to know. 
        You may format each of these lists as bullet points.
        Your response should be an object of JSON {correct:[], incorrect:[], missing:[]}`;
        
        const completion = await client.chat.completions.create(
            {
                model: 'gpt-4o-mini',
                messages: [{role: 'user', content: prompt}],
                response_format: {type: 'json_object'},
            }
        )

        const content = completion.choices[0].message.content
        console.log("OpenAI raw output:", content)

        const result = content ? JSON.parse(content): {correct: [], incorrect: [], missing: []}
        return NextResponse.json(result);
    }

    catch (err: any)
    {
        console.error(err)
        return NextResponse.json(
            {error: "Failed to process request"},
            {status: 500}
        );
    }

}