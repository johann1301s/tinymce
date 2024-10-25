'use client';

import { Editor as TEditor } from '@tinymce/tinymce-react';

type Props = {
    onChange(value: string): void
    value: string
}

export const Editor = (props: Props) => {

    const conversations = {
        'id-1': {
            uid: 'uid-1',
            comments: [
                {
                    uid: 'uid-2',
                    author: 'author-1',
                    authorName: 'Kari Nordmann',
                    authorAvatar: 'av-1',
                    content: 'Hey, look! A comment!',
                    createdAt: '2024-10-25T00:00:00Z',
                    modifiedAt: '2024-10-25T00:00:00Z'
                },
            ]
        },
    }
      
  return (
    <TEditor
        apiKey={'5mwypg9c08ih4fcpubmb57cavmibsx4ws639q0m85gy6b6hg'}
        value={props.value}
        init={{
            width: '1000px',
            plugins: ['tinycomments'],
            toolbar: [
                'bold italic',
                'addcomment showcomments'
            ],
            skin: 'COSTUM',
            content_css: "/",
            skin_url: '/',
            tinycomments_mode: 'callback',
            tinycomments_author: 'Ola Nordmann',
            tinycomments_fetch: (event: any, done: any) => {
                done({ conversations });
            },
            tinycomments_create: (event: any) => {
                console.log(event);
            },
            tinycomments_reply: (event: any) => {
                console.log(event);
            },
            tinycomments_lookup: (event: any) => {
                console.log(event);
            },
            tinycomments_delete: (event: any) => {
                console.log(event);
            },
            tinycomments_delete_all: (event: any) => {
                console.log(event);
            },
            tinycomments_delete_comment: (event: any) => {
                console.log(event);
            },
            tinycomments_edit_comment: (event: any) => {
                console.log(event);
            }
          }}
        onEditorChange={props.onChange}
    />
  );
}