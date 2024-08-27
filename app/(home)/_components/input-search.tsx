'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import GetUser, { GetUserProps } from '@/actions/get-user'

import UserCard from './user-card'

const formSchema = z.object({
	username: z.string().min(5, {
		message: 'Username must be at least 5 characters.',
	}),
})

export function InputSearch() {
	const [userData, setUserData] = useState<GetUserProps | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: 'Vercel',
		},
	})

	const loadDefaultUser = useCallback(async () => {
		setIsLoading(true)
		try {
			const data = await GetUser(form.getValues('username'))
			setUserData(data as GetUserProps)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [form])

	useEffect(() => {
		loadDefaultUser()
	}, [loadDefaultUser])

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			const data = await GetUser(values.username)
			setUserData(data as GetUserProps)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex w-full items-center space-x-2'>
					<div className='flex w-full'>
						<Input
							placeholder='Write your username'
							{...form.register('username')}
						/>
					</div>
					<Button
						className='flex items-center'
						type='submit'
						disabled={isLoading}
					>
						Search
					</Button>
				</div>
				<p className='text-red-500 pt-2 text-sm'>
					{form.formState.errors.username?.message}
				</p>
			</form>

			<section className='flex flex-col gap-6'>
				{isLoading ? (
					<div className='flex justify-center items-center w-full h-full'>
						<Loader2 className='w-12 h-12 animate-spin' />
					</div>
				) : (
					userData && (
						<div>
							<UserCard user={userData} />
						</div>
					)
				)}
			</section>
		</>
	)
}
