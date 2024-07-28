'use client'
import { AuthContext } from '@/context/AuthContext'
import { userState } from '@/state/authState'
import { cartState } from '@/state/cartState'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import LoginRegisterBtn from './LoginRegisterBtn'

export default function NavBar() {
	const authContext = useContext(AuthContext)
	if (!authContext) return null

	const user = useRecoilValue(userState)
	const [cart, setCart] = useRecoilState(cartState)

	const pathname = usePathname()

	const { logout } = authContext

	const logoutHandler = () => logout()

	return (
		<div className='text-customGreen'>
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
				{user && (
					<div className='flex items-center justify-center gap-4'>
						<Link href='/cart'>
							<div className='relative'>
								<p className=''>Cart</p>
								{/* {cart.length > 0 && (
								<p className='absolute top-[-8px] right-[-9px] opacity-60 rounded-full bg-white text-black text-[12px] flex items-center justify-center w-[16px] h-[16px]'>
									{cart.length > 0 && cart.length}
								</p>
							)} */}
							</div>
						</Link>
						<Link href='/profile'>
							<div className='relative'>
								<p className=''>Profile</p>
							</div>
						</Link>
						<button
							className='bg-white rounded-full px-4 py-2'
							onClick={logoutHandler}>
							Logout
						</button>
					</div>
				)}

				{!user && (
					<div className='flex items-center justify-center gap-4'>
						{pathname === '/register' ? (
							<LoginRegisterBtn type='Login' />
						) : (
							<LoginRegisterBtn type='Register' />
						)}
					</div>
				)}
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
