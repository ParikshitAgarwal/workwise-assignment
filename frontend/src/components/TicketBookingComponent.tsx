"use client"
import React, { useCallback, useEffect, useState } from 'react'
import SeatGrid from './SeatGrid'
import BookingForm from './BookingForm'
import { seatType } from '../constants/types'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';

function TicketBookingComponent() {
  const [seatData, setSeatData] = useState<seatType[]>([])
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const [seatUpdated, setSeatUpdated] = useState(true);
  const [bookedSeats, setBookedSeats] = useState<number[]>([])
  const [seatBookingLoader, setSeatBookingLoader] = useState(false)
  const [seatResetBookingLoader, setSeatResetBookingLoader] = useState(false)
  const token = Cookies.get('token')


  const availableSeats = useCallback(() => {
    console.log("inside available seats")
    return seatData.filter((seat) => !seat.is_booked).length
  }, [seatData])

  const handleBooking = async () => {

    if (numberOfSeats <= 0 || numberOfSeats > 7) {
      toast("Number of seats should be greater than 0 and smaller than equal to  7")
      console.log("Number of seats should be greater than 0 and smaller than 7")
      return;
    }

    const availableSeatsNum = availableSeats()
    if (numberOfSeats > availableSeatsNum) {
      console.log(`Sorry, only ${availableSeatsNum} seats available`)
      toast(`Sorry, only ${availableSeatsNum} seats available`)
      return;
    }

    try {
      setSeatBookingLoader(true)
      const response = await axios.post(`${baseUrl}/seats/book`, {
        seatCount: numberOfSeats,

      }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

      if (response.status === 200) {
        setBookedSeats(response.data.data)
        setSeatUpdated(true)
        setNumberOfSeats(0)
        setSeatBookingLoader(false)

      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response)
        toast(error?.response?.data.message)
        setSeatBookingLoader(false)
      }

    }
  }

  const resetBooking = async () => {

    if (availableSeats() === 80) {
      toast("Seats are already reset please try after booking some seats")
      return;
    }

    try {
      setSeatResetBookingLoader(true)
      const response = await axios.post(`${baseUrl}/seats/reset`, {}, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      console.log(response.data)
      if (response.status === 200) {
        setSeatUpdated(true)
        setSeatResetBookingLoader(false)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response)
        toast(error?.response?.data.message)
        setSeatResetBookingLoader(false)
      }
    }
  }

  useEffect(() => {

    const getSeatsData = async () => {
      setIsLoading(true)

      console.log(process.env.NEXT_PUBLIC_BASE_URL)
      try {
        const response = await axios.get(`${baseUrl}/seats`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })

        console.log(response.data)
        setSeatData(response.data.data)
        setSeatUpdated(false)
        setIsLoading(false)

      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response)
          toast(error?.response?.data.message)
          setIsLoading(false)
        }
      }
    }


    if (seatUpdated) {
      getSeatsData()
    }

  }, [seatUpdated])

  return (
    <div className="flex max-w-4xl mx-auto gap-10 justify-center items-center ">
      {/*Availaible Seats Panel */}
      <SeatGrid seatData={seatData} isLoading={isLoading} availableSeats={availableSeats()} />

      {/* Book Ticket button */}

      <BookingForm
        numberOfSeats={numberOfSeats}
        bookedSeats={bookedSeats}
        setNumberOfSeats={setNumberOfSeats}
        handleBooking={handleBooking}
        seatBookingLoader={seatBookingLoader}
        seatResetBookingLoader={seatResetBookingLoader}
        resetBooking={resetBooking} />
      <ToastContainer />
    </div>
  );
}


export default TicketBookingComponent;