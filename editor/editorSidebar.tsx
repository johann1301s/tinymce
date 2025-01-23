

import React, { useEffect, useRef, useState } from 'react';
import styled, {keyframes} from 'styled-components';

export const EditorSidebar = (props: any) => {
	const sidebarRef = useRef(null);
	const [ui, setUI] = useState<any>(null);

	useEffect(() => {
		if (!props.lance || !props.App || !sidebarRef.current) {
			return;
		}
		if (!ui) {
			const u = props.App.createAnnotationsUI({ type: "simple"});
			u.init({
				container: sidebarRef.current,
				generateUI: false,
				alignCommentsToEditor: false,
				owner: props.lance.getAnnotations()
			})
			setUI(u);
		}
		else {
			ui.setOwner(props.lance.getAnnotations());
		}
	}, [sidebarRef, ui, props.lance, props.App])
	return (
		<Scroller>
			<Frame ref={sidebarRef}/>
		</Scroller>
	);
}

const Scroller = styled.div`
	width: 300px;
	overflow-y: auto;
	height: 100%;
	scroll-behavior: smooth;
`


const fadeToGray = keyframes`
  from {
    background: #F9ECC6;
  }
  to {
    background: white;
  }
`;

const Frame = styled.div`
	width: 300px;
	.annotation-ui-wrapper {
		background: white;
		.annotation-ui {
			outline: none;
		}

		&[data-selected="true"] {
			background: white;
			animation-timing-function: ease-out;
			animation: ${fadeToGray} 3s forwards;
		}
	}
`
