import { useState, useEffect } from 'react'
import { useUser } from '../../../context/UserContext'
import Modal from './Modal'
import { axiosCancelBookingByUser, axiosFetchBookingsByUser } from '../../../axios'
import { Facility } from '../../../types/Facility'
import toast from 'react-hot-toast'
import { calculateTimeDifference } from '../../../utils/timeDifference'
import { userConfirmed } from '../../../utils/cancelToastMessage'
import moment from 'moment-timezone'
import { Booking } from '../../../types/Booking'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

interface OwnBooking {
    _id: string
    date: string
    startTime: string
    facility: Facility
    duration: number
}
interface PropsType {
    isOpen: boolean
    onClose: () => void
}

const OwnScheduleModal = ({ isOpen, onClose }: PropsType) => {
    const [bookings, setBookings] = useState<OwnBooking[]>([])
    const { userCTX } = useUser()
    const {t} = useTranslation()

    useEffect(() => {
        const fetchUserBookingData = async () => {
            if (isOpen) {
                try {
                    const res = userCTX && (await axiosFetchBookingsByUser())
                    const sortedBookings = res && res.data.sort((a: Booking, b: Booking) =>
                        moment(b.date).diff(moment(a.date))
                    )
                    setBookings(sortedBookings)
                } catch (error) {
                    toast.error('Something went wrong.')
                    console.log(error)
                }
            }
        }

        fetchUserBookingData()
    }, [isOpen, userCTX])

    const handleCancel = async (bookingId: string) => {
        //This is toast message to confirm cancellation
        const aaa = await userConfirmed()

        if (aaa) {
            try {
                await axiosCancelBookingByUser(bookingId)

                setBookings(bookings.filter((booking) => booking._id !== bookingId))
                toast.success(t('toastBookingCancelled'), { duration: 3000 })
            } catch (error) {
                toast.error(t('toastCanNotCancel'), { duration: 3000 })
            console.log(error)
            }
        } else {
            return
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">{t('ownScheduleModalTitle')}</h2>
            <div className="max-h-96 overflow-y-auto ml-0">
                {bookings.length > 0 ? (
                    <ul className="space-y-4 ml-0">
                        {bookings.map((booking, index) => (
                            <li key={index} className="p-2 border rounded shadow-sm ml-0">
                                <p>
                                    <strong>{t('court')}:</strong> {booking.facility.type} {booking.facility.courtNumber}
                                </p>
                                <p>
                                    <strong>{t('date')}:</strong> {moment(booking.date).format('DD.MM.YYYY')}
                                </p>
                                <p>
                                    <strong>{t('time')}:</strong>{' '}
                                    {booking.startTime.slice(0, 2) + ':' + booking.startTime.slice(2)}
                                </p>
                                <p>
                                    <strong>{t('duration')}:</strong> {booking.duration} hour(s)
                                </p>
                                <button
                                    onClick={() => handleCancel(booking._id)}
                                     disabled={calculateTimeDifference(booking.date, booking.startTime)}
                                    className={classNames('mt-4 w-full text-white py-2 rounded-lg', calculateTimeDifference(booking.date, booking.startTime) ? 'bg-gray-500': 'bg-red-500 hover:bg-red-700')}
                                >
                                    {t('ownScheduleModalCancelButton')}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </Modal>
    )
}

export default OwnScheduleModal
