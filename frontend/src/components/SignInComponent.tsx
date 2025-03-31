"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import AuthFormComponent from './AuthFormComponent';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';


export default function SignInComponent() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const router = useRouter();



    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${baseUrl}/auth/login`, {
                email, password
            });

            if (response.status === 200) {
                // localStorage.setItem("token", response.data.data.token);
                const token = response.data.data.token;
                Cookies.set("token", token, {
                    expires: 7,
                    secure: true,
                    sameSite: "strict",
                });
                router.push("/")
            }
            console.log(response.data)
        } catch (error: any) {
            toast(error.response.data.message)
            console.log(error)
        }

    }

    return (
        <div className='flex flex-col justify-center max-w-md mx-auto h-screen my-auto '>
            <div className='text-center font-bold text-3xl my-4'>Sign In</div>
            <div className="shadow-xl p-10 rounded-xl">
                <AuthFormComponent email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} buttonText='Sign in' />
                <p className="text-center text-gray-600 mt-3">
                    Don't have an account?{" "}
                    <Link href="/sign-up" className="text-sky-600 hover:text-sky-500 font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}
