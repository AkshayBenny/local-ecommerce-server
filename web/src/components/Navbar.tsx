'use client'
import { AuthContext } from '@/context/AuthContext'
import { userState } from '@/state/authState'
import { cartState } from '@/state/cartState'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import NavAuthBtn from './NavAuthBtn'
import ShoppingCartLineIcon from 'remixicon-react/ShoppingCartLineIcon'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import LogoutBoxLineIcon from 'remixicon-react/LogoutBoxLineIcon'

export default function NavBar() {
	const authContext = useContext(AuthContext)
	if (!authContext) return null

	const user = useRecoilValue(userState)
	const cart = useRecoilValue<any>(cartState)

	const { logout } = authContext

	const logoutHandler = () => logout()

	return (
		<div className='text-[#1A1A1A] fixed top-0 z-10  w-full'>
			<nav className='w-full  bg-white flex items-center justify-between px-12 py-4'>
				<Link href={'/'}>
					<p className='font-bold  text-xl'>LocalShopper</p>
				</Link>
				<div>
					<input
						type='text'
						placeholder='Search...'
					/>
				</div>
				{user && user.role === 'ADMIN' ? (
					<>
						<Link href='/admin'>
							<div className='relative flex items-center justify-center'>
								<UserLineIcon className='h-[20px] w-[20px] text-[#1A1A1A]' />
								<p>Dashboard</p>
							</div>
						</Link>
					</>
				) : (
					<></>
				)}
				{user && (
					<div className='flex items-center justify-center gap-4'>
						<Link href='/cart'>
							<div className='relative'>
								<p className=''>
									<ShoppingCartLineIcon className='h-[24px] w-[24px] ' />
								</p>
								{cart && cart?.length > 0 && (
									<p className='absolute top-[-8px] right-[-9px] rounded-full bg-[#2C742F] text-white text-[12px] flex items-center justify-center w-[18px] h-[18px]'>
										{cart.length > 0 && cart.length}
									</p>
								)}
							</div>
						</Link>
						<Link href='/profile'>
							<div className='relative flex items-center justify-center'>
								<UserLineIcon className='h-[20px] w-[20px] text-[#1A1A1A]' />
								<p>Profile</p>
							</div>
						</Link>
						<button
							className='bg-white rounded-full px-4 py-2 flex items-center justify-center gap-1'
							onClick={logoutHandler}>
							<LogoutBoxLineIcon />
							<p>Logout</p>
						</button>
					</div>
				)}

				{!user && <NavAuthBtn />}
			</nav>
			<div className='w-full h-[100px] relative'>
				<Image
					src='/navbar.jpg'
					alt='Breadcrumb background'
					layout='fill'
					objectFit='cover'
				/>
			</div>
		</div>
	)
}
