

type TEditorConfig = {
    contentAreaBg: string
}

const editorConfig1: TEditorConfig = {
    contentAreaBg: 'white'
}

export const editorConfig = editorConfig1

export const contentStyle = `
    body {
        background: ${editorConfig.contentAreaBg}
    }
    .lance-annotation-class {
        border: none !important;
        border-radius: 0 !important;
        background:rgb(193, 230, 255) !important;
    }
    .lance-annotation-class[data-selected="true"] {
        background: #9ed8ff !important;
        box-shadow: inset 0 0 0 2px #59bdff;
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
  