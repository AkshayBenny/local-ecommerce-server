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
		<main className='max-w-screen min-h-screen mb-12'>
			<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				<h1 className='text-[32px] text-[#1A1A1A] font-medium text-start mb-[32px]'>
					Your Profile
				</h1>

				<div className='flex items-center gap-5 w-full mb-[16px]'>
					<div className='w-full'>
						<p className='text-[14px] font-regular'>Full Name</p>
						<input
							type='text'
							placeholder='Your City'
							name='city'
							value={user?.name}
							disabled
							className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full cursor-not-allowed'
						/>
					</div>
					<div className='w-full'>
						<p className='text-[14px] font-regular'>
							Email Address
						</p>

						<input
							type='text'
							placeholder='Your Building Name'
							name='buildingName'
							value={user?.email}
							disabled
							className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full cursor-not-allowed'
						/>
					</div>
				</div>

				<form
					onSubmit={updateProfileHandler}
					className='flex flex-col gap-4 w-full'>
					<div className='flex items-center gap-5 w-full'>
						<div className='w-full'>
							<p className='text-[14px] font-regular'>City</p>
							<input
								type='text'
								placeholder='Your City'
								name='city'
								value={formData.city}
								onChange={handleInputChange}
								required
								className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full'
							/>
						</div>
						<div className='w-full'>
							<p className='text-[14px] font-regular'>
								Building Name
							</p>

							<input
								type='text'
								placeholder='Your Building Name'
								name='buildingName'
								value={formData.buildingName}
								onChange={handleInputChange}
								required
								className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full'
							/>
						</div>
					</div>
					<div className='w-full'>
						<p className='text-[14px] font-regular'>
							Street Address
						</p>

						<input
							type='text'
							placeholder='Your Street Address'
							name='street'
							value={formData.street}
							onChange={handleInputChange}
							required
							className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full'
						/>
					</div>

					<div className='flex items-center gap-5 w-full'>
						<div className='w-full'>
							<p className='text-[14px] font-regular'>Postcode</p>

							<input
								type='text'
								placeholder='Your Postcode'
								name='postcode'
								value={formData.postcode}
								onChange={handleInputChange}
								required
								className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full'
							/>
						</div>
						<div className='w-full'>
							<p className='text-[14px] font-regular'>Country</p>

							<input
								type='text'
								placeholder='Your Country'
								name='country'
								value={formData.country}
								onChange={handleInputChange}
								required
								className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full'
							/>
						</div>
					</div>
					<div className='flex justify-end mt-12'>
						<button
							className='w-fit bg-customGreen py-[14px] rounded-lg text-white px-12'
							type='submit'>
							Update
						</button>
					</div>
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
												{isoToReadable(
													order?.orderDate
												)}
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
			</div>
		</main>
		// </PrivateRoute>
	)
}
