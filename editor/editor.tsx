
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor as TEditor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import { editorIcons } from './editorIcons';
import { contentStyle, editorConfig } from './editorConfig';

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
    user: {
        id: string
        displayName: string
    }
}

export const Editor = (props: Props) => {
    const editorRef = useRef<any>(null);
    const [flite, setFlite] = useState<any>(null);

    const onEditorInited = useCallback((evt: unknown, editor: any) => {
        editorRef.current = editor;
        Object.entries(editorIcons).forEach(([key, entry]) => {
            editor.ui.registry.addIcon(key, entry)
        })
        setFlite(editor.plugins.flite);
        editor.on('flite:showHide', (event: any) => {
            if (event.show) {
                // hide comments
            }
        })
        editor.on('flite:init', (event: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const flite = event.flite;

        });
    }, []);

    useEffect(() => {
        flite?.setUserInfo(props.user.id)
        // const username = users.find(({id}) => props.activeUserId == id)?.name
        // editorRef.current?.options.set('tinycomments_author', username)
        // editorRef.current?.options.set('tinycomments_author_name', username)
    }, [props.user.id, flite])

    return (
        <Frame>
            <TEditor
                apiKey={'tpwemofiiae8simzlmhkevt82ywprtc8szdc80usdo8xdy33'}
                onInit={onEditorInited}
                value={props.value}
                toolbar={[
                    'bold italic underline strikethrough | redo undo | removeformat | alignleft aligncenter alignright alignjustify',
                    'flite-toggletracking flite-toggleshow flite-acceptall flite-rejectall flite-acceptone flite-rejectone | addcomment showcomments'
                ]}
                init={{
                    height: 500,
                    menubar: false,
                    content_style: contentStyle,
                    plugins: ['tinycomments'],
                    external_plugins: { flite: '/flite/plugin.min.js' },
                    flite: {
                        isTracking: false,
                        isVisible: false,
                        users: users.slice(),
                        user: { id: props.user.id },
                        tooltips: {
                            template: '%a by %u, last edit %T'
                        }
                    },
                    tinycomments_mode: 'embedded',
                    tinycomments_author: props.user.id,
                    tinycomments_author_name: props.user.displayName,
                }}
                onEditorChange={props.onChange}
            />
        </Frame>
    );
};

const Frame = styled.div`
    .tox-tinymce {
        border: none;
        border-radius: 0;
    }
    .tox-statusbar {
        display: none !important;

        .tox-statusbar__branding {
            display: none;
        }
    }
    .tox-editor-container {
        .tox-editor-header {
            box-shadow: ${editorConfig.toolbarDropShadow} !important;
            background-color: ${editorConfig.toolbarBg} !important;
            .tox-toolbar-overlord {
                background-color: ${editorConfig.toolbarBg} !important;
                & > [class^="tox-toolbar"] {
                    background-color: ${editorConfig.toolbarBg} !important;
                    font-family: "Nunito";
                    .tox-toolbar__group {
                        .tox-tbtn {
                            cursor: pointer;
                            outline: none;
                            border-radius: ${editorConfig.toolSelectedBorderRadius}px;
                            background: ${editorConfig.toolBg};
                            &:hover {
                                background: ${editorConfig.toolHoverBg};
                            }
                            &--enabled, &--enabled:hover {
                                background: ${editorConfig.toolSelectedBg};
                            }
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
            .tox-sidebar {
                background: ${editorConfig.contentAreaBg};
                .tox-sidebar__pane {
                    background-color: ${editorConfig.commentsBg};
                    .tox-conversations__header {
                        background: ${editorConfig.commentsHeaderBg};
                        .tox-conversations__title {
                            color: ${editorConfig.commentsHeaderColor};;
                        }
                    }
                }
            }
        }
        .tox-bottom-anchorbar {

        }
    }
`
