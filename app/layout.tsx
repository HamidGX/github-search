import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/providers/theme-provider'

const space_mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
	title: 'Gihub Search',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={space_mono.className} suppressHydrationWarning={true}>
				<ThemeProvider attribute='class' defaultTheme='dark'>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
