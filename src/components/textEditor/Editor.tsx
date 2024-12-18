'use client';
import React from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
//@ts-ignore
import ImageResize from 'quill-image-resize-module-react';


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
      [{ 'align': [] }], // Text alignment
      ['blockquote', 'code-block']
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize']
    }
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'header', 'size', 'link', 'image', 'list', 'align', 'color'
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
