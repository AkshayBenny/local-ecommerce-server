'use client'

import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../state/authState'
import { useRouter } from 'next/navigation'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useRecoilValue(userState)
	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push('/login')
		}
	}, [user])

	if (!user) {
		return null // or loading spinner, etc.
	}

	return <>{children}</>
}

export default PrivateRoute
