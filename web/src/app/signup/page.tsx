'use client'
import axios from 'axios'
import React from 'react'

export default function SignupPage() {
	const loginHandler = async (e: any) => {
		e.preventDefault()
		try {
			const response = await axios.post(
				'http://localhost:8005/auth/signup',
				{
					email: 'john1@example.com',
					password: 'qwerty',
					fullName: 'John 1',
				},
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			)

			console.log('>>>>>>>>', response.data)
		} catch (error: any) {
			console.log(error.message)
		}
	}

	return (
		<main>
			<form onSubmit={loginHandler}>
				<input
					type='text'
					placeholder='Email'
				/>
				<input
					type='text'
					placeholder='Password'
				/>
				<button type='submit'>Login</button>
			</form>
		</main>
	)
}