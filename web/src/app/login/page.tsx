'use client'
import { AuthContext } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

export default function LoginPage() {
	const authContext = useContext(AuthContext)
	if (!authContext) return null

	const { login } = authContext

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await login(formData)
	}

	return (
		<main className='flex items-center justify-center min-h-[85vh] w-full'>
			<form
				onSubmit={loginHandler}
				className='flex flex-col items-center justify-center h-full gap-[20px] border border-customVeryLightBlack lg:p-[24px] rounded-md'>
				<h1 className='font-semibold text-[32px] leading-[120%] opacity-90'>
					Login
				</h1>
				<div className='flex flex-col gap-[12px]'>
					<input
						type='text'
						placeholder='Email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						required
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-full'
					/>
					<input
						type='text'
						placeholder='Password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						required
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-full'
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-customGreen py-[14px] rounded-full text-white'>
					Login
				</button>
				<p className='text-light'>
					Don't have an account?{' '}
					<span className='text-dark font-medium hover:text-customGreen transition hover:underline'>
						<Link href='/register'>Register</Link>
					</span>
				</p>
			</form>
		</main>
	)
}
