import { NextRequest, NextResponse } from 'next/server'
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

export async function POST(request: NextRequest) {
	try {
		const { amount } = await request.json()
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: 'gbp',
			automatic_payment_methods: { enabled: true },
		})

		return NextResponse.json({ clientSecret: paymentIntent.client_secret })
	} catch (error) {
		console.log('Internal server error: ', error)
		return NextResponse.json(
			{ error: `Internal server error: ${error}` },
			{ status: 500 }
		)
	}
}
