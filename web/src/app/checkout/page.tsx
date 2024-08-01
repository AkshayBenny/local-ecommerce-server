'use client'

import { userState } from '@/state/authState'
import { cartState } from '@/state/cartState'
import axiosInstance from '@/utils/axiosInstance'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function CheckoutPage() {
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

	useEffect(() => {
		getUserProfileHandler()
	}, [])
	return (
		<main className='max-w-screen min-h-screen mb-12'>
			<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				<h1 className='text-[32px] text-[#1A1A1A] font-medium text-start mb-[32px]'>
					Billing Information
				</h1>
				<form className='space-y-[16px]'>
					<div className='flex items-center justify-center gap-[16px]'>
						<div className='space-y-[8px] w-full'>
							<p className='text-[14px] font-regular'>
								Full Name
							</p>
							<input
								type='text'
								placeholder='Your Full Name'
								name='name'
								// value={}
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
					<div className='space-y-[8px] w-full'>
						<p className='text-[14px] font-regular'>
							Street Address
						</p>
						<input
							type='text'
							placeholder='Your Street Address'
							name='street'
							value={formData.city}
							onChange={handleInputChange}
							required
							className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-lg w-full'
						/>
					</div>
					<div className='flex items-center justify-center gap-[16px]'>
						<div className='space-y-[8px] w-full'>
							<p className='text-[14px] font-regular'>
								Building Name
							</p>
							<input
								type='text'
								placeholder='Your Building Name'
								name='name'
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
					{cart.length > 0 &&
						cart.map((item: any) => (
							<div key={item.id}>
								{item?.product?.image && (
									<div className='relative w-[100px] h-[100px]'>
										<Image
											src={item?.product?.image}
											layout='fill'
											objectFit='cover'
											className='w-[100px] h-[100px] aspect-square'
											alt={item?.product?.name}
										/>
									</div>
								)}
							</div>
						))}
				</form>
			</div>
		</main>
	)
}
