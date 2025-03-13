import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/User'

import { axiosSignUp } from '../axios/index'
import { useTranslation } from 'react-i18next'

const SignUp = () => {
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const {t} = useTranslation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axiosSignUp(formData)

            setFormData({
                name: '',
                email: '',
                password: ''
            })
          
            navigate('/check-your-email')
        } catch (error) {
            setError('Register Failed!')
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-4 mt-24 md:mt-20 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold">{t('registerButton')}</h2>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">{t('name')}</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">{t('signinEmail')}</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">{t('signinPassword')}</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        {t('registerButton')}
                    </button>
                    <p className="text-center">
                        {t('haveAccountT')}{' '}
                        <a href="/signin" className="text-sm text-blue-500 hover:underline">
                        {t('signinButton')}
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
