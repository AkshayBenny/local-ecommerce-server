'use client'

import Image from 'next/image'
import Link from 'next/link'
import ArrowRightLineIcon from 'remixicon-react/ArrowRightLineIcon'
import Chat2LineIcon from 'remixicon-react/Chat2LineIcon'
import PriceTag3LineIcon from 'remixicon-react/PriceTag3LineIcon'
export default function ProductCard({
	pid,
	image,
	name,
	desc,
	price,
}: {
	pid: string
	image: string
	name: string
	desc: string
	price: string
}) {
	return (
		<Link href={`product/${pid}`}>
			<div
				key={pid}
				className='flex flex-col items-center justify-center gap-2 overflow-clip rounded-[8px] border-2 border-customVeryLightBlack drop-shadow-sm hover:drop-shadow-xl transition  group'>
				<div className='aspect-square relative w-full h-full'>
					<Image
						src={image}
						alt={`${name} image`}
						layout='fill'
						objectFit='cover'
						className='drop-shadow-none'
					/>
				</div>
				<div className='w-full p-[24px] '>
					<div className='w-full opacity-40 flex gap-[16px]'>
						<div className='flex gap-[4px] justify-start items-center'>
							<Chat2LineIcon className='w-[16px] h-[16px]' />
							<p className='font-light text-[14px]'>
								65 Comments
							</p>
						</div>
						<div className='flex gap-[4px] justify-start items-center'>
							<PriceTag3LineIcon className='w-[16px] h-[16px]' />
							<p className='font-light text-[14px]'>
								Organic, fruits
							</p>
						</div>
					</div>
					<div className='flex justify-between items-end'>
						<div>
							<p className='text-lg font-medium pt-[8px]'>
								{name}
							</p>

							<div className='flex gap-3 justify-start items-center text-customGreen transition'>
								<p className='transition'>Read More</p>
								<span>
									<ArrowRightLineIcon className='w-[24px] h-[20px]' />
								</span>
							</div>
						</div>
						<p className='text-2xl font-thin opacity-80'>
							£{price}
						</p>
					</div>
				</div>
			</div>
		</Link>
	)
}
