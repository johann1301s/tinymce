import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export function Comments(props: any) {
	// Will hold a ref to the sidebar DOM element
	const sidebarRef = useRef(null);
	// The AnnotationsUI instance
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
		<Frame className='sidebar' ref={sidebarRef}/>
	);
}

const Frame = styled.div`
    height: 200px;
    background-color: orange;
    & > div {
        height: 200px;
    }
`
