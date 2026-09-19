"use client"
import React, { useState } from 'react'
import { Textarea } from '../../textarea'
import { Button } from '../../button'
import { ArrowUp, BriefcaseBusiness, Loader2, Loader2Icon, Mail, Plus, Search } from 'lucide-react'
import axios from 'axios'
import AIAgentQuestions from './AIAgentQuestions'

const quickSuggestions = [
    {
        label: "Find AI jobs",
        prompt: "Find the latest AI developer jobs posted this week that match my skills and summarize the best oppurtunities for me."
    },
    {
        label: "Inbox summary",
        prompt: "check my inbox and summarize the most important email, especifically anything that requires my reply or attention."
    },
    {
        label: "research topic",
        prompt: "research a topic across the web, compare multiple sources and give me a concise summary with the most important findings."
    },
    {
        label: "Plan my day",
        prompt: "check my calendar and upcoming tasks, then create a schedule"
    },
    {
        label: "reddit trends",
        prompt: "find trending reddit discussions about AI tools and agents, then summarize the most useful and interesting conversations."
    },
]


const templates = [
    {
        title: "Find latest jobs",
        description: "Search the web for the latest jobs matching my profile",
        icon: BriefcaseBusiness,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        border: "hover: border-orange-300",
        glow: "hover: border-orange-300",
    },
    {
        title: "daily inbox summary",
        description: "Summarize important emails and highlight what ",
        icon: Mail,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        border: "hover: border-blue-300",
        glow: "hover: border-blue-300",
    },
    {
        title: "Research a topic",
        description: "Search the web for the latest jobs matching my profile",
        icon: Search,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        border: "hover: border-purple-300",
        glow: "hover: border-purple-300",
    },
]

type AgentConfigResp = {
    status: "needs_clarification" | "ready"
    clarificationQuestions: clarificationQuestion[],
    config: any
}

export type ClarificationQuestion = {
    id: string
    question: string
    type: "single_select" | "multi_select" | "text" | "number"
    options: string[]
    allowCustom: boolean
    customPlaceholder: string
}

export type clarificationQuestion = ClarificationQuestion


function CreateAgent() {
  const [prompt, setPrompt] = useState('')
  const [configResult,setConfigResult] = useState<AgentConfigResp |  null >(null);
  const [loading,setLoading]=useState(false)



const OnSubmite= async ()=>{
  setLoading(true)

  try {
    const result = await axios.post('/api/agent/configure',{
    prompt:prompt
  })
  console.log(result.data);
  setConfigResult(result.data)
  setLoading(false)
}
catch (error) {
    console.error("Failed to configure agent:", error)
  } finally {
    setLoading(false)
  }
}
  

  return (
    <div className='mt-5'>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>Create New Agent</h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          Ask what type of agent you want to create, type your goal, task, or workflow
        </p>
      </div>

      {/* Prompt Box */}
      <div className='mt-4 rounded-xl border border-input bg-background shadow-sm focus-within:ring-ring shadow-purple-100 hover:shadow-purple-200'>
        <Textarea
          placeholder='Describe the agent you want to create...'
          className='min-h-[90px]  w-full resize-none bg-transparent px-3 py-3 text-sm outline-none border-0 focus-visible:ring-0'
          value={prompt}
           onChange={(e) => setPrompt(e.target.value)}
        />

        <div className='flex items-center justify-between px-2 pb-2'>
          <div>
            <Button variant={'ghost'} size={'icon'}>
              <Plus />
            </Button>
          </div>

          <Button
          disabled={loading}
          onClick={OnSubmite}
          size={'icon'} className={'h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center'}>

            {loading?<Loader2 className='animate-spin'/>: <ArrowUp className='size-5  text-amber-100' />}
           


          </Button>
        </div>
      </div>

      <div className='mt-2 flex gap-2'>
       {quickSuggestions.map((suggestion, index) => (
  <Button
    variant={'outline'}
       key={index}
    className='rounded-lg text-xs font-bold hover:text-purple-700 hover:bg-purple-200'
   onClick={() => setPrompt(suggestion.prompt)}
  >
    {suggestion.label}
  </Button>
))}
      </div>

   { loading ?<div className='flex gap-2 items-center p-5 mt-7 border rounded-xl shadow'>
        <Loader2Icon className='animate-spin'/>
        <h2>Generating Agent Config...</h2>
      </div>:

 !configResult && <div className='mt-10'>
        <h2 className='flex text-lg justify-between items-center font-semibold'>
          Get Started <span className='text-sm font-medium text-muted-foreground cursor-pointer hover:text-purple-600'>View All</span>
        </h2>

        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
          {templates.map((template, index) => (
            <div
              key={index}
              className={`rounded-xl border border-input p-4 transition-all cursor-pointer ${template.border} ${template.glow}`}
              onClick={() => setPrompt(template.description)}
            >
              <template.icon className={`h-10 w-10 p-2 ${template.iconBg} ${template.iconColor} rounded-lg`} />
              <div className='mt-4'>
                <h3 className='font-semibold text-foreground'>{template.title}</h3>
                <p className='text-sm mt-2 leading-5 text-muted-foreground'>{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>}
      {configResult &&
      <div className='p-5 border rounded-2xl'>
        
         {configResult.status === "needs_clarification" && (

            <AIAgentQuestions questionList={configResult.clarificationQuestions} />
          )}
        <p>{JSON.stringify(configResult)}</p>
      </div>
      }
    </div>
  )
}

export default CreateAgent