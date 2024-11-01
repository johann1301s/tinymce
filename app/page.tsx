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

  const [tools, setTools] = useState(createExampleTools())

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
            toolbar={tools}
            onChange={(value) => setMessage(value)}
            value={message}
            activeUserId={activeUserId}/>
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <div style={{alignSelf: 'start', flexGrow: '0', gap: '24px', display: 'flex', position: 'relative', width: '100%'}}>
            <button
              disabled={!existingMessageId || savingState !== 'default'}
              style={{padding: '10px'}}
              onClick={handleSubmit}>
              <b>{getSavingLabel(savingState)}</b>
            </button>
          </div>
          <textarea
              style={{flexGrow: 1, width: '100%', minHeight: '200px'}}
              value={tools.join('\n')}
              onChange={({target}) => setTools(target.value.split('\n'))}/>
          </div>
        </div>
      </div>
    </div>
  )
}

const tools = [
  'accordion',
  'addcomment',
  'aidialog',
  'aishortcuts',
  'aligncenter',
  'alignjustify',
  'alignleft',
  'alignnone',
  'alignright',
  'anchor',
  'blockquote',
  'blocks',
  'backcolor',
  'bold',
  'casechange',
  'checklist',
  'copy',
  'cut',
  'fontfamily',
  'fontsize',
  'forecolor',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'indent',
  'italic',
  'language',
  'lineheight',
  'newdocument',
  'outdent',
  'paste',
  'pastetext',
  'print',
  'exportpdf',
  'exportword',
  'importword',
  'redo',
  'remove',
  'removeformat',
  'selectall',
  'strikethrough',
  'styles',
  'subscript',
  'superscript',
  'underline',
  'undo',
  'visualaid',
  'a11ycheck',
  'advtablerownumbering',
  'revisionhistory',
  'typopgraphy',
  'casechange',
  'charmap',
  'code',
  'codesample',
  'showcomments',
  'ltr',
  'rtl',
  'editimage',
  'fliph',
  'flipv',
  'imageoptions',
  'rotateleft',
  'rotateright',
  'emoticons',
  'export',
  'footnotes',
  'footnotesupdate',
  'formatpainter',
  'fullscreen',
  'help',
  'image',
  'insertdatetime',
  'link',
  'openlink',
  'unlink',
  'bullist',
  'numlist',
  'media',
  'mergetags',
  'mergetags_list',
  'nonbreaking',
  'pagebreak',
  'pageembed',
  'permanentpen',
  'preview',
  'quickimage',
  'quicklink',
  'quicktable',
  'cancel',
  'save',
  'searchreplace',
  'spellcheckdialog',
  'spellchecker',
  'table',
  'flite'
]

const createExampleTools = () => {

  return [tools.join(' | ')]
}