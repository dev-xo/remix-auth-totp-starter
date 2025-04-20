import { Authenticator } from 'remix-auth'
import { TOTPStrategy } from 'remix-auth-totp'
import { redirect } from 'react-router'
import { getSession, commitSession } from '~/lib/auth-session.server'

/**
 * User type.
 * Usually this would be type of a database model (e.g. schema.User).
 */
type User = {
	email: string
}

/**
 * Authenticator.
 */
export const authenticator = new Authenticator<User>()

/**
 * Authenticate the user using TOTP Strategy.
 */
authenticator.use(
	new TOTPStrategy<User>(
		{
			secret: process.env.TOTP_SECRET || '',
			emailSentRedirect: '/auth/verify',
			magicLinkPath: '/auth/verify',
			successRedirect: '/', // Redirect to /profile, /dashboard, etc.
			failureRedirect: '/auth/verify',
			cookieOptions: {
				// Workaround for Safari not supporting secure cookies on localhost.
				...(process.env.NODE_ENV === 'production' ? { secure: true } : {}),
			},
			sendTOTP: async ({ email, code, magicLink }) => {
				/**
				 * ❗TODO: Implement email sending.
				 * 
				 * This is usually done by a third party service like SendGrid, Mailgun, etc.
				 * For now, we'll just log the email, code, and magic link.
				 * 
				 * An example of sending an email with TOTP code: 
				 * - https://github.com/dev-xo/remix-auth-totp/tree/main/docs
				 * - https://github.com/dev-xo/remix-saas/tree/main/app/modules/email
				 */

				// Send email with TOTP code.
				// await sendAuthEmail({ email, code, magicLink })

				// Log TOTP code in development.
				if (process.env.NODE_ENV === 'development') {
					console.log('--- Auth TOTP (Development) ---')
					console.log({ email, code, magicLink })
					console.log('-------------------------------')
				}
			},
		},
		async ({ email, request }) => {
			const user: Partial<User> = {
				email,
			}

			/**
			 * ❗TODO: Implement user creation / lookup.
			 * 
			 * You can either do the lookup in this function or in the `loader` / `action`
			 * after the session is committed.
			 * 
			 * For simplicity, this example only stores the user in the session.
			 */

			// Store user in session.
			// We will use this same session to find / create user in the database.
			const session = await getSession(request.headers.get('Cookie'))
			session.set('user', user)

			// Commit session.
			const sessionCookie = await commitSession(session)

			// Redirect to your authenticated route.
			throw redirect('/', {
				headers: {
					'Set-Cookie': sessionCookie,
				},
			})
		}
	)
)
