'use client'

import { Editor } from '@/editor/editor'
import { mockUsers } from '@/lib/mockUsers'
import { useState } from 'react'

export default function Home() {
  const [value, setValue] = useState('')
  const [activeUserId, setActiveUserId] = useState(mockUsers[0].id)

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
            <select onChange={({target}) => setActiveUserId(parseInt(target.value))} value={activeUserId}>
              {mockUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <Editor
            key={activeUserId}
            onChange={(newValue) => setValue(newValue)}
            value={value}
            users={mockUsers}
            user={{
              id: activeUserId,
              displayName: mockUsers.find((itm) => itm.id === activeUserId)?.name || ''
            }}/>
            <div style={{wordBreak: 'break-all', fontSize: '10px'}}>{value}</div>
        </div>
      </div>
    </div>
  )
}
