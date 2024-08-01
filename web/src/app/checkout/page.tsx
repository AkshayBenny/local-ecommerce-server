'use client'

import { userState } from '@/state/authState'
import { cartState } from '@/state/cartState'
import axiosInstance from '@/utils/axiosInstance'
import { fetchCart } from '@/utils/fetchCart'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function CheckoutPage() {
	const router = useRouter()
	const user = useRecoilValue(userState)
	const [cart, setCart] = useRecoilState(cartState)
	const [formData, setFormData] = useState({
		city: '',
		street: '',
		buildingName: '',
		postcode: '',
		country: '',
	})
	console.log(user)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const checkoutHandler = async () => {
		try {
			await axiosInstance.post('adminuser/order/create')
		} catch (error: any) {
			console.log(error.message)
		}
	}
	const updateProfileHandler = async () => {
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
			// setOrders(data?.orders)
		} catch (error: any) {
			console.log(error?.message)
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await updateProfileHandler()
			await checkoutHandler()
			router.push('/payment')
		} catch (error: any) {
			console.log(error?.message)
		}
	}

	useEffect(() => {
		getUserProfileHandler()
		fetchCart(setCart)
	}, [])

	const totalAmount = cart.reduce(
		(acc, item: any) => acc + item?.product?.price * item?.quantity,
		0
	)

	return (
		<main className='max-w-screen min-h-screen mb-12'>
			<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				<h1 className='text-[32px] text-[#1A1A1A] font-medium text-start mb-[32px]'>
					Billing Information
				</h1>
				<form
					onSubmit={handleSubmit}
					className=''>
					<div className='flex items-center justify-center gap-[16px]  mb-[32px]'>
						<div className='space-y-[8px] w-full'>
							<p className='text-[14px] font-regular'>
								Full Name
							</p>
							<input
								type='text'
								placeholder='Your Full Name'
								name='name'
								value={user?.name}
								// onChange={handleInputChange}
								required
								className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full'
							/>
						</div>
						<div className='space-y-[8px] w-full'>
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
					</div>
					<div className='w-full  mb-[32px]'>
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
					<div className='flex items-center justify-center gap-[16px]  mb-[32px]'>
						<div className='space-y-[8px] w-full'>
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
						<div className='space-y-[8px] w-full'>
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
						<div className='space-y-[8px] w-full'>
							<p className='text-[14px] font-regular'>
								Country / Region
							</p>
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
					<div className='w-full h-[1px] bg-customVeryLightBlack'></div>
					<div>
						<h1 className='text-[32px] text-[#1A1A1A] font-medium text-start mb-[20px] mt-[32px]'>
							Order Summary
						</h1>
						<div className='flex flex-col gap-[24px]'>
							{cart.length > 0 &&
								cart.map((item: any) => (
									<>
										<div
											key={item.id}
											className='flex items-center justify-between'>
											<div className='flex items-center justify-start gap-6'>
												{item?.product?.image && (
													<div
														key={item?.product?.id}
														className='flex items-center justify-between'>
														<div className='relative w-[100px] h-[100px]'>
															<Image
																src={
																	item
																		?.product
																		?.image
																}
																layout='fill'
																objectFit='cover'
																className='w-[100px] h-[100px] aspect-square rounded-lg'
																alt={
																	item
																		?.product
																		?.name
																}
															/>
														</div>
													</div>
												)}

												<p className='text-[14px] font-regular'>
													{item?.product?.name} x{' '}
													{item?.quantity}
												</p>
											</div>
											<p className='text-[24px] font-regular'>
												£{' '}
												{(
													item?.product?.price *
													item?.quantity
												)
													.toFixed(2)
													.toString()}
											</p>
										</div>
										<div className='w-full h-[1px] bg-customVeryLightBlack'></div>
									</>
								))}
							<div className='flex items-center justify-between gap-6'>
								<p className='text-[24px] font-regular'>
									Total:
								</p>
								<p className='text-[24px] font-medium'>
									£{totalAmount.toFixed(2).toString()}
								</p>
							</div>
						</div>
					</div>
					<div className='flex justify-end mt-12'>
						<button className='w-full bg-customGreen py-[14px] rounded-full text-white px-12'>
							Place Order
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}
