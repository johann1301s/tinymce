import React, { useRef } from 'react';
import { Editor as TEditor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import { editorConfig } from './editorConfig';

type Props = {
    onChange(value: string): void;
    value: string;
    user: {
        id: string;
        displayName: string;
    };
};

export const Editor = (props: Props) => {
    const editorRef = useRef<any>(null);

const addAnnotation = () => {
    if (editorRef.current) {
        const editor = editorRef.current;
        const selectedText = editor.selection.getContent({ format: 'text' });

        if (selectedText) {
            const rng = editor.selection.getRng();
            const span = document.createElement('span');
            span.style.backgroundColor = 'yellow';
            span.dataset.annotation = 'true';
            span.title = 'This is an annotation';

            rng.surroundContents(span);

            // Insert a zero-width space after the annotation
            const zwsp = document.createTextNode('\u200B');
            if (span.parentNode) {
                span.parentNode.insertBefore(zwsp, span.nextSibling);
            }

            // Move the cursor after the zero-width space
            const newRange = document.createRange();
            newRange.setStartAfter(zwsp);
            newRange.collapse(true);

            const sel = window.getSelection();
            if (sel) {
                sel.removeAllRanges();
                sel.addRange(newRange);
            }
            props.onChange(editor.getContent());

        } else {
            alert('Please select some text to annotate.');
        }
    }
};
    return (
        <Frame>
            <button onClick={addAnnotation}>Add Annotation</button>
            <TEditor
                apiKey={'by4qv2emnp8ycc1kyjn0uklquidsksc96ahp2axcio2uge9d'}
                onEditorChange={props.onChange}
                value={props.value}
                toolbar={['bold']}
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: 'code',
                }}
            />
        </Frame>
    );
};

const Frame = styled.div`
    button {
        margin-bottom: 10px;
        padding: 5px 10px;
        cursor: pointer;
    }
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
                & > [class^='tox-toolbar'] {
                    background-color: ${editorConfig.toolbarBg} !important;
                    font-family: 'Nunito';
                    .tox-toolbar__group {
                        .tox-tbtn {
                            cursor: pointer;
                            outline: none;
                            border-radius: ${editorConfig.toolSelectedBorderRadius}px;
                            background: ${editorConfig.toolBg};
                            &:hover {
                                background: ${editorConfig.toolHoverBg};
                            }
                            &--enabled,
                            &--enabled:hover {
                                background: ${editorConfig.toolSelectedBg};
                            }
                        }
                    }
                }
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
                            color: ${editorConfig.commentsHeaderColor};
                        }
                    }
                }
            }
        }
    }
`;