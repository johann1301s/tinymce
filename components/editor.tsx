'use client'

import { Editor as TEditor } from '@tinymce/tinymce-react';

type Props = {
    onChange(value: string): void
    value: string
}

export const Editor = (props: Props) => {

  return (
    <TEditor
        apiKey={'5mwypg9c08ih4fcpubmb57cavmibsx4ws639q0m85gy6b6hg'}
        value={props.value}
        init={{
            plugins: [
            'flite',
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
            ],
            toolbar: 'flitefind flitelocate fliteinsert flitetrack fliteedit undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat', // FLITE toolbar buttons
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
            ],
            height: 500,
            width: '100%',
            menubar: true, 
            flite_options: {
            track_changes: true
            },
        }}
        onEditorChange={props.onChange}
    />
  );
}
