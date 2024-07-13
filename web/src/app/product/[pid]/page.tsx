'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductPage() {
	const [product, setProduct] = useState<any>({})
	const params = useParams()

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/product/find/${params.pid}`
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
			<h1 className='text-3xl font-bold'>{product?.name}</h1>
			<p className='text-lg font-normal'>{product?.description}</p>
			<p className='text-3xl font-light'>{product?.price}</p>
		</div>
	)
}
