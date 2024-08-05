'use client'

import { userState } from '@/state/authState'
import axiosInstance from '@/utils/axiosInstance'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function Comment({ pid }: { pid: number }) {
	const [newComment, setNewComment] = useState('')
	const [comments, setComments] = useState<any>([])

	const user = useRecoilValue(userState)

	const addCommentHandler = async (e: any) => {
		e.preventDefault()
		try {
			await axiosInstance.post(`/adminuser/comment/add-comment`, {
				pid: pid,
				comment: newComment,
			})
		} catch (error: any) {
			console.log(error.message)
		}
		setNewComment('')
	}

	const getCommentHandler = async () => {
		try {
			const response = await axiosInstance.get(
				`/public/comment/get-comment/${pid}`
			)
			if (response.status === 200) {
				setComments(response.data)
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		getCommentHandler()
	}, [])

	return (
		<div className='mt-[40px] text-[#1A1A1A]'>
			{user ? (
				<>
					{' '}
					<h4 className='text-[24px] font-medium '>
						Leave a comment
					</h4>
					<form
						onSubmit={addCommentHandler}
						className='pt-[16px]'>
						<p className='text-[14px] font-regular'>Message</p>
						<textarea
							name='message'
							id='message'
							className='w-full border border-customVeryLightBlack focus:ring-1 focus:outline-customGreen rounded-[6px] mt-[6px] py-[14px] px-[16px] text-[16px] placeholder:text-[16px]'
							placeholder='Write your comment here...'
							cols={30}
							rows={10}
							value={newComment}
							onChange={(e) =>
								setNewComment(e.target.value)
							}></textarea>
						<button
							type='submit'
							className='w-fit bg-customGreen py-[16px] px-[40px] rounded-full text-white mt-[24px]'>
							Post Comment
						</button>
					</form>
				</>
			) : (
				<></>
			)}
			<div>
				<p className='text-[24px] font-medium pt-[40px] mb-[24px]'>
					Comments
				</p>
				{comments.length > 0 ? (
					comments.map((comment: any) => {
						return (
							<div key={comment.id}>
								<div className='flex items-start justify-start gap-[12px]'>
									<Image
										src='/person.jpg'
										width={40}
										height={40}
										objectFit='cover'
										alt='Person profile picture'
										className='rounded-full w-[40px] h-[40px]'
									/>
									<div>
										<div className='flex items-center justify-start gap-[6px]'>
											<p className='text-[14px] font-medium'>
												Jerkins Joyboy
											</p>
											<span>•</span>
											<p className='text-[14px] font-regular text-[#999999]'>
												26 Apr, 2021
											</p>
										</div>
										<p className='text-[14px] font-regular text-[#666666]'>
											{comment.content}
										</p>
									</div>
								</div>
								<div className='h-[1px] w-full border border-customVeryLightBlack my-[24px]'></div>
							</div>
						)
					})
				) : (
					<div>No comments yet</div>
				)}
			</div>
		</div>
	)
}
