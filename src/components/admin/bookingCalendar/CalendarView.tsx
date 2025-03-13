import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ReactDatePicker from 'react-datepicker'
import { axiosFetchFacility, axiosGetBookingByDate } from '../../../axios'
import { Booking } from '../../../types/Booking'
import moment, { Moment } from 'moment-timezone'
import { Facility } from '../../../types/Facility'
import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { generateTimeSlots } from '../../../utils/generateTimeSlot'
import { SlCalender } from 'react-icons/sl'
import { todayToString } from '../../../utils/dates'
import { useTranslation } from 'react-i18next'

type CalendarViewProps = {
    bookings: Booking[]
    setBookings: (booking: Booking[]) => void
    refresh: boolean
    setRefresh: (value: boolean) => void
    setSelectedBooking: (value: Booking) => void
    setIsBookingInfoOpen: (value: boolean) => void
}
interface CustomButtonProps {
    value?: string
    onClick?: () => void
}

const CalendarView = ({ bookings, setBookings, setSelectedBooking, setIsBookingInfoOpen }: CalendarViewProps) => {
    const [allFacility, setAllFacility] = useState<Facility[]>([]) //data comes with one language
    const [visibleColumns, setVisibleColumns] = useState<number>(0)
    const [selectedDate, setSelectedDate] = useState<Moment>(moment(todayToString()))
    const timeSlots = generateTimeSlots()
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
    const { i18n } = useTranslation()

    const fetchBookings = async (date: Moment) => {
        try {
            const formattedDate = date.format('YYYY-MM-DD')
            const fetchedBookingsByDate = await axiosGetBookingByDate(formattedDate)
            setBookings(fetchedBookingsByDate.data)

            const fetchedFacilities = await axiosFetchFacility()
    
            const sortedFacilities = fetchedFacilities.data.sort((a: Facility, b: Facility) => {
                if (a.type[i18n.language as 'en' | 'fi' | 'sv'] < b.type[i18n.language as 'en' | 'fi' | 'sv']) return -1
                if (a.type[i18n.language as 'en' | 'fi' | 'sv'] > b.type[i18n.language as 'en' | 'fi' | 'sv']) return 1
                return a.courtNumber - b.courtNumber
            })
            setAllFacility(sortedFacilities)
        } catch (error) {
            toast.error('Bookings are not available')
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBookings(selectedDate)
    }, [selectedDate])

    const handleDateChange = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setSelectedDate((prevD) => prevD.clone().subtract(1, 'days'))
        } else if (direction === 'next') {
            setSelectedDate((prevD) => prevD.clone().add(1, 'days'))
        }
    }
    const handleDateChangeDatePicker = (date: Date | null) => {
        if (date) {
            setSelectedDate(moment(date))
            setIsCalendarOpen(false)
        } else {
            throw new Error('Date is null')
        }
    }

    const handleBookingClick = (booking: Booking) => {
        setSelectedBooking(booking)
        setIsBookingInfoOpen(true)
    }

    const handleNextColumns = () => {
        if (visibleColumns + 2 < allFacility.length) {
            setVisibleColumns(visibleColumns + 2)
        }
    }

    const handlePreviousColumns = () => {
        if (visibleColumns > 0) {
            setVisibleColumns(visibleColumns - 2)
        }
    }

    const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(({ value, onClick }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            className="flex items-center justify-between w-full bg-white border border-gray-300 rounded py-2 px-3 shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <span>{value || 'Select Date'}</span>
            <SlCalender className="text-gray-500" />
        </button>
    ))
    ///
    const renderBooking = (court: Facility, time: string) => {
        const booking = bookings.find(
            (b) =>
                b.facility.type[i18n.language as 'en' | 'fi' | 'sv'] ===
                    court.type[i18n.language as 'en' | 'fi' | 'sv'] &&
                b.facility.courtNumber === court.courtNumber &&
                moment(time, 'HH:mm').isBetween(moment(b.startTime, 'HHmm'), moment(b.endTime, 'HHmm'), 'minute', '[)')
        )

        if (!booking) return null

        // Calculate the number of 30-minute slots to span
        const slotsToSpan = Math.ceil(
            moment(booking.endTime, 'HHmm').diff(moment(booking.startTime, 'HHmm'), 'minutes') / 30
        )

        // Only render the booking at the starting time slot
        const isStartTimeSlot = moment(time, 'HH:mm').isSame(moment(booking.startTime, 'HHmm'))

        if (!isStartTimeSlot) return <td key={`${court._id}-${time}-hidden`} className="hidden"></td> // Skip rendering for non-starting cells

        return (
            <td
                key={`${court._id}-${time}-${court.courtNumber}`}
                className="border-4 border-sky-300 bg-green-200 align-top"
                rowSpan={slotsToSpan}
                onClick={() => handleBookingClick(booking)}
            >
                <div className="rounded h-full flex flex-col justify-center items-center">
                    <p className="text-xs font-bold">{firstLetterUpperCase(booking.user.name || 'User')}</p>
                    <p className="text-xs font-bold">{booking.paymentAtCounter === false ? 'Online': 'Counter'}</p>
                    <p
                        className={
                            booking.isPaid
                                ? 'bg-green-500 text-white px-2 py-1 rounded text-xs mt-1'
                                : 'bg-red-400 text-white px-2 py-1 rounded text-xs mt-1'
                        }
                    >
                        {booking.isPaid ? 'Paid' : 'Unpaid'}
                    </p>
                </div>
            </td>
        )
    }

    return (
        <>
            <div className="flex items-center justify-center mb-4 mt-4 md:mt-0">
                <button
                    className="bg-gradient-to-tl to-green-400 from-slate-100 p-2 rounded-l hover:to-slate-100 hover:from-green-400"
                    onClick={() => handleDateChange('prev')}
                >
                    &lt;
                </button>
                <ReactDatePicker
                    selected={selectedDate.toDate()}
                    onChange={handleDateChangeDatePicker}
                    dateFormat="dd-MM-yyyy"
                    customInput={<CustomButton />}
                    popperPlacement="bottom-start"
                    open={isCalendarOpen}
                    wrapperClassName="w-full"
                    onClickOutside={() => setIsCalendarOpen(false)}
                    onInputClick={() => setIsCalendarOpen(true)}
                />
                <button
                    className="bg-gradient-to-tl to-green-400 from-slate-100 p-2 rounded-r hover:to-slate-100 hover:from-green-400"
                    onClick={() => handleDateChange('next')}
                >
                    &gt;
                </button>
            </div>
            <div className="flex items-center justify-between mb-4">
                <button
                    className="bg-blue-500 text-white py-1 px-4 rounded disabled:opacity-50"
                    disabled={visibleColumns === 0}
                    onClick={handlePreviousColumns}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 text-white py-1 px-4 rounded disabled:opacity-50"
                    disabled={visibleColumns + 2 >= allFacility.length}
                    onClick={handleNextColumns}
                >
                    Next
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Time</th>
                            {allFacility.slice(visibleColumns, visibleColumns + 2).map((court) => (
                                <th key={court._id} className="border p-2">
                                    {firstLetterUpperCase(court.type[i18n.language as 'en' | 'fi' | 'sv'])}{' '}
                                    {court.courtNumber}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((timeSlot, rowIndex) => (
                            <tr key={`${rowIndex}-${timeSlot}`}>
                                <td className="border p-2 text-center">{timeSlot}</td>
                                {allFacility.slice(visibleColumns, visibleColumns + 2).map((court) => {
                                    const bookingCell = renderBooking(court, timeSlot)
                                    return bookingCell ? (
                                        bookingCell
                                    ) : (
                                        <td key={`${rowIndex}-${court._id}`} className="border p-2"></td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CalendarView
