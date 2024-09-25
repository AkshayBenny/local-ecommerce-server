'use client'
import { AuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

export default function RegisterPage() {
	const authContext = useContext(AuthContext)
	if (!authContext) return null

	const { register } = authContext

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		role: '',
		city: '',
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await register(formData)
	}

	return (
		<main className='flex items-center justify-center min-h-[85vh] w-full'>
			<form
				onSubmit={registerHandler}
				className='flex flex-col items-center justify-center h-full gap-[20px] border border-customVeryLightBlack lg:p-[24px] rounded-md'>
				<h1 className='font-semibold text-[32px] leading-[120%] opacity-90'>
					Register
				</h1>
				<div className='flex flex-col gap-[12px]'>
					<input
						type='text'
						placeholder='Your Name'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						required
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-full'
					/>
					<input
						type='email'
						placeholder='Your Email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						required
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-full'
					/>
					<input
						type='password'
						placeholder='Your Password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						required
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-full'
					/>
					<select
						name='role'
						value={formData.role}
						onChange={handleInputChange}
						required
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-full'>
						<option
							value=''
							disabled>
							Select Your Role
						</option>
						<option value='USER'>Customer</option>
						<option value='ADMIN'>Shop Owner</option>
					</select>
					<input
						type='text'
						placeholder='Your City'
						name='city'
						value={formData.city}
						onChange={handleInputChange}
						required
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-full'
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-customGreen py-[14px] rounded-full text-white'>
					Register
				</button>
				<p className='text-light'>
					Already have an account?{' '}
					<span className='text-dark font-medium hover:text-customGreen transition hover:underline'>
						<Link href='/login'>Login</Link>
					</span>
				</p>
			</form>
		</main>
	)
}
