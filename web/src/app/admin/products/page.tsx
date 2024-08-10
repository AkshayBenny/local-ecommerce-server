'use client'

import axiosInstance from '@/utils/axiosInstance'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AdminViewAllProductsPage() {
	// State hook to manage product data
	const [products, setProducts] = useState<any>([])

	/**
	 * Function to handle deletion of a product by their id
	 * @param pid - Product id
	 */
	const productDeleteHandler = async (pid: String) => {
		try {
			await axiosInstance.delete(`/admin/product/delete/${pid}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
			alert('Product deleted successfully!')
			fetchProducts()
		} catch (error: any) {
			console.log(error.message)
		}
	}

	/**
	 * Fetch all product from the backend
	 */
	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get('/public/product/all')

			if (response.status === 200) {
				setProducts(response.data)
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}

	// Calls the function to fetch products on load
	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<div>
			<h1>All products</h1>
			<div className='flex flex-col gap-3'>
				{products.length > 0 ? (
					products.map((product: any) => {
						return (
							<div className='border border-black flex gap-3 justify-between'>
								<Image
									src={product?.image}
									alt={`${product.name}`}
									width={60}
									height={60}
								/>
								<div className='flex flex-col gap-2'>
									<p>{product.name}</p>
									<p>{product.price}</p>
								</div>
								<div className='flex items-center justify-center '>
									<Link
										href={`/admin/edit/${product.id}`}
										className='h-full bg-blue-600 text-white px-3 py-2'>
										Edit
									</Link>
									<button
										onClick={() =>
											productDeleteHandler(product.id)
										}
										className='h-full bg-red-600 text-white px-3 py-2'>
										Delete
									</button>
								</div>
							</div>
						)
					})
				) : (
					<div>No products</div>
				)}
			</div>
		</div>
	)
}
