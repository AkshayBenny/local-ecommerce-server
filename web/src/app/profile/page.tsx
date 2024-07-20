'use client'

import { tokenState, userState } from '@/state/authState'
import { useRecoilState } from 'recoil'

export default function UserProfilePage() {
	const [user, setUser] = useRecoilState(userState)
	return (
		<main className='flex flex-col items-center justify-center gap-2'>
			<p>Profile page</p>
			<p className='text-black'>{user?.email}</p>
			<p>{user?.name}</p>
		</main>
	)
}
