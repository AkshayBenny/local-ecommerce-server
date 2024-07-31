'use client'

import PrivateRoute from '@/components/PrivateRoute'
import { cartState } from '@/state/cartState'
import axiosInstance from '@/utils/axiosInstance'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export default function CartPage() {
	const router = useRouter()
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
			router.push('/checkout')
		} catch (error: any) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const response = await axiosInstance.get('adminuser/cart/get')
				setCart(response?.data?.products)
				console.log('Cart: ', response?.data)
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
			<main className='max-w-screen min-h-screen mb-12'>
				<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
					<h1 className='text-[32px] text-[#1A1A1A] font-semibold text-center mb-[32px]'>
						My Cart
					</h1>
					{cart.length > 0 && (
						<table className='w-full table-auto'>
							<thead>
								<tr>
									<th className='px-4 py-2'>Product</th>
									<th className='px-4 py-2'>Price</th>
									<th className='px-4 py-2'>Quantity</th>
									<th className='px-4 py-2'>Subtotal</th>
									<th className='px-4 py-2'>Remove</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item) => (
									<tr key={item.id}>
										<td className='border px-4 py-2 flex items-center'>
											{item.product.image && (
												<Image
													src={item.product.image}
													width={50}
													height={50}
													alt={item.product.name}
												/>
											)}
											<span className='ml-4'>
												{item.product.name}
											</span>
										</td>
										<td className='border px-4 py-2'>
											${item.product.price.toFixed(2)}
										</td>
										<td className='border px-4 py-2'>
											<div className='flex items-center'>
												<button
													className='px-2'
													// onClick={() =>
													// 	updateQuantity(
													// 		item.id,
													// 		item.quantity - 1
													// 	)
													// }
													>
													-
												</button>
												<span className='mx-2'>
													{/* {item.quantity} */}
													12
												</span>
												<button
													className='px-2'
													// onClick={() =>
													// 	updateQuantity(
													// 		item.id,
													// 		item.quantity + 1
													// 	)
													// }
													>
													+
												</button>
											</div>
										</td>
										<td className='border px-4 py-2'>
											{/* $
											{(
												item.product.price *
												item.quantity
											).toFixed(2)} */}
											4
										</td>
										<td className='border px-4 py-2'>
											<button
												onClick={() =>
													removeFromCart(item.id)
												}
												className='black-btn btn-padding'>
												X
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
					<div className='flex justify-end mt-4'>
						<button
							className='black-btn btn-padding'
							onClick={checkoutHandler}>
							Go to checkout
						</button>
					</div>
				</div>
			</main>
		</PrivateRoute>
	)
}
