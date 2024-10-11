'use client';
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
//@ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

// Register the image resize module
Quill.register('modules/imageResize', ImageResize);

const MyQuillEditor = ({ formik, name }: { formik: any, name: string }) => {

  const handleChange = (content: string) => {
    formik.setFieldValue(name, content);
  };

  // Custom toolbar options with alignment and font size
  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }], // font size options
      ['bold', 'italic', 'underline', 'strike', { 'align': [] }, 'color', 'link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // list options
      [{ 'align': [] }], // Text alignment
      ['blockquote', 'code-block']
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize']
    }
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'header', 'size', 'link', 'image', 'list', 'bullet', 'align', 'color'
  ];

  return (
    <div className=" relative overflow-scroll">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={formik.values[name]}
        onChange={handleChange}
        style={{ height: '50vh',backgroundColor: formik.errors[name] && formik.touched[name] ? '#F08080' : 'white' }}
      />
    </div>
  );
};

export default MyQuillEditor;
