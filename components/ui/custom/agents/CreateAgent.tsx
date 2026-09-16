"use client"
import React, { useState } from 'react'
import { Textarea } from '../../textarea'
import { Button } from '../../button'
import { ArrowUp, BriefcaseBusiness, Mail, Plus, Search } from 'lucide-react'

const quickSuggestions = [
  {
    label: "Find AI Jobs",
    prompt: "Find the latest AI developer jobs posted this week that match my skills and summarize the best opportunities for me.",
  },
  {
    label: "Inbox Summary",
    prompt: "Check my inbox and summarize the most important emails, especially anything that requires my reply or attention.",
  },
  {
    label: "Research Topic",
    prompt: "Research a topic across the web, compare multiple sources, and give me a concise summary with the most important findings.",
  },
  {
    label: "Plan My Day",
    prompt: "Check my calendar and upcoming tasks, then create a prioritized plan for everything I should focus on today.",
  },
  {
    label: "Reddit Trends",
    prompt: "Find trending Reddit discussions about AI tools and agents, then summarize the most useful and interesting conversations.",
  },
]

const templates = [
  {
    title: "Find latest jobs",
    description: "Search the web for the latest jobs matching my profile.", // ⚠️ ডানপাশ truncated ছিল, আন্দাজে সম্পূর্ণ করা
    icon: BriefcaseBusiness,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    border: "hover:border-orange-300",
    glow: "hover:shadow-orange-100",
  },
  {
    title: "Daily inbox summary",
    description: "Summarize important emails and highlight what needs my attention.", // ⚠️ truncated ছিল
    icon: Mail,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "hover:border-blue-300",
    glow: "hover:shadow-blue-100",
  },
  {
    title: "Research a topic",
    description: "Search the web and create a useful research summary.", // ⚠️ truncated ছিল
    icon: Search,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    border: "hover:border-purple-300",
    glow: "hover:shadow-purple-100",
  },
]

function CreateAgent() {

    const [prompt, setPrompt] = useState('')

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

          <Button size={'icon'} className={'h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center'}>
            <ArrowUp className='size-5  text-amber-100' />
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

  <div className='mt-10'>
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
      </div>
    </div>
  )
}

export default CreateAgent