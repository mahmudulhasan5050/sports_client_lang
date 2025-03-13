import { useEffect } from 'react'
import { Facility } from '../../../types/Facility'
import { axiosAvailableDuration } from '../../../axios'
import { AxiosRequestForFetchDataType } from '../../../types/AxiosRequestForFetchData'
import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import classNames from 'classnames'
import moment from 'moment-timezone'
import { useTranslation } from 'react-i18next'

type AvailableFacilityProps = {
    facility: Facility
    date: Date
    facilityName: string
    time: string
    facilityId: string
    setCostPerHour: (costPerHour: number) => void
    setFacilityId: (time: string) => void
    setAvailableGameDurations: (availableCourt: number[]) => void
    setLoadingDuration: (loading: boolean) => void
    setError: (error: string | null) => void
}

const AvailableFacility = ({
    facility,
    facilityName,
    date,
    time,
    facilityId,
    setCostPerHour,
    setFacilityId,
    setAvailableGameDurations,
    setLoadingDuration,
    setError
}: AvailableFacilityProps) => {
    const { t, i18n } = useTranslation()
    const language = i18n.language as 'en' | 'fi' | 'sv'
    useEffect(() => {
        setAvailableGameDurations([])
    }, [time])

    const courtHandle = async (facilityId: string) => {
        if (facilityId !== '') {
            setFacilityId(facilityId)
            try {
                setLoadingDuration(true)
                const facilityNDateObj = {
                    selectedDate: moment(date).format('YYYY-MM-DD'),
                    facilityName: facilityName!,
                    selectedTime: time,
                    selectedFacilityId: facilityId
                } as AxiosRequestForFetchDataType

                const res = await axiosAvailableDuration(facilityNDateObj)
                setAvailableGameDurations(res.data.validDurations)
                setCostPerHour(facility.pricePerHour)
            } catch (error) {
                setError('Failed to fetch duration')
                console.log(error)
            } finally {
                setLoadingDuration(false)
            }
        }
    }

    return (
        <>
            {facility.isActive && (
                <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800">
                            {firstLetterUpperCase(facility.type[language])} {facility.courtNumber}
                        </h3>
                        {/* <p className="text-md text-gray-600">{facility.pricePerHour} euros/h</p> */}
                    </div>
                    <div className="flex justify-center items-center ">
                        <button
                            onClick={() => facility._id && courtHandle(facility._id)}
                            // className="bg-gradient-to-tl from-green-300 to-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                            className={classNames(
                                'bg-gradient-to-tl font-bold py-2 px-4 rounded shadow-md',
                                facilityId !== facility._id
                                    ? 'from-slate-400 to-white text-zinc-700'
                                    : 'from-green-300 to-green-500 text-white'
                            )}
                        >
                            {t('selectCourtButtonT')}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AvailableFacility
