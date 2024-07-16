'use client'

import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../state/authState'
import Router from 'next/router'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useRecoilValue(userState)

	useEffect(() => {
		if (!user) {
			Router.push('/login')
		}
	}, [user])

	if (!user) {
		return null // or loading spinner, etc.
	}

	return <>{children}</>
}

export default PrivateRoute
