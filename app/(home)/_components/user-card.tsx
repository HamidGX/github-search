import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Twitter, Link, Building2, MapPin, LucideIcon } from 'lucide-react'
import dateFormat from 'dateformat'

import { GetUserProps } from '@/actions/get-user'

export default function UserCard({
	user,
}: {
	user: GetUserProps | Record<string, never>
}) {
	interface UserInformationProps {
		key: keyof typeof user
		icon: LucideIcon
		// icon: React.FC<React.SVGProps<SVGSVGElement>>
	}

	const IconMap: UserInformationProps[] = [
		{ key: 'twitter_username', icon: Twitter },
		{ key: 'html_url', icon: Link },
		{ key: 'company', icon: Building2 },
		{ key: 'location', icon: MapPin },
	]

	return (
		<Card className='w-full max-w-[700px] h-[500px]'>
			{user?.message || Object.keys(user).length === 0 ? (
				<div className='flex items-center justify-center w-full h-full'>
					<p className='text-center text-xl font-bold text-red-500'>
						User Not Found
					</p>
				</div>
			) : (
				<div>
					<CardHeader className='gap-5'>
						<div className='flex gap-4'>
							<Avatar className='h-20 w-20'>
								<AvatarImage src={user.avatar_url} alt='@shadcn' />
								<AvatarFallback>Photo</AvatarFallback>
							</Avatar>
							<div className='flex flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row'>
								<div>
									<h1>{user.name || 'Not Available'}</h1>
									<p className='text-blue-500 hover:underline text-sm transition-all'>
										{user.login || 'Not Available'}
									</p>
								</div>
								<p>
									<span>Joined </span>
									<span>
										{user?.created_at
											? dateFormat(user.created_at, 'dd mm yyyy')
											: 'Not available'}
									</span>
								</p>
							</div>
						</div>
						<CardDescription>{user.bio || 'No bio available'}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px]'>
							<div className='flex flex-col items-center gap-2'>
								<p className='text-xs opacity-60'>Repos</p>
								<p>{user.public_repos || 'Not Available'}</p>
							</div>
							<div className='flex flex-col items-center gap-2'>
								<p className='text-xs opacity-60'>Gist</p>
								<p>{user.public_gists || 0}</p>
							</div>
							<div className='flex flex-col items-center gap-2'>
								<p className='text-xs opacity-60'>Followers</p>
								<p>{user.followers || 'Not Available'}</p>
							</div>
						</div>
					</CardContent>
					<div className='p-6 pt-0'>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							{IconMap.map((info) => {
								const value = user[info.key]
								return (
									<div key={info.key} className='flex items-center gap-2'>
										<info.icon className='mr-1' />
										<span className='text-sm text-clip'>
											{value || 'Not Available'}
										</span>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			)}
		</Card>
	)
}
