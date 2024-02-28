import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// GET (READ)
export const GET = async(req, {params}) => {

    try {
        await connectDB

        const prompt = await Prompt.findById(params.id).populate('creator')

        if(!prompt) return new Response('Prompt not found', { status: 404})

        return new Response(JSON.stringify(prompt), { status: 200})
    } catch (error) {   
        return new Response("Failed to fetch prompt", { status: 500})
    }
}

// PATCH (UPDATE)
export const PATCH = async(req, {params}) => {
    const{ prompt, tag } = await req.json()

    try {
        await connectDB

        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt) return new Response('Prompt not found', { status: 404})

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200})
    } catch (error) {   
        return new Response("Failed to update prompt", { status: 500})
    }
}

// DELETE (DELETE)
export const DELETE = async(req, {params}) => {

    try {
        await connectDB

        await Prompt.findByIdAndDelete(params.id)

        return new Response("Prompt deleted successfully", { status: 200})
    } catch (error) {   
        return new Response("Failed to delete prompt", { status: 500})
    }
}