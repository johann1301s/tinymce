'use client'

import { Editor } from '@/components/editor'
import { minTime } from '@/lib/minTime'
import { mockUsers } from '@/lib/mockUsers'
import { supabase } from '@/lib/supabaseClient'
import { useState, useEffect } from 'react'

export default function Home() {
  const [message, setMessage] = useState<string>('')
  const [existingMessageId, setExistingMessageId] = useState<number | null>(null)
  const [activeUserId, setActiveUserId] = useState(mockUsers[0].id)
  const [savingState, setSavingState] = useState<'default' | 'saving' | 'saved' | 'error'>('default')


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
    const updateMessage = async () => {
      return supabase
      .from('messages')
      .update({ content: message })
      .eq('id', existingMessageId)
    }

    setSavingState('saving')
    const { error } = await minTime(updateMessage(), 1000)

    if (error) {
      setSavingState('error')
      setTimeout(() => {
        setSavingState('default')
      }, 1000)
    } else {
      setSavingState('saved')
      setTimeout(() => {
        setSavingState('default')
      }, 1000)
    }
  }

  const getSavingLabel = (state: typeof savingState) => {
    switch (state) {
      case 'default': {
        return 'Lagre'
      }
      case 'error': {
        return 'En feil oppsto'
      }
      case 'saved': {
        return 'Endringen ble lagret!'
      }
      case 'saving': {
        return 'Lagrer...'
      }
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
        padding: '24px',
        display: 'flex',
        justifyContent: 'center'
      }}>
      <div style={{width: '100%', maxWidth: '840px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px', padding: '0 24px'}}>
          <div style={{alignSelf: 'end', flexGrow: '0'}}>
            <select onChange={({target}) => setActiveUserId(target.value)} value={activeUserId}>
              {mockUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <Editor
            onChange={(value) => setMessage(value)}
            value={message}
            activeUserId={activeUserId}/>
          <div style={{alignSelf: 'start', flexGrow: '0'}}>
            <button
              disabled={!existingMessageId || savingState !== 'default'}
              style={{padding: '10px'}}
              onClick={handleSubmit}>
              <b>{getSavingLabel(savingState)}</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
