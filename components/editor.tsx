
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor as TEditor } from '@tinymce/tinymce-react';
import styled from 'styled-components';

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
    toolbar: string[]
    skin: string
}

export const Editor = (props: Props) => {
    const editorRef = useRef<any>(null);
    const [flite, setFlite] = useState<any>(null);
    const [show, setShow] = useState(false)

    const onEditorInited = useCallback((evt: unknown, editor: any) => {
        editorRef.current = editor;
        setFlite(editor.plugins.flite);
        editor.on('flite:init', (event: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const flite = event.flite;

        });
    }, []);

    useEffect(() => {
        flite?.setUserInfo(props.activeUserId)
        // const username = users.find(({id}) => props.activeUserId == id)?.name
        // editorRef.current?.options.set('tinycomments_author', username)
        // editorRef.current?.options.set('tinycomments_author_name', username)
    }, [props.activeUserId, flite])

    useEffect(() => {
        setShow(false)
    }, [props.toolbar, props.skin])

    useEffect(() => {
        setShow(true)
    }, [show])

    return (
        <Frame style={{minHeight: '500px', minWidth: '80%', background: 'lightgray'}}>
            {show && (
                <TEditor
                    apiKey={'5mwypg9c08ih4fcpubmb57cavmibsx4ws639q0m85gy6b6hg'}
                    onInit={onEditorInited}
                    value={props.value}
                    toolbar={props.toolbar}
                    init={{
                        height: 500,
                        icons_url: `${window.location.origin}/icons/icon-package-1/icons.js`,
                        icons: 'icon-package-1',
                        menubar: false,
                        content_style: 'body { background: #f8f8f8;}',
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', // 'tinycomments'
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
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'User',
                        tinycomments_fetch: (_event: any, done: any) => {
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
            )}
        </Frame>
    );
};


const Frame = styled.div`
    .tox-tinymce {
        border: none;
        border-radius: 0;
    }
    .tox-editor-container {
        .tox-editor-header {
            .tox-toolbar-overlord {
                .tox-toolbar {
                    font-family: "Nunito";
                    .tox-toolbar__group {
                        .tox-tbtn {
                            outline: none;
                        }
                    }
                }
            }
            .tox-anchorbar {
                
            }
        }
        .tox-sidebar-wrap {
            .tox-edit-area {
                &::before {
                    border-radius: 0;
                    border: none;
                }
            }
        }
        .tox-bottom-anchorbar {

        }
    }
`
