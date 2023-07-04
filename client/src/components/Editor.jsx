import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Editor = ({ handleChange, content }) => {

    const modules = {
        toolbar: [
            [{ 'header': [1,2, false]}],
            [ 'bold','italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered'},{'list':'bullet'},{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    }

    const formats = [
        'header',
        'bold','italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list','bullet','indent',
        'link','image'
    ];

  return (
    <div>
        <ReactQuill value={content} modules={modules} formats={formats} onChange={handleChange} />
    </div>
  );
};

export default Editor;