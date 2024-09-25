'use client'
import { Elements } from '@stripe/react-stripe-js'
import { useParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import StripePayment from '@/components/StripePayment'
import { convertToSubCurrency } from '@/utils/convertToSubCurrency'
import { useEffect, useState } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import Spinner from '@/components/Spinner'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
	throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY not defined.')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function PaymentPage() {
	const params = useParams()
	const [amount, setAmount] = useState(0)
	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const response = await axiosInstance.get(
					`/adminuser/order/${params.orderId}`
				)
				setAmount(response.data.totalAmount)
			} catch (error: any) {
				console.log('Error fetching order:', error.message)
			}
		}
		fetchOrder()
	}, [])

	if (amount <= 0) {
		return <Spinner />
	}
	return (
		<Elements
			stripe={stripePromise}
			options={{
				mode: 'payment',
				amount: convertToSubCurrency(amount),
				currency: 'gbp',
			}}>
			
			<StripePayment
				orderId={params.orderId}
				amount={amount}
			/>
		</Elements>
	)
}
