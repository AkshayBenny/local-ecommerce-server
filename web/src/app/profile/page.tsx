'use client'

import { userState } from '@/state/authState'
import { useRecoilState } from 'recoil'

export default function UserProfilePage() {
	const [user, setUser] = useRecoilState(userState)
	return (
		<main>
			<p>Profile page</p>
            <p>{user?.toString()}</p>
		</main>
	)
}
