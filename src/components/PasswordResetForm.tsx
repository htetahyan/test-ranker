'use client';

import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import {toast} from "sonner";
import {useRouter} from "next/navigation";
import { Button, Input } from '@nextui-org/react';

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm Password is required'),
});

const PasswordResetForm = ({ id }: { id: number }) => {
const router = useRouter()
    const form = useFormik({
        initialValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async(values) => {
toast.promise(
    new Promise((resolve, reject) => {
        fetch(`/api/account/verify-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id,password:values.newPassword}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    resolve(data.message);
                } else {
                    reject(data.message);
                }
            })
            .catch((error) => {
                console.log(error)
                reject(error.message);
            }).finally(() => {
                form.resetForm();
router.replace('/dashboard/settings')
            });
    }),
    {
        loading: 'Loading...',
        success: 'Success!',
        error: (error) =>   error,

    }
)
        },
    });
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-sm w-full">
                <h2 className="text-center text-2xl font-bold mb-6">Reset Your Password</h2>
                <form onSubmit={form.handleSubmit}>
                    <div className="mb-4">
                        <Input
                            id="newPassword"
                            onChange={form.handleChange}
                            name="newPassword"
                            type="password"
                            placeholder="New Password"
                            className={`border ${form.errors.newPassword && form.touched.newPassword ? 'border-red-500' : 'border-gray-300'} rounded p-3 w-full`}
                        />
                        {form.errors.newPassword && form.touched.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{form.errors.newPassword}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <Input
                            id="confirmNewPassword"
                            onChange={form.handleChange}
                            name="confirmNewPassword"
                            type="password"
                            placeholder="Confirm New Password"
                            className={`border ${form.errors.confirmNewPassword && form.touched.confirmNewPassword ? 'border-red-500' : 'border-gray-300'} rounded p-3 w-full`}
                        />
                        {form.errors.confirmNewPassword && form.touched.confirmNewPassword && (
                            <p className="text-red-500 text-sm mt-1">{form.errors.confirmNewPassword}</p>
                        )}
                    </div>
                    <Button type="submit" variant="bordered" className="w-full py-3 mt-4">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;