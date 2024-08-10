'use client'

import axiosInstance from '@/utils/axiosInstance'
import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function CreateProductAdminPage() {
	// state hooks to manage the different states
	const [productName, setProductName] = useState<string>('')
	const [productDesc, setProductDesc] = useState<string>('')
	const [productPrice, setProductPrice] = useState<number>(0)
	const [productCategory, setProductCategory] = useState<string>('')
	const [productImage, setProductImage] = useState<File | null>()

	/**
	 * Function to handle file uploades
	 * @param e - Change event from file input
	 */
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setProductImage(e.target.files[0])
		}
	}

	/**
	 * Function to create a new product
	 * @param e - Form submit event
	 */
	const createProductHandler = async (e: FormEvent) => {
		e.preventDefault()

		// Initialises a new form object
		const formData = new FormData()

		formData.append('productName', productName)
		formData.append('productDescription', productDesc)
		formData.append('productPrice', productPrice.toString())
		formData.append('productCategory', productCategory)

		if (productImage) {
			formData.append('productImage', productImage)
		}

		try {
			// Post the form data to the backend
			const response = await axiosInstance.post(
				'/admin/product/new',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)

			if (response.status === 200) {
				alert('New product created!')
				setProductName('')
				setProductDesc('')
				setProductPrice(0)
				setProductCategory('')
				setProductImage(null)
			}
		} catch (error: any) {
			// If error encountered, log it to the console
			console.log(error.message)
		}
	}
	return (
		<main className='flex flex-col items-center justify-center h-full gap-12'>
			<h2 className='text-xl'>Create a new product</h2>
			<form
				onSubmit={createProductHandler}
				className='flex flex-col items-center justify-center gap-4 border w-fit px-12 py-6'>
				<h3>Create a new product</h3>
				<div>
					<p>Enter product name</p>
					<input
						type='text'
						placeholder='Enter name'
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
					/>
				</div>
				<div>
					<p>Enter product description</p>
					<textarea
						value={productDesc}
						placeholder='Description'
						onChange={(e) =>
							setProductDesc(e.target.value)
						}></textarea>
				</div>
				<div>
					<p>Price</p>
					<input
						type='number'
						placeholder='Enter price'
						value={productPrice}
						onChange={(e) =>
							setProductPrice(Number(e.target.value))
						}
					/>
				</div>
				<div>
					<p>Category</p>
					<input
						type='text'
						placeholder='Product category'
						value={productCategory}
						onChange={(e) => setProductCategory(e.target.value)}
					/>
				</div>
				<div>
					<p>Product image</p>
					<input
						type='file'
						onChange={handleFileUpload}
					/>
				</div>
				<button
					type='submit'
					className='bg-black text-white px-4 py-2'>
					Create
				</button>
			</form>
		</main>
	)
}
