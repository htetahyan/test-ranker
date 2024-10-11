'use client'
import React from 'react'
import MyQuillEditor from '../textEditor/Editor'
import { useFormik } from 'formik'

const Answerer = () => {
    const formik=useFormik({
        initialValues:{
            description:''
        },
        onSubmit:async(values)=>{
            console.log(values)
        }
    })
  return (
    <div>
                      <MyQuillEditor formik={formik} name='description' />

    </div>
  )
}

export default Answerer
