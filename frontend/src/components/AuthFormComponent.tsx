import React, { FormEvent, useState } from 'react'

import { z } from 'zod';

const formSchema = z.object({
    email: z.string()
        .email("Please enter a valid email address")
        .min(1, "Email is required"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

interface AuthComponentType {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleSubmit: () => Promise<void>,
    buttonText: string;
}

export default function AuthFormComponent({ email, password, setEmail, setPassword, handleSubmit, buttonText }: AuthComponentType) {
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});



    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            handleSubmit()
        }
    }

    const validateForm = () => {
        try {
            formSchema.parse({ email, password });
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                let formattedErrors = {};
                error.errors.forEach((err) => {
                    formattedErrors = {
                        ...formattedErrors,
                        [err.path[0]]: err.message
                    }
                });
                setErrors(formattedErrors);
            }
            return false;
        }
    };

    return (
        <form onSubmit={handleFormSubmit} >
            <div className="space-y-3 mb-6 lg:mb-4">
                <label htmlFor="" className="lg:text-lg ">Email</label>
                <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email" className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 " />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-3 mb-6 lg:mb-4">
                <label htmlFor="" className="lg:text-lg">Password</label>
                <input type="password" name="password" id="" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password" className=" bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 " />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-center text-white px-5 py-2 rounded-md font-bold cursor-pointer text-lg">{buttonText}</button>

        </form>
    )
}
