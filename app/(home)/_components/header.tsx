import ModeToggle from '@/components/mode-toggle'

export function Header() {
	return (
		<div className='flex w-full items-center space-x-2 justify-between'>
			<p className='text-xl font-bold'>Github Search</p>
			<ModeToggle />
		</div>
	)
}
