'use client'
import { userState } from '@/state/authState'
import { cartState } from '@/state/cartState'
import { Product } from '@/types/product'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function ProductPage() {
	const [product, setProduct] = useState<any>({})
	const [user, setUser] = useRecoilState(userState)
	const [cart, setCart] = useRecoilState(cartState)

	const params = useParams()

	const addToCartHandler = (product: Product) => {
		setCart((oldCart: Product[]) => [...oldCart, product])
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
	}, [product])

	return (
		<div className='space-y-[24px]'>
			<Image
				src={product?.image}
				width={100}
				height={100}
				alt={product?.name}
			/>
			<h1 className='text-3xl font-bold'>{product?.name}</h1>
			<p className='text-lg font-normal'>{product?.description}</p>
			<p className='text-3xl font-light'>{product?.price}</p>
			{user ? (
				<button
					onClick={() => addToCartHandler(product)}
					className='black-btn btn-padding'>
					Add to cart
				</button>
			) : (
				<Link
					href='/login'
					className='black-btn btn-padding'>
					Login and add to cart
				</Link>
			)}
		</div>
	)
}
