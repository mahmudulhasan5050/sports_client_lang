import { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { axiosEmailConfirm } from '../../axios';
import { useTranslation } from 'react-i18next';

const ConfirmEmail = () => {
const {token} = useParams<{token: string}>()
const [confirmationMessage, setConfirmationMessage] = useState('Verifying...');
const navigate = useNavigate();
const {t} = useTranslation()

useEffect(() => {
    const confirmEmail = async () => {
      try {
        if(token){
            const response = await axiosEmailConfirm(token)
            setConfirmationMessage(response.data.message);
        }
      } catch (error) {
        setConfirmationMessage('Error confirming email. Please try again.');
        console.log(error)
      }
    };

    confirmEmail();
  }, [token]);

  const handleLoginRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-[90%] text-center mt-48'>
    <h1 className='text-2xl font-bold'>{confirmationMessage}</h1>
    {confirmationMessage.includes('Email confirmed') && (
      <button
        onClick={handleLoginRedirect}
        className='mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600'
      >
        {t('signinButton')}
      </button>
    )}
    </div>
  </div>
  )
}

export default ConfirmEmail