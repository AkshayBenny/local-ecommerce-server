'use client'

import { useState } from 'react'
import SaveLineIcon from 'remixicon-react/SaveLineIcon'
import Spinner from './Spinner'
import axiosInstance from '@/utils/axiosInstance'

export default function OrderCard({
	id,
	orderDate,
	status,
	orderItems,
	totalAmount,
	isPaid,
}: {
	id: number
	orderDate: string
	status: string
	orderItems: any
	totalAmount: number
	isPaid: boolean
}) {
	const [loading, setLoading] = useState(false)
	const [newStatus, setNewStatus] = useState(status)
	const updateOrderStatus = async (id: number) => {
		setLoading(true)
		try {
			await axiosInstance.post(`admin/order/status/${id}/${newStatus}`)
			setLoading(false)
		} catch (error: any) {
			setLoading(false)
			console.log(error.message)
		}
		setLoading(false)
	}
	return (
		<tr
			key={id}
			className='text-[16px] text-[#1A1A1A] font-regular'>
			<td className='border-t  py-2 text-start'>#{id}</td>
			<td className='border-t  py-2 text-start'>{orderDate}</td>
			<td className='border-t  py-2 text-start'>£ {totalAmount}</td>
			<td className='border-t  py-2 text-start'>{status}</td>
			<td className='border-t  py-2 flex items-center justify-start gap-3 text-start'>
				<select
					value={newStatus}
					onChange={(e) => setNewStatus(e.target.value.toUpperCase())}
					defaultValue={newStatus}>
					<option value='PENDING'>Pending</option>
					<option value='SHIPPED'>Shipped</option>
					<option value='DELIVERED'>Delivered</option>
				</select>
				<button
					onClick={() => updateOrderStatus(id)}
					className='bg-customGreen text-white p-2 rounded-md'>
					{loading ? (
						<Spinner />
					) : (
						<SaveLineIcon className='w-[24px] h-[24px]' />
					)}
				</button>
			</td>
		</tr>
	)
}
