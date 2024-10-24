'use client'

import { supabase } from '@/lib/supabaseClient'
import { useState, FormEvent, useEffect } from 'react'

// Define the type for a message
type Message = {
  id: number
  content: string
}

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error } = await supabase
      .from<any, any>('messages')
      .insert([{ content: message }])

    if (error) {
      console.error(error)
    } else {
      setMessage('') // Clear the input field after submission
    }
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase.from<any, any>('messages').select('*')
      if (error) {
        console.error(error)
      } else {
        setMessages(data || [])
      }
    }

    fetchMessages()

    // Set up a real-time subscription using the Realtime API
    const channel = supabase
      .channel('public:messages') // Use the 'public:messages' format to track changes
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        // @ts-ignore
        setMessages((prevMessages) => [...prevMessages, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div>
      <h1>Enter a message</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <button type="submit">Send</button>
      </form>
      {messages.map((me) => (
        <div key={me.id}>
          {me.content}
        </div>
      ))}
    </div>
  )
}