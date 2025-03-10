

type TEditorConfig = {
    contentAreaBg: string
    toolHoverBg: string
    toolBg: string
    toolSelectedBg: string
    toolSelectedBorderRadius: number
    toolbarBg: string
    toolbarDropShadow: string
    commentsBg: string
    commentsHeaderBg: string
    commentsHeaderColor: string
}

const editorConfig1: TEditorConfig = {
    contentAreaBg: '#f8f8f8',
    toolHoverBg: '#f0f0f0',
    toolSelectedBg: '#a6ccf7',
    toolSelectedBorderRadius: 3,
    toolbarBg: '#acacac',
    toolBg: '#ffffff',
    toolbarDropShadow: '0 2px 2px -2px rgba(34,47,62,.1), 0 8px 8px -4px rgba(34,47,62,.07)',
    commentsBg: 'blue',
    commentsHeaderBg: 'pink',
    commentsHeaderColor: 'white'
}

export const editorConfig = editorConfig1

export const contentStyle = `
body {
    background: ${editorConfig.contentAreaBg}
}

.tox-comments-visible span.tox-comment:not([data-mce-selected]) {
    background: none;
    border-radius: 0;
    border: 2px dashed rgb(212, 177, 0);
}
.mce-content-body [data-mce-selected=inline-boundary] {
    background: none;
    border-radius: 0;
    border: 2px dashed rgb(212, 177, 0);
    box-shadow: none;
}

.tox-comments-visible span.tox-comment[data-mce-selected] {
    background: none;
    border-radius: 0;
    border: 2px dashed rgb(212, 177, 0);
    box-shadow: none;
}

.tox-comment {
    background: none !important;
    border-radius: 0;
    border: 2px dashed rgb(212, 177, 0);
    box-shadow: none;
}

.tox-comments-visible .mce-content-body [data-mce-selected=inline-boundary] {
    background: none;
}
.FLITE-Tracking  {
    .ice-del {
        outline: 4px solid red;
        background: unset !important;
    }
    .ice-ins {
        outline: 4px solid blue;
        background: unset !important;
    }
}

`

export const tools = [
    // 'accordion',
    'addcomment',
    // 'aidialog',
    // 'aishortcuts',
    'aligncenter',
    'alignjustify',
    'alignleft',
    'alignnone',
    'alignright',
    'anchor',
    'flite',
    'blockquote',
    'blocks',
    'backcolor',
    'bold',
    // 'casechange',
    // 'checklist',
    'copy',
    'cut',
    'fontfamily',
    'fontsize',
    'forecolor',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'indent',
    'italic',
    // 'language',
    'lineheight',
    'newdocument',
    'outdent',
    'paste',
    'pastetext',
    'print',
    // 'exportpdf',
    // 'exportword',
    // 'importword',
    'redo',
    'remove',
    'removeformat',
    'selectall',
    'strikethrough',
    'styles',
    'subscript',
    'superscript',
    'underline',
    'undo',
    'visualaid',
    // 'a11ycheck',
    // 'advtablerownumbering',
    // 'revisionhistory',
    // 'typopgraphy',
    // 'casechange',
    'charmap',
    'code',
    // 'codesample',
    'showcomments',
    // 'ltr',
    // 'rtl',
    // 'editimage',
    // 'fliph',
    // 'flipv',
    // 'imageoptions',
    // 'rotateleft',
    // 'rotateright',
    // 'emoticons',
    // 'export',
    // 'footnotes',
    // 'footnotesupdate',
    // 'formatpainter',
    'fullscreen',
    'help',
    'image',
    'insertdatetime',
    'link',
    'openlink',
    'unlink',
    'bullist',
    'numlist',
    'media',
    // 'mergetags',
    // 'mergetags_list',
    // 'nonbreaking',
    // 'pagebreak',
    // 'pageembed',
    // 'permanentpen',
    'preview',
    // 'quickimage',
    // 'quicklink',
    // 'quicktable',
    // 'cancel',
    // 'save',
    'searchreplace',
    // 'spellcheckdialog',
    // 'spellchecker',
    'table'
  ]
  