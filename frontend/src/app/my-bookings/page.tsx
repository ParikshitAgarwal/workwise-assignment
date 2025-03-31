"use client"

import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

interface BookedSeatType {
    booking_id: string,
    booked_seats: number[]
}

export default function MyBookings() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const [isLoading, setIsLoading] = useState(true);
    const token = Cookies.get('token')
    const [bookedSeatData, setBookedSeatData] = useState<BookedSeatType[]>([])
    const [seatUpdated, setSeatUpdated] = useState(true);

    useEffect(() => {
        const getSeatsData = async () => {
            setIsLoading(true)

            console.log(process.env.NEXT_PUBLIC_BASE_URL)
            try {
                const response = await axios.get(`${baseUrl}/seats/booked-seats`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })

                console.log(response.data)
                if (response.status === 200) {
                    setBookedSeatData(response.data.data)
                    setSeatUpdated(false)
                    setIsLoading(false)
                }

            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response)
                    toast(error?.response?.data.message)
                    setSeatUpdated(false)
                    setIsLoading(false)
                }
            }
        }

        if (seatUpdated) {
            getSeatsData()
        }
    }, [seatUpdated])

    const handleCancel = async (id: string) => {

        try {
            setIsLoading(true)

            const response = await axios.post(`${baseUrl}/seats/cancel-booking`, {
                bookingId: id
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            console.log(response.data)
            if (response.status === 200) {
                setSeatUpdated(true)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response)
                setSeatUpdated(true)
                toast(error?.response?.data.message)
            }
        }
    }

    return (
        <div className='h-screen'>
            {
                !isLoading ? bookedSeatData && bookedSeatData.map((bookedSeat) => {
                    return <div key={bookedSeat.booking_id} className='flex  max-w-5xl mx-auto  justify-center items-center'>
                        <div className='flex items-center shadow-xl my-2 p-5 w-1/3 justify-center gap-2'>
                            {
                                bookedSeat.booked_seats.map((seat) => {
                                    return <div key={seat.toString()}
                                        className={`col-span-1 text-center w-10 py-1 px-3 rounded-sm text-sm bg-amber-300`}>{seat.toString()}</div>
                                })
                            }

                        </div>
                        <button onClick={() => handleCancel(bookedSeat.booking_id)} className="bg-blue-500 text-center text-white mx-5 px-5 py-1 rounded-md font-bold cursor-pointer ">
                            Cancel Booking
                        </button>
                    </div>
                }) :
                    <div className="col-span-7 flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-gray-500"></div>
                    </div>

            }

            {
                bookedSeatData.map((bookedSeat) => {
                    return <div key={bookedSeat.booking_id}>

                    </div>
                })
            }
        </div>
    )
}
