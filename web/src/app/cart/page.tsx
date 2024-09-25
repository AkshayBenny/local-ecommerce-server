'use client'

import PrivateRoute from '@/components/PrivateRoute'
import { cartState } from '@/state/cartState'
import axiosInstance from '@/utils/axiosInstance'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'

export default function CartPage() {
	// Recoil state hook to manage global state of the cart
	const [cart, setCart] = useRecoilState(cartState)

	/**
	 * Function to handle deletion of a product from the cart
	 * @param productId - Product Id to delete
	 */
	const removeFromCart = async (productId: string) => {
		try {
			// Send a DELETE request to the backend
			await axiosInstance.delete(
				`adminuser/cart/remove/product/${productId}`
			)
			// Update the cart state
			setCart((oldCart) =>
				oldCart.filter((product) => product.id !== productId)
			)
		} catch (error: any) {
			// If error is encountered, log it to the console
			console.log('Error removing product:', error?.message)
		}
	}

	// Fetch the cart when the component is mounted
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

	// If the cart is empty display a message
	if (cart && cart.length === 0)
		return (
			<div className='flex flex-col items-center justify-center'>
				<p className='text-[32px] text-[#1A1A1A] font-medium text-start mb-[32px]'>
					Cart currently empty.{' '}
				</p>
				<Link href='/'>
					<p className='text-blue-700 underline'>Add some products</p>
				</Link>
			</div>
		)

	return (
		<PrivateRoute>
			<main className='max-w-screen min-h-screen mb-12'>
				<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
					<h1 className='text-[32px] text-[#1A1A1A] font-medium text-center mb-[32px]'>
						My Cart
					</h1>
					{cart.length > 0 && (
						<table className='w-full table-auto'>
							<thead className='uppercase'>
								<tr>
									<th className='px-4 py-2 font-medium text-[#808080] text-[14px]'>
										Product
									</th>
									<th className='px-4 py-2 font-medium text-[#808080] text-[14px]'>
										Price
									</th>
									<th className='px-4 py-2 font-medium text-[#808080] text-[14px]'>
										Quantity
									</th>
									<th className='px-4 py-2 font-medium text-[#808080] text-[14px]'>
										Subtotal
									</th>
									<th className='px-4 py-2 font-medium text-[#808080] text-[14px]'>
										Remove
									</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item: any) => (
									<tr
										key={item.id}
										className='text-[16px] text-[#1A1A1A] font-regular'>
										<td className='border-t  px-4 py-2 flex items-center'>
											{item?.product?.image && (
												<div className='relative w-[100px] h-[100px]'>
													<Image
														src={
															item?.product?.image
														}
														layout='fill'
														objectFit='cover'
														className='w-[100px] h-[100px] aspect-square'
														alt={
															item?.product?.name
														}
													/>
												</div>
											)}
											<span className='ml-4 '>
												{item?.product?.name}
											</span>
										</td>
										<td className='border-t px-4 py-2 text-center'>
											£{item?.product?.price.toFixed(2)}
										</td>
										<td className='border-t px-4 py-2 '>
											<div className='flex items-center justify-center'>
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
													{item?.quantity}
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
										<td className='border-t px-4 py-2 text-center'>
											£
											{(
												item?.product?.price *
												item?.quantity
											).toFixed(2)}
										</td>
										<td className='border-t px-4 py-2 '>
											<div className='flex items-center justify-center'>
												<button
													onClick={() =>
														removeFromCart(
															item?.product?.id
														)
													}
													className='mx-auto opacity-60 text-black hover:text-red-500 transition'>
													<DeleteBinLineIcon className='w-[24px] h-[24px]' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
					<div className='flex justify-end mt-4'>
						<Link href='/checkout'>
							<button className='w-full bg-customGreen py-[14px] rounded-full text-white px-12'>
								Go to checkout
							</button>
						</Link>
					</div>
				</div>
			</main>
		</PrivateRoute>
	)
}
