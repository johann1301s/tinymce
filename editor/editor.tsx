import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor as TEditor } from '@tinymce/tinymce-react';
import { EditorSidebar } from './editorSidebar';
import styled from 'styled-components';

type Props = {
    onChange(value: string): void
    value: string
    users: Array< {
        id: number;
        name: string;
        picture: string;
    }>
    user: {
        id: number
        displayName: string
    }
}

export const Editor = (props: Props) => {
	const editorRef = useRef(null)
	const [lance, setLance] = useState(null)
	const [lanceGlobals, setLanceGlobals] = useState(null)
    const [flite, setFlite] = useState<any>(null);

    const onEditorInited = useCallback((evt: any, editor: any) => {
		editorRef.current = editor;
		setLance(editor.plugins.lance);
        setFlite(editor.plugins.flite);
		editor.on("lance::init", function (event: any) {
			const lance = event.lance,
				ann = lance.getAnnotations();
			ann.addUsers(props.users);
			ann.setUserId(props.user.id);
			setLanceGlobals(lance.App);
		});
	}, [props.users, props.user])

    useEffect(() => {
        flite?.setUserInfo(props.user.id)
    }, [props.user.id, flite])

    return (
        <Frame>
            <EditorWrapper>
                <TEditor
                    apiKey={'tpwemofiiae8simzlmhkevt82ywprtc8szdc80usdo8xdy33'}
                    value={props.value}
                    onEditorChange={props.onChange}
                    plugins={'wordcount'}
                    toolbar={[
                        'bold italic underline strikethrough | redo undo | removeformat | alignleft aligncenter alignright alignjustify',
                        'lance',
                        'flite-toggletracking flite-toggleshow flite-acceptall flite-rejectall flite-acceptone flite-rejectone',
                    ]}
                    onInit={onEditorInited}
                    init={{
                        height: '100%',
                        menubar: false,
                        external_plugins: {
                            lance: '/lance/plugin.min.js',
                            flite: '/flite/plugin.min.js',
                        },
                        lance: {
                            useTextSelection: "all"
                        },
                        flite: {
                            isTracking: false,
                            isVisible: false,
                            users: props.users.slice(),
                            user: { id: props.user.id },
                            tooltips: {
                                template: '%a by %u, last edit %T'
                            }
                        }
                    }}/>
                </EditorWrapper>
                <EditorSidebar
                    lance={lance}
                    App={lanceGlobals}/>
        </Frame>
    );
};

const Frame = styled.div`
    display: flex;
    gap: 0;
    background: transparent;
    border: 1px solid #eee;
    height: 600px;
`

const EditorWrapper = styled.div`
    flex-grow: 1;
    border-right: 1px solid #eee;
    .tox-tinymce {
        border: none;
        border-radius: 0;
    }
    .tox-statusbar {
        border-top: 1px solid #eee;
        .tox-statusbar__branding {
            display: none;
        }
    }
    .tox .tox-statusbar__resize-handle {
        display: none;
    }
    .lance-annotation-class {
        outline: 10px solid red;
        &[data-selected="true"] {
            background: red !important;
        }
    }

    // 9ed8ff
`
