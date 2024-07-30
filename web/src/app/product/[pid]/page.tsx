'use client'
import { userState } from '@/state/authState'
import { cartState } from '@/state/cartState'
import { Product } from '@/types/product'
import axiosInstance from '@/utils/axiosInstance'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MouseEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Chat2LineIcon from 'remixicon-react/Chat2LineIcon'
import PriceTag3LineIcon from 'remixicon-react/PriceTag3LineIcon'
import AddLineIcon from 'remixicon-react/AddLineIcon'
import SubtractLineIcon from 'remixicon-react/SubtractLineIcon'

export default function ProductPage() {
	const [product, setProduct] = useState<any>({})
	const [user, setUser] = useRecoilState(userState)
	const [cart, setCart] = useRecoilState(cartState)
	const [quantity, setQuantity] = useState(1)

	const params = useParams()

	const addToCartHandler = async (pid: String) => {
		try {
			const response = await axiosInstance.post(
				`adminuser/cart/add-product/${pid}/${quantity}`
			)
			if (response.status === 200) {
				setCart((oldCart: Product[]) => [...oldCart, product])
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/public/product/find/${params.pid}`
				)
				if (response.data) {
					setProduct(response.data)
				}
			} catch (error: any) {
				console.log(error.message)
			}
		}
		fetchProduct()
	}, [])

	return (
		<main className='max-w-screen min-h-screen mb-12'>
			<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				<div className='aspect-video relative w-full h-full'>
					<Image
						src={product?.image}
						alt={`${product?.name} image`}
						layout='fill'
						objectFit='cover'
						className='rounded-lg'
					/>
				</div>
				<div className='w-full  flex gap-[16px] lg:mt-[32px]'>
					<div className='flex gap-[4px] justify-start items-center'>
						<Chat2LineIcon className='w-[16px] h-[16px] text-customGreen' />
						<p className='font-light text-[14px] opacity-60'>
							65 Comments
						</p>
					</div>
					<div className='flex gap-[4px] justify-start items-center'>
						<PriceTag3LineIcon className='w-[16px] h-[16px] text-customGreen' />
						<p className='font-light text-[14px] opacity-60'>
							{product?.category}
						</p>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-medium leading-[140%]'>
						{product?.name}
					</h1>
					<p className='text-3xl font-light  leading-[140%]'>
						£{product?.price}
					</p>
				</div>

				<p className='text-lg font-normal leading-[150%] text-[#808080] mt-4'>
					{product?.description}
				</p>

				{user ? (
					<div className='flex gap-3 items-center justify-center mt-12'>
						<div className='flex items-center justify-center gap-4 border border-customVeryLightBlack p-2 rounded-full h-[64px]'>
							<button
								onClick={(e) => {
									setQuantity(quantity + 1)
								}}
								className='bg-customGreen rounded-full p-3'>
								<AddLineIcon className='h-[16px] w-[16px] text-white' />
							</button>
							<input
								type='number'
								value={quantity}
								className='px-[16px] border-none outline-none ring-0  rounded-full max-w-[90px]'
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setQuantity(Number(e.target.value))}
							/>
							<button
								onClick={(e) => {
									quantity > 1 && setQuantity(quantity - 1)
								}}
								className='bg-customGreen rounded-full p-3'>
								<SubtractLineIcon className='h-[16px] w-[16px] text-white' />
							</button>
						</div>
						<button
							onClick={() => addToCartHandler(product.id)}
							className='w-full bg-customGreen py-[14px] rounded-full text-white'>
							Add to cart
						</button>
					</div>
				) : (
					<Link
						href='/login'
						className=''>
						<button className='w-full bg-customGreen py-[14px] rounded-lg text-white mt-12'>
							You need to login first...
						</button>
					</Link>
				)}
			</div>
		</main>
	)
}
