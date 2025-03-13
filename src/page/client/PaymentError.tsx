import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const PaymentError = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()
  return (
    <div>
      <p>{t('paymentUnsuccessfulT')}</p>
      <button onClick={()=> navigate('/')}>{t('home')}</button>
    </div>
  )
}

export default PaymentError