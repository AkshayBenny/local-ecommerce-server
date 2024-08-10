'use client'

import OrderCard from '@/components/OrderCard'
import axiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AdminHomePage() {
	// State hook to manage the orders
	const [orders, setOrders] = useState([])

	// Fetch all orders
	useEffect(() => {
		const fetchAllUserOrders = async () => {
			try {
				// Send a GET request to the backend to get all orders
				const response = await axiosInstance.get('/admin/order/all')
				// Update the order state
				setOrders(response?.data)
			} catch (error: any) {
				// If error is encountered, log it to the console
				console.log(error.message)
			}
		}
		fetchAllUserOrders()
	}, [])

	return (
		<main className='max-w-screen min-h-screen mb-12'>
			<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				<h1 className='text-[32px] text-[#1A1A1A] font-medium text-center mb-[32px]'>
					Admin Dashboard
				</h1>
				<div className='flex flex-col items-center justify-center md:grid grid-cols-2 gap-6 h-full w-full'>
					<Link
						href='admin/create'
						className='w-full'>
						<div className='bg-customGreen h-[100px] flex items-center justify-center rounded-md hover:bg-green-500 transition w-full'>
							<p className='text-white text-xl'>Create</p>
						</div>
					</Link>
					<Link
						href='admin/products'
						className='w-full'>
						<div className='bg-customGreen h-[100px] flex items-center justify-center rounded-md hover:bg-green-500 transition w-full'>
							<p className='text-white text-xl'>Edit products</p>
						</div>
					</Link>
				</div>

				<div className='mt-12'>
					<h4 className='text-[24px] font-medium'>Manage Orders</h4>
					{orders.length > 0 ? (
						<table className='w-full table-auto'>
							<thead className='uppercase'>
								<tr>
									<th className='text-start py-2 font-medium text-[#808080] text-[14px]'>
										Order Id
									</th>
									<th className='text-start py-2 font-medium text-[#808080] text-[14px]'>
										Date
									</th>
									<th className='text-start py-2 font-medium text-[#808080] text-[14px]'>
										Total
									</th>
									<th className='text-start py-2 font-medium text-[#808080] text-[14px]'>
										Status
									</th>
									<th className='text-start py-2 font-medium text-[#808080] text-[14px]'>
										Update
									</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order: any) => (
									<OrderCard
										key={order.id}
										id={order.id}
										orderDate={order.orderDate}
										status={order.status}
										orderItems={order.orderItems}
										totalAmount={order.totalAmount}
										isPaid={order.isPaid}
									/>
								))}
							</tbody>
						</table>
					) : (
						<p className='text-[16px] font-medium text-center'>
							No orders yet...
						</p>
					)}
				</div>
			</div>
		</main>
	)
}
