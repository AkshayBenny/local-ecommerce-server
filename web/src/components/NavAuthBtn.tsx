'use client'
import { usePathname } from 'next/navigation'
import LoginRegisterBtn from './LoginRegisterBtn'

export default function NavAuthBtn() {
	const pathname = usePathname()

	if (pathname === '/register') {
		return <LoginRegisterBtn type='Login' />
	}

	if (pathname === 'login') {
		return <LoginRegisterBtn type='Register' />
	}

	return (
		<div className='flex items-center justify-end gap-4'>
			<LoginRegisterBtn type='Login' />
			<LoginRegisterBtn type='Register' />
		</div>
	)
}
