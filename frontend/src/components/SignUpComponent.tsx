"use client"
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AuthFormComponent from './AuthFormComponent';
import { ToastContainer, toast } from 'react-toastify';


export default function SignUpComponent() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const router = useRouter();




    const handleSubmit = async () => {

        try {
            const response = await axios.post(`${baseUrl}/auth/signup`, {
                email, password
            });

            if (response.status === 201) {
                toast(response.data.data.message)
                router.push("/sign-in")
            }
            console.log(response.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response)
                toast(error?.response?.data.message)
            }
        }

    }

    return (
        <div className='flex flex-col justify-center max-w-md mx-auto h-screen my-auto '>
            <div className='text-center font-bold text-3xl my-4'>Create New User</div>
            <div className="shadow-xl p-10 rounded-xl">
                <AuthFormComponent email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} buttonText='Sign Up' />
                <p className="text-center text-gray-600 mt-3">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-sky-600 hover:text-sky-500 font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}
