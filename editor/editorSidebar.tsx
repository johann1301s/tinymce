

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
    width: 300px;
    .lance-content-scroller.annotations-aligned .annotation-ui-wrapper .annotation-ui[data-selected='true'] {
        box-shadow: 0 2px 2px -2px rgba(34,47,62,.1),0 8px 8px -4px rgba(34,47,62,.07);
		border: 1px solid #eee;
    }
    .lance-content-scroller .lance-annotations-container .annotation-ui-wrapper .annotation-ui {
        border-radius: 0;
        transition: none;
		padding: 12px;
		border: 1px solid #eee;
		.comment-reply-container {
			gap: 12px;
		}
    }
    .lance-content-scroller {
        border: none;
    }
    .lance-content-scroller .lance-annotations-container {
        padding: 0 25px;
    }
	.comment-controls {
		gap: 12px;
		margin: 0 !important;
		padding: 0 !important;
		.lance-ui-btn {
			margin: 0 !important;
		}
	}
	.lance-content-scroller .lance-annotations-container .annotation-ui-wrapper textarea {
		&.comment-reply-text {
			margin: 0 !important;
			border: 1px solid #b0b0b0 !important;
			&:focus-visible {
				outline: 2px solid rgb(43, 122, 212);
			}
			width: unset !important;
			border-radius: 0 !important;
		}
	}
	.lance-content-scroller .lance-annotations-container .annotation-ui-wrapper .annotation-ui[data-selected='true'] .annotation-tip {
		display: none;
	}
	.lance-content-scroller .lance-annotations-container .annotation-ui-wrapper .comment-ui[data-comment-first='true'] .comment-top {
		border-radius: 0;
		background: white;
		border-bottom: 1px solid #eee;
		.comment-avatar {
			background: #e2e2e2;
		}
	}
	.comment-body {
		padding: 0 !important;
		display: flex;
		textarea {
			padding: 0 !important;
			border: none !important;
		}
	}
`
