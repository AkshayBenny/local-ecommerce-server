'use client'

import PrivateRoute from '@/components/PrivateRoute'
import { cartState } from '@/state/cartState'
import axiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export default function CartPage() {
	const [cart, setCart] = useRecoilState(cartState)

	const removeFromCart = async (productId: string) => {
		try {
			await axiosInstance.delete(
				`adminuser/cart/remove/product/${productId}`
			)
			setCart((oldCart) =>
				oldCart.filter((product) => product.id !== productId)
			)
		} catch (error: any) {
			console.log('Error removing product:', error?.message)
		}
	}

	const checkoutHandler = async () => {
		try {
			await axiosInstance.post('adminuser/order/create')
		} catch (error: any) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const response = await axiosInstance.get('adminuser/cart/get')
				setCart(response?.data?.products)
			} catch (error: any) {
				console.log(error?.message)
			}
		}
		fetchCart()
	}, [])

	if (cart && cart.length === 0)
		return (
			<div>
				Cart currently empty.{' '}
				<Link href='/'>
					<p className='text-blue-700 underline'>Add some products</p>
				</Link>
			</div>
		)
	return (
		<PrivateRoute>
			<div>
				<h1>Cart Page</h1>
				{cart.length > 0 &&
					cart.map((product: any) => {
						console.log(product)
						return (
							<div className='flex items-center justify-start'>
								{/* {product?.image && (
									<Image
										src={product?.image}
										width={100}
										height={100}
										alt={product?.name}
									/>
								)} */}
								<div>
									<h1 className='text-3xl font-bold'>
										{product?.product?.name}
									</h1>
									<p className='text-lg font-normal'>
										{product?.product?.description}
									</p>
									<p className='text-3xl font-light'>
										{product?.product?.price}
									</p>
								</div>
								<p>Quantity: {product?.quantity}</p>
								<div>
									<button
										onClick={() =>
											removeFromCart(product.product.id)
										}
										className='black-btn btn-padding'>
										Remove
									</button>
								</div>
							</div>
						)
					})}

				<button
					className='black-btn btn-padding'
					onClick={checkoutHandler}>
					Go to checkout
				</button>
			</div>
		</PrivateRoute>
	)
}
