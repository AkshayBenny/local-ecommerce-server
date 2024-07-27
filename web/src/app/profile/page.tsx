'use client'

import PrivateRoute from '@/components/PrivateRoute'
import { userState } from '@/state/authState'
import axiosInstance from '@/utils/axiosInstance'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function UserProfilePage() {
	const user = useRecoilValue(userState)

	const [formData, setFormData] = useState({
		city: '',
		street: '',
		buildingName: '',
		postcode: '',
		country: '',
	})

	const [orders, setOrders] = useState<any>([])

	const isoToReadable = (isoDate: string) => {
		const date = new Date(isoDate)
		return date.toLocaleString('en-GB', { hour12: false }).toString()
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const updateProfileHandler = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault()
		try {
			await axiosInstance.post('/adminuser/set-profile', formData)
		} catch (error: any) {
			console.log(error?.message)
		}
	}

	const getUserProfileHandler = async () => {
		try {
			const response = await axiosInstance.get(
				'/adminuser/get-user-profile'
			)
			const data = response.data
			setFormData({
				city: data?.city,
				street: data?.street,
				buildingName: data?.buildingName,
				postcode: data?.postcode,
				country: data?.country,
			})
			setOrders(data?.orders)
		} catch (error: any) {
			console.log(error?.message)
		}
	}

	useEffect(() => {
		getUserProfileHandler()
	}, [])

	return (
		// <PrivateRoute>
		<main className='flex flex-col items-center justify-center gap-2'>
			<p>Profile page</p>
			<p className='text-black'>{user?.email}</p>
			<p>{user?.name}</p>

			<form
				onSubmit={updateProfileHandler}
				className='border flex flex-col gap-3'>
				<input
					type='text'
					placeholder='City'
					name='city'
					value={formData.city}
					onChange={handleInputChange}
					required
				/>
				<input
					type='text'
					placeholder='Street'
					name='street'
					value={formData.street}
					onChange={handleInputChange}
					required
				/>
				<input
					type='text'
					placeholder='Building Name'
					name='buildingName'
					value={formData.buildingName}
					onChange={handleInputChange}
					required
				/>
				<input
					type='text'
					placeholder='Postcode'
					name='postcode'
					value={formData.postcode}
					onChange={handleInputChange}
					required
				/>
				<input
					type='text'
					placeholder='Country'
					name='country'
					value={formData.country}
					onChange={handleInputChange}
					required
				/>
				<button type='submit'>Update</button>
			</form>
			<div className='pt-12'>
				<p className='font-bold text-xl'>Orders</p>
				{orders?.length > 0 ? (
					<div className='w-full flex flex-col gap-4'>
						{orders?.map((order: any) => {
							return (
								<div className='w-full border'>
									<div className='flex flex-col justify-between'>
										<p>
											Ordered on:{' '}
											{isoToReadable(order?.orderDate)}
										</p>
										<p>Order status: {order?.status}</p>
									</div>
									<div></div>
								</div>
							)
						})}
					</div>
				) : (
					<p className='italic'>No orders yet</p>
				)}
			</div>
		</main>
		// </PrivateRoute>
	)
}
