import React from 'react';
import { Editor as TEditor } from '@tinymce/tinymce-react';

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

    return (
        <div>
            <TEditor
                apiKey={'tpwemofiiae8simzlmhkevt82ywprtc8szdc80usdo8xdy33'}
                value={props.value}
                onEditorChange={props.onChange}
                toolbar={[ 'flite lance' ]}
                onPluginLoadError={(err) => console.log(err)}
                init={{
                    external_plugins: {
                        lance: '/lance/plugin.min.js',
                        flite: '/flite/plugin.min.js',
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
        </div>
    );
};
