'use client'

import Spinner from '@/components/Spinner'
import axiosInstance from '@/utils/axiosInstance'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

export default function AdminEditProductPage() {
	// State hooks
	const [product, setProduct] = useState<any>({})
	const [loading, setLoading] = useState(false)
	const params = useParams()

	/**
	 * Function to handle the upload of a new product
	 * @param e - Form submit event
	 */
	const productUpdateHandler = async (e: React.FormEvent) => {
		e.preventDefault()

		// Initialize a new form data object
		const formData = new FormData()
		formData.append('productName', product.name)
		formData.append('productDescription', product.description)
		formData.append('productPrice', product.price)
		formData.append('productCategory', product.category)
		if (product.image instanceof File) {
			formData.append('productImage', product.image)
		}

		try {
			// Send form data to the backend
			const response = await axiosInstance.put(
				`/admin/product/edit/${params.pid}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			if (response.status === 200) {
				alert('Product updated')
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}

	/**
	 * Handles the input field changes
	 * @param e - Change event for input and text area fields
	 */
	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setProduct((prev: any) => ({ ...prev, [name]: value }))
	}

	/**
	 * Function to handle file input changes and update the state
	 * @param e - Change event from file input
	 */
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files?.length) {
			setProduct((prev: any) => ({ ...prev, image: files[0] }))
		}
	}

	/**
	 * Fetches product by id from the backend and updates the product state
	 */
	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true)
			try {
				const response = await axiosInstance.get(
					`/product/find/${params.pid}`
				)
				if (response.data) {
					setProduct(response.data)
				}
			} catch (error: any) {
				console.log(error.message)
			}
			setLoading(false)
		}
		fetchProduct()
	}, [params.pid])

	// Display a spinner if loading
	if (loading) {
		return (
			<div>
				<Spinner />
			</div>
		)
	}
	return (
		<main className='max-w-screen min-h-screen mb-12'>
			<div className='lg:max-w-[60vw] lg:mx-auto lg:mt-12'>
				<form
					onSubmit={productUpdateHandler}
					className='flex flex-col items-center justify-center gap-3'>
					<input
						name='name'
						onChange={handleInputChange}
						type='text'
						value={product?.name || ''}
						placeholder='Product name'
					/>
					<textarea
						name='description'
						onChange={handleInputChange}
						value={product?.description || ''}
						placeholder='Product description'
					/>
					<input
						name='price'
						onChange={handleInputChange}
						type='number'
						value={product?.price || ''}
						placeholder='Product price'
					/>
					<input
						name='category'
						onChange={handleInputChange}
						type='text'
						value={product?.category || ''}
						placeholder='Product category'
					/>
					{product.image && typeof product.image === 'string' && (
						<Image
							src={product.image}
							alt={product.name}
							width={100}
							height={100}
						/>
					)}
					<input
						type='file'
						placeholder='New image'
						onChange={handleFileUpload}
					/>
					<button type='submit'>Update</button>
				</form>
			</div>
		</main>
	)
}
