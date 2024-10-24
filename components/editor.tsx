'use client'

import { Editor as TEditor } from '@tinymce/tinymce-react';

type Props = {
    onChange(value: string): void
    value: string
}

export const Editor = (props: Props) => {

  return (
    <TEditor
        apiKey={'5mwypg9c08ih4fcpubmb57cavmibsx4ws639q0m85gy6b6hg'}
        value={props.value}
        init={{
            width: '1000px',
            plugins: ['tinycomments'],
            toolbar: 'bold italic | addcomment showcomments',
            tinycomments_mode: 'callback',
            tinycomments_author: 'Ola Nordamnn',
            tinycomments_create: (event: any) => {
                console.log(event)
            },
            tinycomments_reply: (event: any) => {
                console.log(event)
            },
            tinycomments_lookup: (event: any) => {
                console.log(event)
            },
            tinycomments_delete: (event: any) => {
                console.log(event)
            },
            tinycomments_delete_all: (event: any) => {
                console.log(event)
            },
            tinycomments_delete_comment: (event: any) => {
                console.log(event)
            },
            tinycomments_edit_comment: (event: any) => {
                console.log(event)
            }
          }}
        onEditorChange={props.onChange}
    />
  );
}
