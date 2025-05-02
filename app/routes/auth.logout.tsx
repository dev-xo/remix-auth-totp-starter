import type { Route } from './+types/auth.logout'
import { sessionStorage } from '~/lib/auth-session.server'
import { redirect } from 'react-router'

export async function loader({ request }: Route.LoaderArgs) {
	// Get the session.
	const session = await sessionStorage.getSession(request.headers.get('Cookie'))

	// Destroy the session.
	return redirect('/', {
		headers: {
			'Set-Cookie': await sessionStorage.destroySession(session),
		},
	})
}

export default function Logout() {
	return null
}
