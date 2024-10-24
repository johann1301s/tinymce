'use client'

import { Editor } from '@/components/editor'
import { supabase } from '@/lib/supabaseClient'
import { useState, useEffect } from 'react'

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [existingMessageId, setExistingMessageId] = useState<number | null>(null)

  // Fetch the first row on component mount
  useEffect(() => {
    const fetchFirstMessage = async () => {
      // Fetch the first message from the `messages` table
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .limit(1)
        .single() // Ensure only one row is fetched

      if (error) {
        console.error('Error fetching message:', error)
      } else if (data) {
        // Store the existing message ID and content
        setExistingMessageId(data.id)
        setMessage(data.content)
      }
    }

    fetchFirstMessage()
  }, [])

  const handleSubmit = async () => {
    if (existingMessageId) {
      // Update the first row's content
      const { error } = await supabase
        .from('messages')
        .update({ content: message })
        .eq('id', existingMessageId) // Ensure we're updating the first row

      if (error) {
        console.error('Error updating message:', error)
      } else {
        alert('Message updated!')
      }
    }
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', margin: '24px auto'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '24px', padding: '0 24px'}}>
        <Editor
          onChange={(value) => setMessage(value)}
          value={message}/>
        <button style={{padding: '10px'}} onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}
