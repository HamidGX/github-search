import { Header } from './_components/header'
import { InputSearch } from './_components/input-search'

export default async function HomePage() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between pt-0 md:pt-24 w-full'>
			<div className='mx-auto flex w-full max-w-[700px] flex-col gap-8 rounded p-2'>
				<Header />
				<InputSearch />
			</div>
		</main>
	)
}
