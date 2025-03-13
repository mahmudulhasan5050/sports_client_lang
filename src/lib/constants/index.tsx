//import { IconType } from 'react-icons'
import {
	HiOutlineViewGrid,
	HiOutlineClock,
	HiOutlineQuestionMarkCircle
} from 'react-icons/hi'
import { FaUser } from "react-icons/fa";
import { GiTennisCourt } from "react-icons/gi";
import { MdOutlineBookmark } from "react-icons/md";
import { TbCreditCardRefund } from "react-icons/tb";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'facility',
		label: 'Facility',
		path: '/admin/facility',
		icon: <GiTennisCourt />
	},
	{
		key: 'openinghour',
		label: 'Opening Hours',
		path: '/admin/openinghour',
		icon: <HiOutlineClock />
	},
	{
		key: 'users',
		label: 'Users',
		path: '/admin/user',
		icon: <FaUser />
	},
	{
		key: 'bookingCalender',
		label: 'Bookings Calendar',
		path: '/admin/booking-calendar',
		icon: <MdOutlineBookmark />
	},
	{
		key: 'bookingTable',
		label: 'Booking Table',
		path: '/admin/booking-table',
		icon: <MdOutlineBookmark />
	},
	{
		key: 'refund',
		label: 'Refund',
		path: '/admin/refund',
		icon: <TbCreditCardRefund />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	// {
	// 	key: 'settings',
	// 	label: 'Settings',
	// 	path: '/settings',
	// 	icon: <HiOutlineCog />
	// },
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]