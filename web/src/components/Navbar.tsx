'use client'
import { AuthContext } from '@/context/AuthContext'
import { userState } from '@/state/authState'
import Link from 'next/link'
import { useContext } from 'react'
import { useRecoilValue } from 'recoil'

export default function NavBar() {
	const authContext = useContext(AuthContext)
	if (!authContext) return null

	const user = useRecoilValue(userState)

	const { logout } = authContext

	const logoutHandler = () => logout()

	return (
		<nav className='w-full  bg-black flex items-center justify-between px-12 py-4'>
			<Link href={'/'}>
				<p className='font-bold text-white text-xl'>LocalShopper</p>
			</Link>
			{/* {user && ( */}
			<button
				className='bg-white text-black rounded-full px-4 py-2'
				onClick={logoutHandler}>
				Logout
			</button>
			{/* )} */}
		</nav>
	)
}
