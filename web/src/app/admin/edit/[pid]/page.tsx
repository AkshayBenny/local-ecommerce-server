'use client'

import axiosInstance from '@/utils/axiosInstance'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

export default function AdminEditProductPage() {
	const [product, setProduct] = useState<any>({})
	const [loading, setLoading] = useState(false)
	const params = useParams()

	const productUpdateHandler = async (e: React.FormEvent) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('productName', product.name)
		formData.append('productDescription', product.description)
		formData.append('productPrice', product.price)
		formData.append('productCategory', product.category)
		if (product.image instanceof File) {
			formData.append('productImage', product.image)
		}

		try {
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

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setProduct((prev: any) => ({ ...prev, [name]: value }))
	}
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files?.length) {
			setProduct((prev: any) => ({ ...prev, image: files[0] }))
		}
	}
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

	if (loading) {
		return <div>Loading...</div>
	}
	return (
		<div>
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
	)
}
