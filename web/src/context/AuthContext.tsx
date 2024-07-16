'use client'
import { createContext, useEffect, ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import axiosInstance from '../utils/axiosInstance'
import { useRouter } from 'next/navigation'
import { userState, tokenState } from '../state/authState'

interface RegisterData {
	name: string
	email: string
	password: string
	role: string
	city: string
}

interface LoginData {
	email: string
	password: string
}

interface AuthContextProps {
	register: (registerData: RegisterData) => Promise<void>
	login: (loginData: LoginData) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter()
	const [user, setUser] = useRecoilState(userState)
	const [token, setToken] = useRecoilState(tokenState)

	useEffect(() => {
		const savedToken = localStorage.getItem('token')
		if (savedToken) {
			setToken(savedToken)
			axiosInstance.defaults.headers.common[
				'Authorization'
			] = `Bearer ${savedToken}`
			getUserProfile()
		}
	}, [setToken])

	const register = async (registerData: RegisterData) => {
		try {
			const response = await axiosInstance.post(
				'/auth/register',
				registerData
			)
			alert(response.data.message || 'Registered successfully!')
			router.push('/login')
		} catch (error: any) {
			console.error('Registration failed:', error.response?.data)
			alert('Something went wrong!')
		}
	}

	const login = async (loginData: LoginData) => {
		try {
			const response = await axiosInstance.post('/auth/login', loginData)
			const { token, refreshToken } = response.data
			setToken(token)
			localStorage.setItem('token', token)
			localStorage.setItem('refreshToken', refreshToken)
			axiosInstance.defaults.headers.common[
				'Authorization'
			] = `Bearer ${token}`
			// await getUserProfile()
			router.push('/')
		} catch (error: any) {
			console.error('Login failed:', error.response?.data)
			alert('Something went wrong!')
		}
	}

	const logout = () => {
		try {
			localStorage.removeItem("token")
			localStorage.removeItem("refreshToken")
			router.push("/")
		} catch (error:any) {
			console.log("Token deletion failed")
		}
	}

	const getUserProfile = async () => {
		try {
			const response = await axiosInstance.get('/adminuser/get-profile')
			setUser(response.data.users)
		} catch (error: any) {
			console.error('Fetching user profile failed:', error.response?.data)
		}
	}

	return (
		<AuthContext.Provider value={{ register, login }}>
			{children}
		</AuthContext.Provider>
	)
}
