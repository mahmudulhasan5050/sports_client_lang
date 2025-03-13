import { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { axiosStripeCheckout, axiosUserBookingCreate } from '../../axios'
import toast from 'react-hot-toast'
import { CreateBookingObjType } from './BookingClient'
import moment from 'moment-timezone'
import { FaArrowLeft } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const BookingSummary = () => {
    const bookingInfoStr = localStorage.getItem('booking')
    const [bookingInfo, setBookingInfo] = useState<CreateBookingObjType | null>(
        bookingInfoStr ? JSON.parse(bookingInfoStr) : null
    )
    const [payAtCounterLoading, setPayAtCounterLoading] = useState<boolean>(false)
    const [payNowLoading, setPayNowLoading] = useState<boolean>(false)
    const { userCTX } = useUser() // Added setBookingDetailsCTX to update context
    const navigate = useNavigate()
    const {t, i18n} = useTranslation()

    useEffect(() => {
        if (!bookingInfo) {
            navigate('/');
        }
    }, [bookingInfo, navigate]); // Only run after render, not during

    if (!bookingInfo) return null; // Prevent rendering anything while navigating away
    // if (userCTX?.role === 'member' && bookingInfo) {
    //     bookingInfo.isPaid = true
    //     bookingInfo.paymentAmount = 0
    // }

    const confirmBookingAtCounterHandle = async () => {
        if (bookingInfo) {
            bookingInfo.paymentAtCounter = true

            try {
                setPayAtCounterLoading(true)
           
                const res = await axiosUserBookingCreate(i18n.language, bookingInfo.facilityId, bookingInfo)            
                if (res.data) {
          
                    toast.success(t('toastBookingSuccess'))
                    localStorage.clear()
                    setPayAtCounterLoading(false)
                    navigate('/booking-success')
                }
            } catch (error) {
                toast.error('Booking is not possible!')
                console.log(error)
            }
        }
    }

    const stripePaymentHandle = async () => {
        if (bookingInfo && userCTX) {
            setPayNowLoading(true)
            
            try {
                const resStripe = await axiosStripeCheckout(bookingInfo)
                const { url, sessionId } = resStripe.data
                if (url) {
                    localStorage.setItem('stripeSessionId', sessionId)
                    setPayNowLoading(false)
                    window.location.href = url
                }
            } catch (error) {
                toast.error('Payment failed!')
                console.log(error)
            }
        }
    }

    const handleBackButton = () => {
        localStorage.removeItem('booking')
        if (bookingInfo) {
            navigate(`/booking-client/${bookingInfo.facilityName}`)
        } else {
            navigate('/')
        }
        setBookingInfo(null)
    }

    return (
        <div className="w-full bg-white flex justify-center mt-20 lg:items-center py-1 px-4">
            <div className="bg-white w-full md:w-2/3 lg:w-1/2 shadow-lg rounded-lg p-6">
                <div className="flex items-center mb-6">
                    <FaArrowLeft
                        className="text-gray-700 text-2xl hover:text-blue-500 transition duration-300 cursor-pointer"
                        onClick={handleBackButton}
                    />
                    <h1 className="text-3xl font-bold text-gray-600 text-center w-full">
                       {t('bookingSummary')}
                        <span className="block h-1 mt-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded"></span>
                    </h1>
                </div>

                <div className="text-left space-y-4 mb-6">
                    <p className="text-lg">
                        <strong className="text-gray-800">{t('court')}:</strong> {bookingInfo?.facilityName}
                    </p>
                    <p className="text-lg">
                        <strong className="text-gray-800">{t('date')}:</strong>{' '}
                        {bookingInfo && moment(bookingInfo.date).format('DD.MM.YYYY')}
                    </p>
                    <p className="text-lg">
                        <strong className="text-gray-800">{t('time')}:</strong>{' '}
                        {bookingInfo?.time.slice(0, 2) + ':' + bookingInfo?.time.slice(2)}
                    </p>
                    <p className="text-lg">
                        <strong className="text-gray-800">{t('duration')}:</strong> {bookingInfo?.duration} hour(s)
                    </p>
                    <p className="text-lg">
                        <strong className="text-gray-800">{t('totalCost')}:</strong> {bookingInfo?.paymentAmount} euro(s)
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                        className="bg-green-500 w-full sm:w-[48%] hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 flex items-center justify-center gap-2"
                        onClick={stripePaymentHandle}
                        disabled={payNowLoading}
                    >
                        {payNowLoading ? (
                            <div className="w-4 h-4 border-2 border-t-white border-b-white border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                        ) : (
                          t('payNowButton')
                        )}
                    </button>

                    <button
                        className="bg-blue-500 w-full sm:w-[48%] hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 flex items-center justify-center gap-2"
                        onClick={confirmBookingAtCounterHandle}
                        disabled={payAtCounterLoading}
                    >
                        {payAtCounterLoading ? (
                            <div className="w-4 h-4 border-2 border-t-white border-b-white border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                        ) : (
                            t('payAtCounterButton')
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingSummary
