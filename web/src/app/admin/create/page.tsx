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
			<form
				onSubmit={createProductHandler}
				className='flex flex-col items-center justify-center gap-4 border w-fit px-12 py-6'>
				<h3 className='font-semibold text-[32px] leading-[120%] opacity-90'>
					Create a new product
				</h3>
				<div className='w-full'>
					<p className='text-[14px] font-regular'>
						Enter product name
					</p>
					<input
						type='text'
						placeholder='Enter name'
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-md w-full'
					/>
				</div>
				<div className='w-full'>
					<p className='text-[14px] font-regular'>
						Enter product description
					</p>
					<textarea
						value={productDesc}
						placeholder='Description'
						onChange={(e) => setProductDesc(e.target.value)}
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-md w-full'></textarea>
				</div>
				<div className='w-full'>
					<p className='text-[14px] font-regular'>Price</p>
					<input
						type='number'
						placeholder='Enter price'
						value={productPrice}
						onChange={(e) =>
							setProductPrice(Number(e.target.value))
						}
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-md w-full'
					/>
				</div>
				<div className='w-full'>
					<p className='text-[14px] font-regular'>Category</p>
					<input
						type='text'
						placeholder='Product category'
						value={productCategory}
						onChange={(e) => setProductCategory(e.target.value)}
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-md w-full'
					/>
				</div>
				<div w-full>
					<p className='text-[14px] font-regular'>Product image</p>
					<input
						type='file'
						onChange={handleFileUpload}
						className='border border-[#E6E6E6] px-[16px] py-[14px] rounded-md w-full'
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-customGreen py-[14px] rounded-md text-white'>
					Create
				</button>
			</form>
		</main>
	)
}
