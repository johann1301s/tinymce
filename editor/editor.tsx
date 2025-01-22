import React, { useCallback, useRef, useState } from 'react';
import { Editor as TEditor } from '@tinymce/tinymce-react';
import { EditorSidebar } from './editorSidebar';
import styled from 'styled-components';

type User = {
    id: number;
    name: string;
    picture: string;
}

const users: User[] = [
	{ id: 18, name: "Syd", picture: "/avatars/syd.png" },
	{ id: 15, name: "David", picture: "/avatars/david.png" },
	{ id: 21, name: "Mary", picture: "/avatars/mary.png" }
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
	const editorRef = useRef(null)
	const [lance, setLance] = useState(null)
	const [lanceGlobals, setLanceGlobals] = useState(null)

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
        <Frame>
            <EditorWrapper>
                <TEditor
                    apiKey={'tpwemofiiae8simzlmhkevt82ywprtc8szdc80usdo8xdy33'}
                    value={props.value}
                    onEditorChange={props.onChange}
                    toolbar={[ 'lance', 'flite' ]}
                    onInit={onEditorInited}
                    init={{
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
                            users: users.slice(),
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

const EditorWrapper = styled.div`
    flex-grow: 1;
`

const Frame = styled.div`
    display: flex;
    gap: 0;
    background: #cdcdcd;
`
