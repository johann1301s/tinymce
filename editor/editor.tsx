
import React, { useCallback, useRef, useState } from 'react';
import { Editor as TEditor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import { contentStyle, editorConfig } from './editorConfig';
import { Comments } from './comments';

type User = {
    id: number;
    name: string;
    picture: string;
}

const users: User[] = [
	{ id: 18, name: "Syd", picture: "/avatars/syd.png" },
	{ id: 15, name: "David", picture: "/avatars/david.png" },
	{ id: 21, name: "Mary", picture: "/avatars/mary.png" }
]

type Props = {
    onChange(value: string): void
    value: string
    user: {
        id: string
        displayName: string
    }
}

export const Editor = (props: Props) => {
	const editorRef = useRef(null);
	const [lance, setLance] = useState(null);
	const [lanceGlobals, setLanceGlobals] = useState(null);

	const onEditorInited = useCallback((evt: any, editor: any) => {
		editorRef.current = editor;
		setLance(editor.plugins.lance);
		editor.on("lance::init", function (event: any) {
			const lance = event.lance,
				ann = lance.getAnnotations();
			ann.addUsers(users);
			ann.setUserId(users[0].id);
			setLanceGlobals(lance.App);
		});
	}, [])
    
    return (
        <Wrapper>
            <Frame>
                <TEditor
                    apiKey={'tpwemofiiae8simzlmhkevt82ywprtc8szdc80usdo8xdy33'}
                    value={props.value}
                    onInit={onEditorInited}
                    onEditorChange={props.onChange}
                    toolbar={['bold italic underline strikethrough | redo undo | removeformat | alignleft aligncenter alignright alignjustify | lance']}
                    init={{
                        height: 500,
                        menubar: false,
                        content_style: contentStyle,
                        external_plugins: {
                            lance: '/lance/plugin.min.js'
                        },
                        lance: {
                            useTextSelection: "all"
                        }
                    }}/>
            </Frame>
            <Comments lance={lance} App={lanceGlobals}/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: row;
`

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
