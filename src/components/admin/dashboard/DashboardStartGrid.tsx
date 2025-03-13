import {ReactNode} from 'react'
import { IoPeople, IoCart } from 'react-icons/io5'
import { HiOutlineChartBar } from "react-icons/hi";
import { AllInfoType } from '../../../page/admin/Dashboard';

const BoxWrapper = ({ children }:{ children: ReactNode }) =>{
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

const DashboardStartGrid = ({allInfo}: {allInfo: AllInfoType | undefined}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
        <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<HiOutlineChartBar className="text-2xl text-white" />
				</div>
                <div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Bookings</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{allInfo?.lastMonthCount}</strong>
						<span className="text-sm text-green-500 pl-2">Previous Month</span>
					</div>
				</div>
        </BoxWrapper>
        <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Bookings</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{allInfo?.currentMonthCount}</strong>
						<span className="text-sm text-red-500 pl-2">This Month</span>
					</div>
				</div>
        </BoxWrapper>
        <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Customers</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{allInfo?.totalUser}</strong>
						<span className="text-sm text-red-500 pl-2">users</span>
					</div>
				</div>
        </BoxWrapper>
        <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Cancel</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{allInfo?.totalCancelledThisMonth}</strong>
						<span className="text-sm text-red-500 pl-2">{allInfo?.totalNotRefunded}</span>
					</div>
				</div>
        </BoxWrapper>
        
    </div>
  )
}

export default DashboardStartGrid