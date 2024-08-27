export interface GetUserProps {
	avatar_url: string
	bio: string
	blog: string
	company: null | string
	created_at: string
	email: null | string
	events_url: string
	followers: number
	followers_url: string
	following: number
	following_url: string
	gists_url: string
	gravatar_id: string
	hireable: boolean
	html_url: string
	id: number
	location: string
	login: string
	name: string
	node_id: string
	organizations_url: string
	public_gists: number
	public_repos: number
	received_events_url: string
	repos_url: string
	site_admin: boolean
	starred_url: string
	subscriptions_url: string
	twitter_username: null | string
	type: string
	updated_at: string
	url: string
	documentation_url: string
	message: string
}

export default async function GetUser(
	username: string
): Promise<GetUserProps | Record<string, never>> {
	try {
		const response = await fetch(`https://api.github.com/users/${username}`)
		const data = await response.json()
		return data
	} catch (error) {
		console.log('[GET_USER]')
		return {}
		// throw Error
	}
}
