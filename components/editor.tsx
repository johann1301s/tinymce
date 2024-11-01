'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor as TEditor } from '@tinymce/tinymce-react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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


type User = {
    id: string;
    name: string;
    picture: string;
}

const users: User[] = [
    { id: '18', name: 'Ola Nordmann', picture: '/avatars/david.png' },
    { id: '15', name: 'Kari Nordmann', picture: '/avatars/mary.png' }
];

type Props = {
    onChange(value: string): void
    value: string
    activeUserId: string
}

export const Editor = (props: Props) => {
    const editorRef = useRef<any>(null);
    const [flite, setFlite] = useState<any>(null);

    const onEditorInited = useCallback((evt: unknown, editor: any) => {
        editorRef.current = editor;
        setFlite(editor.plugins.flite);
        editor.on('flite:init', (event: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const flite = event.flite;

            console.log(flite)
        });
    }, []);

    useEffect(() => {
        flite?.setUserInfo(props.activeUserId)
    }, [props.activeUserId, flite])

    return (
        <div style={{minHeight: '500px', minWidth: '80%', background: 'lightgray'}}>
            <TEditor
                apiKey={'5mwypg9c08ih4fcpubmb57cavmibsx4ws639q0m85gy6b6hg'}
                onInit={onEditorInited}
                value={props.value}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'tinycomments'
                    ],
                    external_plugins: {
                        flite: '/flite/plugin.min.js',
                    },
                    flite: {
                        users: users.slice(),
                        user: { id: props.activeUserId },
                        tooltips: {
                            template: '%a by %u, last edit %T'
                        },
                    
                    },
                    toolbar: [
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help |',
                        'addcomment showcomments | flite'
                    ],
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    skin: 'COSTUM',
                    content_css: "/",
                    skin_url: '/',
                    tinycomments_mode: 'embedded',
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
        </div>
    );
};
