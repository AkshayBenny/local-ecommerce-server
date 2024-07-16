'use client'
import { AuthContext } from '@/context/AuthContext'
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await register(formData)
	}

	return (
		<main>
			<form
				onSubmit={loginHandler}
				className='flex flex-col items-center justify-center gap-3'>
				<input
					type='text'
					placeholder='Name'
					name='name'
					value={formData.name}
					onChange={handleInputChange}
					required
				/>
				<input
					type='email'
					placeholder='Email'
					name='email'
					value={formData.email}
					onChange={handleInputChange}
					required
				/>
				<input
					type='password'
					placeholder='Password'
					name='password'
					value={formData.password}
					onChange={handleInputChange}
					required
				/>
				<input
					type='role'
					placeholder='Role'
					name='role'
					value={formData.role}
					onChange={handleInputChange}
					required
				/>
				<input
					type='text'
					placeholder='city'
					name='city'
					value={formData.city}
					onChange={handleInputChange}
					required
				/>
				<button type='submit'>Register</button>
			</form>
		</main>
	)
}
