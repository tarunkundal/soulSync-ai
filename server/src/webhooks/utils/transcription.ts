import OpenAI from "openai";
import { toFile } from "openai/uploads";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function transcribeAudio(audioUrl: string): Promise<string> {

    const response = await fetch(audioUrl, {
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(
                    `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
                ).toString("base64"),
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch audio");
    }

    const audioBuffer = await response.arrayBuffer();

    const file = await toFile(Buffer.from(audioBuffer), "audio.ogg");

    const transcription = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
        response_format: "text",
    });
    console.log('transcription', transcription, 'response', response)
    return transcription as unknown as string;
}