import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { Facility } from '../../../types/Facility'
import { axiosCreateFacility, axiosFetchFacilityById, axiosUpdateFacility } from '../../../axios'

type SetRefreshType = {
    facilityId: string
    setFacilityId: (value: string) => void
    setRefresh: (value: boolean) => void
}

const FacilityForm = ({ facilityId, setFacilityId, setRefresh }: SetRefreshType) => {
    const [formData, setFormData] = useState<Facility>({
        type: { en: '', fi: '', sv: '' },
        courtNumber: 0,
        pricePerHour: 0,
        isActive: true
    })
    const [loading, setLoading] = useState(true)

    //edit
    useEffect(() => {
        // If editing, fetch the existing facility data
        const fetchFacility = async () => {
            if (facilityId !== '') {
                try {
                    const response = await axiosFetchFacilityById(facilityId)
                    setFormData(response.data)
                } catch (error) {
                    toast.error('Something went wrong!')
                    console.log(error)
                }
            }
            setLoading(false)
        }
        fetchFacility()
    }, [facilityId])

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value, type } = e.target

    //     if (type === 'checkbox') {
    //         const { checked } = e.target as HTMLInputElement
    //         setFormData({ ...formData, [name]: checked })
    //     } else {
    //         setFormData({ ...formData, [name]: value })
    //     }
    // }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('type.')) {
            const key = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                type: { ...prev.type, [key]: value }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (facilityId !== '') {
                // Update existing facility
                await axiosUpdateFacility(facilityId, formData)
                toast.success('Facility has been updated successfully!')
            } else {
                //create facility
                await axiosCreateFacility(formData)
                toast.success('Facility has been created successfully!')
            }

            setRefresh(false)
            setFacilityId('')
        } catch (err) {
            toast.error('Failed to create Facility. Please try again.')
            console.log(err)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-bold text-center">Create Facility</strong>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full">
                {/* Facility Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type-en">
                        Facility Name in English
                    </label>
                    <input
                        id="type-en"
                        name="type.en"
                        type="text"
                        value={formData.type.en}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type-fi">
                        Facility Name in Finnish
                    </label>
                    <input
                        id="type-fi"
                        name="type.fi"
                        type="text"
                        value={formData.type.fi}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type-sv">
                        Facility Name in Swedish
                    </label>
                    <input
                        id="type-sv"
                        name="type.sv"
                        type="text"
                        value={formData.type.sv}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* Court Number */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Court Number
                    </label>
                    <input
                        id="courtNumber"
                        name="courtNumber"
                        type="number"
                        value={formData.courtNumber}
                        onChange={handleChange}
                        placeholder="Enter price per hour"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Price/h
                    </label>
                    <input
                        id="pricePerHour"
                        name="pricePerHour"
                        type="number"
                        value={formData.pricePerHour}
                        onChange={handleChange}
                        placeholder="Enter price per hour"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                {/* isActive */}
                <div className="mb-4 flex items-center">
                    <input
                        id="isActive"
                        name="isActive"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-gray-700 text-sm font-bold">
                        In Use
                    </label>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={() => {
                            setRefresh(false)
                            setFormData({
                                type: { en: '', fi: '', sv: '' },
                                courtNumber: 0,
                                pricePerHour: 0,
                                isActive: true
                            })
                        }}
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FacilityForm
