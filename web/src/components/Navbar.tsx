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
import User6LineIcon from 'remixicon-react/User6LineIcon'
import LogoutBoxLineIcon from 'remixicon-react/LogoutBoxLineIcon'
export default function NavBar() {
	const authContext = useContext(AuthContext)
	if (!authContext) return null

	const user = useRecoilValue(userState)
	const [cart, setCart] = useRecoilState(cartState)

	const { logout } = authContext

	const logoutHandler = () => logout()

	return (
		<div className='text-customGreen fixed top-0 z-10  w-full'>
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
								<p className=''>
									<ShoppingCartLineIcon className='h-[24px] w-[24px] text-customGreen' />
								</p>
								{/* {cart.length > 0 && (
								<p className='absolute top-[-8px] right-[-9px] opacity-60 rounded-full bg-white text-black text-[12px] flex items-center justify-center w-[16px] h-[16px]'>
									{cart.length > 0 && cart.length}
								</p>
							)} */}
							</div>
						</Link>
						<Link href='/profile'>
							<div className='relative flex items-center justify-center'>
								<User6LineIcon className='h-[20px] w-[20px] text-customGreen' />
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
