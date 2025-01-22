

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const EditorSidebar = (props: any) => {
	const sidebarRef = useRef(null);
	const [ui, setUI] = useState<any>(null);

	useEffect(() => {
		if (!props.lance || !props.App || !sidebarRef.current) {
			return;
		}
		if (!ui) {
			const u = props.App.createAnnotationsUI({ type: "aligned"});
			u.init({
				container: sidebarRef.current,
				generateUI: true,
				alignCommentsToEditor: true,
				owner: props.lance.getAnnotations()
			})
			setUI(u);
		}
		else {
			ui.setOwner(props.lance.getAnnotations());
		}
	}, [sidebarRef, ui, props.lance, props.App])
	return (
		<Frame ref={sidebarRef}/>
	);
}

const Frame = styled.div`
    background: white;
    width: 300px;
    .lance-content-scroller.annotations-aligned .annotation-ui-wrapper .annotation-ui[data-selected='true'] {
        box-shadow: 0 0 0 2px blue;
    }
    .lance-content-scroller .lance-annotations-container .annotation-ui-wrapper .annotation-ui {
        border-radius: 0;
        transition: none;

    }
`
