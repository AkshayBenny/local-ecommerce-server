'use client'
import { AuthContext } from '@/context/AuthContext'
import { userState } from '@/state/authState'
import { cartState } from '@/state/cartState'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function NavBar() {
	const authContext = useContext(AuthContext)
	if (!authContext) return null

	const user = useRecoilValue(userState)
	const [cart, setCart] = useRecoilState(cartState)

	const { logout } = authContext

	const logoutHandler = () => logout()

	return (
		<nav className='w-full  bg-black flex items-center justify-between px-12 py-4'>
			<Link href={'/'}>
				<p className='font-bold text-white text-xl'>LocalShopper</p>
			</Link>
			{user && (
				<div className='flex items-center justify-center gap-4'>
					<Link href='/cart'>
						<div className='relative'>
							<p className='text-white'>Cart</p>
							{/* {cart.length > 0 && (
								<p className='absolute top-[-8px] right-[-9px] opacity-60 rounded-full bg-white text-black text-[12px] flex items-center justify-center w-[16px] h-[16px]'>
									{cart.length > 0 && cart.length}
								</p>
							)} */}
						</div>
					</Link>
					<Link href='/profile'>
						<div className='relative'>
							<p className='text-white'>Profile</p>
						</div>
					</Link>
					<button
						className='bg-white text-black rounded-full px-4 py-2'
						onClick={logoutHandler}>
						Logout
					</button>
				</div>
			)}

			{!user && (
				<div className='flex items-center justify-center gap-4'>
					<Link href='/register'>
						<div className='relative'>
							<p className='text-white'>Register</p>
						</div>
					</Link>
					<Link href='/login'>
						<div className='relative'>
							<p className='text-white'>Login</p>
						</div>
					</Link>
				</div>
			)}
		</nav>
	)
}
