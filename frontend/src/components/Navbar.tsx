"use client"
import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

export default function Navbar() {

    const router = useRouter();

    const handleLogOut = () => {
        Cookies.remove('token')
        router.push("/sign-in")
    }
    return (
        <div className='py-2 px-4 flex justify-between'>

            <div className='text-2xl font-bold'>
                TicketBooking
            </div>

            <button onClick={handleLogOut} className="bg-blue-500 text-center text-white px-5 py-1 rounded-md font-bold cursor-pointer ">
                Log Out</button>
        </div>
    )
}
