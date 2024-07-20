'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
	const [products, setProducts] = useState<any>()
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8080/public/product/all',
					{
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
					}
				)
				if (response.data) {
					setProducts(response.data)
				}
			} catch (error: any) {
				console.log(error.message)
			}
		}

		fetchData()
	}, [])
	return (
		<main className='w-screen h-screen grid grid-cols-3 gap-10'>
			{products?.map((product: any) => {
				return (
					<div
						key={product.id}
						className='flex flex-col items-center justify-center gap-2'>
						<Image src={product.image} alt={`${product.name} image`} width={60} height={60} />
						<p className='text-xl font-semibold'>{product.name}</p>
						<p className='text-2xl font-thin'>{product.price}</p>
						<Link href={`product/${product.id}`}>Go to product page</Link>
					</div>
				)
			})}
		</main>
	)
}
