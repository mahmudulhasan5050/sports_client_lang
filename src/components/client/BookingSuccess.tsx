import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const BookingSuccess = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    return (
        <div className="w-screen flex justify-center">
            <div className="bg-white flex flex-col w-full px-4 md:w-1/2 text-center mt-48">
                <h2 className="text-2xl font-bold mb-4">{t('bookingSuccessTitle')}</h2>
                <p>
                    <strong>{t('bookingSuccessInfo')}</strong>
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-blue-500 text-white font-bold py-2 p-4 rounded hover:bg-blue-700"
                >
                    {t('bookingSuccessHomeButton')}
                </button>
            </div>
        </div>
    )
}

export default BookingSuccess
