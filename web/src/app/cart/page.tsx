'use client'

import { cartState } from '@/state/cartState'
import { Product } from '@/types/product'
import axiosInstance from '@/utils/axiosInstance'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export default function CartPage() {
	const [cart, setCart] = useRecoilState(cartState)

	const removeFromCart = (productId: string) => {
		setCart((oldCart) =>
			oldCart.filter((product) => product.id !== productId)
		)
	}

	useEffect(() => {
		const fetchCart = async () => {
			const response = await axiosInstance.get('/cart/get')
			console.log('FETCHED CART>>>', response.data)
		}
		fetchCart()
	}, [])

	if (cart.length === 0)
		return (
			<div>
				Cart currently empty.{' '}
				<Link href='/'>
					<p className='text-blue-700 underline'>Add some products</p>
				</Link>
			</div>
		)
	return (
		<div>
			<h1>Cart Page</h1>
			{cart.length > 0 &&
				cart.map((product: Product) => {
					return (
						<div className='flex items-center justify-start'>
							<Image
								src={product?.image}
								width={100}
								height={100}
								alt={product?.name}
							/>
							<div>
								<h1 className='text-3xl font-bold'>
									{product?.name}
								</h1>
								<p className='text-lg font-normal'>
									{product?.description}
								</p>
								<p className='text-3xl font-light'>
									{product?.price}
								</p>
							</div>
							<div>
								<button
									onClick={() => removeFromCart(product.id)}
									className='black-btn btn-padding'>
									Remove
								</button>
							</div>
						</div>
					)
				})}
		</div>
	)
}
