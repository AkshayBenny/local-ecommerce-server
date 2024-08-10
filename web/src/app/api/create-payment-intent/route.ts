import { NextRequest, NextResponse } from 'next/server'
// import stripe and initialize using the stored api key
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

// Handle POST request to create a Stripe payment intent
export async function POST(request: NextRequest) {
	try {
		// Parse the json and extract the amount value
		const { amount } = await request.json()

		// Create a new payment intent
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: 'gbp',
			automatic_payment_methods: { enabled: true },
		})

		// Return the payment intent secret as JSON to the client
		return NextResponse.json({ clientSecret: paymentIntent.client_secret })
	} catch (error) {
		// If error is encountered, log it to the console
		console.log('Internal server error: ', error)

		// Return a status 500 server error to the client
		return NextResponse.json(
			{ error: `Internal server error: ${error}` },
			{ status: 500 }
		)
	}
}
