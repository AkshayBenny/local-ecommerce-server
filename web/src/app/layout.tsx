'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { RecoilRoot } from 'recoil'
import { AuthProvider } from '@/context/AuthContext'
import NavBar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<title>LocalShopper</title>
			</head>
			<body className={inter.className}>
				<RecoilRoot>
					<AuthProvider>
						<NavBar />
						{children}
					</AuthProvider>
				</RecoilRoot>
			</body>
		</html>
	)
}
