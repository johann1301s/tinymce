'use client'

import { Editor } from '@/editor/editor'
import { mockUsers } from '@/lib/mockUsers'
import { useState } from 'react'

export default function Home() {
  const [value, setValue] = useState('<p><lance-annotation class="lance-annotation-class" id="ann884793" title="Ola Nordmann: test" data-annotation-id="ann88479" data-ant="%7B%22id%22%3A%22ann88479%22%2C%22resolved%22%3Afalse%2C%22sequence%22%3A0%2C%22attributes%22%3A%5B%5D%2C%22comments%22%3A%5B%7B%22id%22%3A%22NDc800%22%2C%22userId%22%3A%2218%22%2C%22userName%22%3A%22Ola%20Nordmann%22%2C%22time%22%3A1737620894%2C%22text%22%3A%22test%22%7D%5D%7D" data-annotation-seq="0">refwergr</lance-annotation></p> <p><lance-annotation class="lance-annotation-class" id="ann734008" title="Ola Nordmann: eeew Ola Nordmann: fwef Ola Nordmann: fewfwe Ola Nordmann: efwe" data-annotation-id="ann73400" data-ant="%7B%22id%22%3A%22ann73400%22%2C%22resolved%22%3Afalse%2C%22sequence%22%3A1%2C%22attributes%22%3A%5B%5D%2C%22comments%22%3A%5B%7B%22id%22%3A%22MTE343%22%2C%22userId%22%3A%2218%22%2C%22userName%22%3A%22Ola%20Nordmann%22%2C%22time%22%3A1737621714%2C%22text%22%3A%22eeew%22%7D%2C%7B%22id%22%3A%22MTE344%22%2C%22userId%22%3A%2218%22%2C%22userName%22%3A%22Ola%20Nordmann%22%2C%22time%22%3A1737621716%2C%22text%22%3A%22fwef%22%7D%2C%7B%22id%22%3A%22MTE345%22%2C%22userId%22%3A%2218%22%2C%22userName%22%3A%22Ola%20Nordmann%22%2C%22time%22%3A1737621718%2C%22text%22%3A%22fewfwe%22%7D%2C%7B%22id%22%3A%22MTE346%22%2C%22userId%22%3A%2218%22%2C%22userName%22%3A%22Ola%20Nordmann%22%2C%22time%22%3A1737621721%2C%22text%22%3A%22efwe%22%7D%5D%7D" data-annotation-seq="1">efwe</lance-annotation></p> <p>&nbsp;</p> <p>&nbsp;</p>')
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
