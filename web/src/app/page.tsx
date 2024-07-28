'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '@/components/ProductCard'

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
		<main className='max-w-screen h-screen'>
			
			<div className='grid lg:grid-cols-2 grid-cols-1 gap-10 lg:w-full lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				{products?.map((product: any) => {
					return (
						<ProductCard
							pid={product?.id}
							image={product?.image}
							name={product?.name}
							desc={product?.description}
							price={product?.price}
						/>
					)
				})}
			</div>
		</main>
	)
}
