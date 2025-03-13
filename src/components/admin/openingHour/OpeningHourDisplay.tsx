import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { firstLetterUpperCase } from '../../../utils/upperLowerConvert'
import { OpeningHour } from '../../../types/OpeningHour'
import { axiosFetchOpeningHour, axiosDeleteOpeningHour } from '../../../axios'
import moment from 'moment-timezone';

type setRefreshType = {
    refresh: boolean
    setOpeningHourtId: (value: string) => void
    setRefresh: (value: boolean) => void
}

const OpeningHourDisplay = ({ refresh, setOpeningHourtId, setRefresh }: setRefreshType) => {
    const [openingHour, setOpeningHour] = useState<OpeningHour[]>([])

    // Fetch Facility when component mounts
    useEffect(() => {
        const fetchOpeningHour = async () => {
            try {
                const response = await axiosFetchOpeningHour()
                setOpeningHour(response.data)
            } catch (error) {
                toast.error('Something went wrong!')
                console.log(error)
            }
        }

        fetchOpeningHour()
    }, [refresh])

    // Handle delete facility
    const handleDelete = async (id: string) => {
        try {
            await axiosDeleteOpeningHour(id)
            // Update the UI after deletion
            setOpeningHour(openingHour.filter((unit) => unit._id !== id))
            toast.success('Facility has been deleted!')
        } catch (error) {
            toast.error('Facility can not be deleted.')
            console.log(error)
        }
    }

    return (
        <div className="bg-white p-2 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-bold text-center">Opening Hours</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                {openingHour.length === 0 ? (
                    <p className="text-center text-gray-600">No Facility Available</p>
                ) : (
                    <table className="w-full text-gray-700">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Day</th>
                                <th className="py-2 px-4 border-b">Time</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openingHour.map((unit) => (
                                <tr key={unit._id}>
                                    <td className="py-2 px-4 border-b">{firstLetterUpperCase(unit.day)}</td>
                                    <td className="py-2 px-4 border-b">{moment(unit.open, 'HHmm').format('HH:mm')} {moment(unit.close, 'HHmm').format('HH:mm')}</td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    if(unit._id) setOpeningHourtId(unit._id)
                                                    setRefresh(true)
                                                }}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                <FaEdit/>
                                            </button>
                                            <button
                                                onClick={() => unit._id && handleDelete(unit._id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                <MdDelete/>
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

export default OpeningHourDisplay
