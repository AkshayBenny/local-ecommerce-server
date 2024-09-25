'use client'

import axiosInstance from '@/utils/axiosInstance'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import EditBoxLineIcon from 'remixicon-react/EditBoxLineIcon'
import DeleteBinLineIcon from 'remixicon-react/DeleteBinLineIcon'

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
		<main className='max-w-screen min-h-screen mb-12'>
			<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				<h1 className='text-[32px] text-[#1A1A1A] font-medium text-start mb-[32px]'>
					All products
				</h1>
				<div className='flex flex-col gap-3'>
					{products.length > 0 ? (
						products.map((product: any) => {
							return (
								<div className='border-b border-opacity-10 pb-2 flex gap-3 justify-between'>
									<div className='flex items-center justify-start gap-5'>
										<Image
											src={product?.image}
											alt={`${product.name}`}
											width={60}
											height={60}
											className='aspect-square'
										/>
										<div className='flex flex-col gap-2'>
											<p>{product.name}</p>
											<p>£ {product.price}</p>
										</div>
									</div>
									<div className='flex items-center justify-center gap-4'>
										<Link
											href={`/admin/edit/${product.id}`}>
											<EditBoxLineIcon className='text-white h-[32px] w-[32px] bg-customGreen p-2 rounded-md' />
										</Link>
										<button
											onClick={() =>
												productDeleteHandler(product.id)
											}>
											<DeleteBinLineIcon className='text-white h-[32px] w-[32px] bg-red-400 p-2 rounded-md' />
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
		</main>
	)
}
