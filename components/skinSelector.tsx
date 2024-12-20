import React, { useState } from 'react';

type TSkinSelectorProps = {
    onChange: (skin: string) => void;
};

export const SkinSelector = (props: TSkinSelectorProps) => {

    const options = [{
        id: '1',
        skin: 'pink'
        }, {
        id: '2',
        skin: 'matrix'
    }]

    const [skin, setSkin] = useState(options[0].skin)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSkin(event.target.value)
        props?.onChange(event.target.value);
    };

    return (
        <div style={{display: 'flex', gap: '12px'}}>
            Skin:
            <select value={skin} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option.id} value={option.skin}>
                        {option.skin}
                    </option>
                ))}
            </select>
        </div>
    );
};
