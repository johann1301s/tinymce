import React, { useRef } from 'react';
import styled from 'styled-components';
import { Editor as TEditor } from '@tinymce/tinymce-react';
import { contentStyle } from './editorConfig';

type Props = {
    onChange(value: string): void;
    value: string;
    user: {
        id: string;
        displayName: string;
    };
};

export const Editor = (props: Props) => {
    const ref = useRef<any>(null);

    const annotate = () => {
        const editor = ref.current
        if (!editor) return

        const selectedText = editor.selection.getContent({ format: 'text' });
        const rng = editor.selection.getRng();
        const span = document.createElement('span');
        span.style.background = 'red'
        rng.surroundContents(span);


        //console.log(rng)
    }

    return (
        <Frame>
            <button onClick={() => annotate()}>Annotate</button>
            <TEditor
                apiKey={'by4qv2emnp8ycc1kyjn0uklquidsksc96ahp2axcio2uge9d'}
    
                value={props.value}
                onInit={(evt, editor) => (ref.current = editor)}
                init={{
                    height: 500,
                    menubar: false,
                    content_style: contentStyle,
                    inline_boundaries: false,
                    setup: (editor) => {
                        editor.on('beforeinput', (event) => {
                            const rng = editor.selection.getRng(); // Capture initial selection
                            console.log("Captured selection:", rng.startOffset, rng.endOffset, event.inputType);
                        
                            const inputType = event.inputType; // Detect if it's backspace, delete, or typing
                            const data = event.data || "";

                            const wierd = ['insertText', 'deleteContentBackward', 'deleteContentForward'].includes(inputType)

                            if (wierd) {
                                event.preventDefault(); // Temporarily block the event
                                setTimeout(() => {
                                    editor.undoManager.transact(() => {
                                        if (inputType === "insertText") {
                                            editor.execCommand("mceInsertContent", false, data);
                                        } else if (inputType === "deleteContentBackward" || inputType === "deleteContentForward") {
                                            editor.execCommand("Delete");
                                        }
                                    });
                                }, 0);
                            }
                        });
                      }
                }}
            />
        </Frame>
    );
};

const Frame = styled.div`

`;
