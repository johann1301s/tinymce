import React from 'react';
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

    return (
        <Frame>
            <TEditor
                apiKey={'by4qv2emnp8ycc1kyjn0uklquidsksc96ahp2axcio2uge9d'}
                onEditorChange={props.onChange}
                value={props.value}
                toolbar={['annotate-alpha']}
                init={{
                    height: 500,
                    menubar: false,
                    inline_boundaries: false,
                    content_style: contentStyle,
                    setup: (editor) => {
                        editor.ui.registry.addButton('annotate-alpha', {
                          text: 'Annotate',
                          onAction: () => {
                            const comment = prompt('Comment with?');
                            editor.annotator.annotate('alpha', {
                              comment
                            });
                            editor.focus();
                          }
                        })
                        editor.on('init', () => {
                            editor.annotator.register('alpha', {
                              persistent: true,
                              decorate: (uid, data) => ({
                                attributes: {
                                  'data-mce-comment': data.comment ? data.comment : '',
                                  'data-mce-author': data.author ? data.author : 'anonymous'
                                }
                              })
                            });
                        });
        
                    }
                }}
            />
        </Frame>
    );
};

const Frame = styled.div`

`;