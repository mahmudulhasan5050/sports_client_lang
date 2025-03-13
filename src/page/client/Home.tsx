import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { firstLetterUpperCase } from '../../utils/upperLowerConvert'
import { axiosFetchFacilityUnits } from '../../axios/index'
import { useUser } from '../../context/UserContext'
import heroPic from '../../assets/hero1.svg'
import { useTranslation } from 'react-i18next'
import { FacilityUnit } from '../../types/FacilityUnit'



const Home = () => {
    const navigate = useNavigate()
    const { userCTX } = useUser()
    // const [dropdownOpen, setDropdownOpen] = useState(false)
    const [facilityUnit, setFacilityUnit] = useState<FacilityUnit[]>([])
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userCTX?.role === 'admin') {
            navigate('/admin')
        }
        const fetchFacilityUnits = async () => {
            try {
                const response = await axiosFetchFacilityUnits()
                setFacilityUnit(response.data)
            } catch (error) {
                console.error('Error fetching facility units:', error)
            }
        }

        fetchFacilityUnits()
    }, [navigate,userCTX])

    return (
        // first
        <div className=" bg-white flex flex-col md:flex-row md:m-0 overflow-hidden">
            <div className="md:w-1/2 w-full">
                <img src={heroPic} alt="Hero" className="w-full h-full object-cover object-top" />
            </div>

            <div className="md:w-1/2 w-full">
                <div className="flex flex-col justify-center items-center p-8 md:p-0">
                    {/* Text Section */}
                    <div className="text-center flex flex-col mt-7 md:mt-32">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-4">{t('welcome')}</h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">{t('welcomeText')}</p>
                    </div>
                    {/* Facility Unit Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {facilityUnit.length > 0 &&
                            facilityUnit.map((unit, index) => (
                                <button
                                    key={index}
                                    onClick={() => navigate(`/booking-client/${unit.en}`)}
                                    className="bg-gradient-to-tl from-green-500 to-green-700 text-white py-2 px-6 rounded-full shadow-md hover:bg-green-600 focus:outline-none transition duration-300"
                                >
                                     {firstLetterUpperCase(unit[i18n.language as 'en'|'fi'|'sv'])}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
