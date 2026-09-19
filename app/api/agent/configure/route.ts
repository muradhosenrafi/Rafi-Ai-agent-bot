
import { NextRequest, NextResponse } from "next/server";
import {GoogleGenAI, ThinkingLevel} from "@google/genai"
import { AgentConfigSystemPrompt } from "@/data/prompt";
import { AgentConfigRespSchema } from "@/data/ResponseSchema";

export async function POST (req:NextRequest) {
    const {prompt}=await req.json();
if(!prompt.trim()){
  return NextResponse.json({error:"Promt is required"},{status:400})
}


const apiKey = process.env.GOOGLE_CLOUD_GEMINI_API_KEY;

try{
    const ai = new GoogleGenAI({apiKey})
    const response=await ai.models.generateContent({
        model:"gemini-3.8-flash",
        contents:AgentConfigSystemPrompt.replace('{USER_PROMPT}',prompt),
        config:{

            thinkingConfig:{thinkingLevel:ThinkingLevel.MEDIUM},
            responseMimeType:"application/json",
            responseJsonSchema: AgentConfigRespSchema
        }

    })
return NextResponse.json(JSON.parse(response.text??"{}"));

}catch(e){

    console.error("Error",e);
    return NextResponse.json({error:e},{status:500})
}

}