import React, { useCallback } from 'react'
import { seatType } from '../constants/types'


export default function SeatGrid({ seatData, isLoading, availableSeats }: { seatData: seatType[], isLoading: Boolean, availableSeats: number }) {

    return (
        <div className="flex flex-col items-center w-full ">
            <div className="font-bold my-2">Ticket Booking</div>
            <div className="grid grid-cols-7 gap-4 w-full shadow-xl p-4 rounded-md min-h-[500px]">
                {
                    !isLoading ? seatData && seatData.map((seat: seatType) => {
                        return <div key={seat.id.toString()} className={`col-span-1 text-center py-1 px-3 rounded-sm text-sm ${seat.is_booked ? 'bg-amber-300' : 'bg-green-500'}`}>{seat.seat_number.toString()}</div>
                    }) :
                        <div className="col-span-7 flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-gray-500"></div>
                        </div>

                }

            </div>
            <div className="flex w-full gap-2 my-4 mx-20">
                <div className="bg-amber-300 w-full text-center py-1 px-3 rounded-sm font-semibold">Booked Seats = {seatData.length - availableSeats}</div>
                <div className="bg-green-500 w-full text-center py-1 px-3 rounded-sm font-semibold">Available Seats = {availableSeats} </div>
            </div>
        </div>
    )
}
