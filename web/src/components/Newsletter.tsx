export default function Newsletter() {
	return (
		<div className='bg-[#F7F7F7] mt-12 '>
			<div className='lg:max-w-[60vw] mx-auto flex items-center justify-center py-[40px]'>
				<div>
					<p className='text-[#1A1A1A] leading-[150%] font-semibold text-2xl'>
						Subscribe to our Newsletter
					</p>
					<p className='text-[#999999] text-[14px] pt-[4px] leading-[150%]'>
						Stay updated with the latest products and exclusive
						deals! Subscribe to our newsletter and never miss out on
						exciting offers from LocalShopper.
					</p>
				</div>
				<div className='flex bg-white rounded-full '>
					<input
						type='email'
						placeholder='Your email...'
						className='border-none ring-0 outline-none focus:ring-0 focus:border-none focus:outline-none rounded-full px-4'
					/>
					<button className='text-[16px] font-semibold w-full bg-customGreen py-[14px] rounded-full text-white px-[24px]'>
						Subscribe
					</button>
				</div>
			</div>
		</div>
	)
}
