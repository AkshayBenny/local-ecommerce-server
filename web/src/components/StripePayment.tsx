'use client'

import { convertToSubCurrency } from '@/utils/convertToSubCurrency'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import Spinner from './Spinner'

export default function StripePayment({
	orderId,
	amount,
}: {
	orderId: string | string[]
	amount: number
}) {
	const stripe = useStripe()
	const elements = useElements()
	const [errorMessage, setErrorMessage] = useState<string>()
	const [clientSecret, setClientSecret] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		if (!stripe || !elements) {
			return
		}

		const { error: submitError } = await elements.submit()
		if (submitError) {
			setErrorMessage(submitError.message)
			setLoading(false)
			return
		}

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
			},
		})

		if (error) {
			setErrorMessage(error.message)
		} else {
		}
		setLoading(false)
	}
	useEffect(() => {
		fetch('/api/create-payment-intent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret))
	}, [])

	if (!clientSecret || !stripe || !elements) {
		return (
			<div>
				<Spinner />
			</div>
		)
	}

	return (
		<main className='max-w-screen min-h-screen mb-12'>
			<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				<h1 className='text-[32px] text-[#1A1A1A] font-medium text-center mb-[32px]'>
					Make Payment
				</h1>
				<form
					onSubmit={handleSubmit}
					className='bg-white rounded-md mt-12'>
					{clientSecret && <PaymentElement />}
					{errorMessage && <div>{errorMessage}</div>}
					<button
						className='px-12  bg-customGreen py-[14px] rounded-md text-white mt-4 w-fit'
						disabled={!stripe || loading}>
						{!loading ? `Pay ${amount}` : 'Processing...'}
					</button>
				</form>
			</div>
		</main>
	)
}
