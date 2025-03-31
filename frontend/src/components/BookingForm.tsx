import React from 'react'

interface BookingFormInterface {
    numberOfSeats: number;
    bookedSeats: number[];
    setNumberOfSeats: (seats: number) => void;
    handleBooking: () => void;
    resetBooking: () => void;
    seatBookingLoader: boolean;
    seatResetBookingLoader: boolean;
}

export default function BookingForm({ numberOfSeats, bookedSeats, setNumberOfSeats, handleBooking, resetBooking, seatBookingLoader, seatResetBookingLoader }: BookingFormInterface) {
    return (
        <div className="flex flex-col justify-center w-full">
            <div className='flex gap-2'>
                <div>Book Seats</div>
                <div className='flex gap-1'>
                    {bookedSeats.map((seat) => {
                        return <div key={seat.toString()} className={`col-span-1 text-center py-1 px-3 rounded-sm text-sm bg-amber-300`}>{seat.toString()}</div>
                    })}
                </div>
            </div>
            <div className="my-3 flex gap-2">
                <input
                    type="number"
                    className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-600 placeholder-gray-400 "
                    placeholder="Enter number of seats"
                    value={numberOfSeats.toString()}
                    onChange={(e) => setNumberOfSeats(parseInt(e.target.value) || 0)}
                />
                <button onClick={handleBooking} className="bg-blue-500 text-center text-white px-5 py-1 rounded-md font-bold cursor-pointer w-1/4">
                    {seatBookingLoader ? <div className="flex justify-center items-center h-full w-full">
                        <div className="animate-spin rounded-full w-6 h-6 border-3 text-gray-200 border-t-transparent border-white"></div>
                    </div> : 'Book'}</button>
            </div>

            <button onClick={resetBooking} className="bg-blue-500 text-white px-5 py-2 rounded-md font-bold cursor-pointer">{seatResetBookingLoader ?
                <div className="w-full flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full w-6 h-6 border-3 text-gray-200 border-t-transparent border-white"></div>
                </div> : 'Reset Booking'} </button>

        </div>
    )
}
