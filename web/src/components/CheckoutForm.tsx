'use client'
import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axiosInstance from '@/utils/axiosInstance'

interface CheckoutFormProps {
	orderId: string | string[]
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ orderId }) => {
	const stripe = useStripe()
	const elements = useElements()
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)

		if (!stripe || !elements) {
			return
		}

		const cardElement = elements.getElement(CardElement)
		if (!cardElement) {
			setError('Card Element not found')
			setLoading(false)
			return
		}

		const { error: paymentMethodError, paymentMethod } =
			await stripe.createPaymentMethod({
				type: 'card',
				card: cardElement,
			})

		if (paymentMethodError) {
			setError(paymentMethodError.message || 'An unknown error occurred')
			setLoading(false)
			return
		}

		try {
			const response = await axiosInstance.post('/adminuser/payment', {
				amount: 1000,
				currency: 'usd',
				orderId,
			})

			const { client_secret: clientSecret } = response.data

			const { error: confirmError } = await stripe.confirmCardPayment(
				clientSecret,
				{
					payment_method: paymentMethod?.id,
				}
			)

			if (confirmError) {
				setError(confirmError.message || 'An unknown error occurred')
			} else {
				// Payment successful
				setError(null)
			}
		} catch (err) {
			setError('An error occurred while processing the payment')
		}

		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button
				type='submit'
				disabled={!stripe || loading}>
				Pay
			</button>
			{error && <div>{error}</div>}
		</form>
	)
}

export default CheckoutForm
