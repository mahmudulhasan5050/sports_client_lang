import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { Facility } from '../../../types/Facility'
import { axiosFetchFacility } from '../../../axios'
import { FaEdit } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

type SetRefreshType = {
    refresh: boolean
    setFacilityId: (value: string) => void
    setRefresh: (value: boolean) => void
}

const FacilityUnitDisplay = ({ refresh, setFacilityId, setRefresh }: SetRefreshType) => {
    const [facilities, setFacilities] = useState<Facility[]>([])
   const { i18n } = useTranslation()
    useEffect(() => {
        const fetchFacility = async () => {
            try {
                const response = await axiosFetchFacility()
                setFacilityId('')
                setFacilities(response.data)
            } catch (error) {
                toast.error('Something went wrong!')
                console.log(error)
            }
        }
        fetchFacility()
    }, [refresh])

    return (
        <div className="bg-white p-2 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-bold text-center">Facility Details</strong>

            <div className="border-x border-gray-200 rounded-sm mt-3">
                {facilities.length === 0 ? (
                    <p className="text-center text-gray-600">No Facility Available</p>
                ) : (
                    <table className="w-full text-gray-700">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Courts</th>
                                <th className="py-2 px-4 border-b">Price</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facilities.map((unit) => (
                                <tr key={unit._id}>
                                    <td className="py-2 px-4 border-b">{firstLetterUpperCase(unit.type[i18n.language as 'en'|'fi'|'sv'])} {unit.courtNumber}</td>
                                    <td className="py-2 px-4 border-b">{unit.pricePerHour}</td>
                                    <td className="py-2 px-4 border-b">{unit.isActive ? 'Active': 'Inactive'}</td>
                                    
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    if(unit._id) setFacilityId(unit._id)
                                                    setRefresh(true)
                                                }}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                  <FaEdit/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default FacilityUnitDisplay
