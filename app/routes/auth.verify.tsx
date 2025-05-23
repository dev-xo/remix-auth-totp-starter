import type { Route } from './+types/auth.verify'
import { useState } from 'react'
import { redirect, useFetcher } from 'react-router'
import { Cookie } from '@mjackson/headers'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { authenticator } from '~/lib/auth-server'
import { getSession } from '~/lib/auth-session.server'

export async function loader({ request }: Route.LoaderArgs) {
  // Check for existing session.
  const session = await getSession(request.headers.get('Cookie'))
  const user = session.get('user')

  // If the user is already authenticated, redirect to dashboard.
  if (user) return redirect('/profile')

  // Get token from the URL.
  const url = new URL(request.url)
  const token = url.searchParams.get('t')

  // Authenticate the user via magic-link URL.
  if (token) {
    try {
      return await authenticator.authenticate('TOTP', request)
    } catch (error) {
      if (error instanceof Response) return error
      if (error instanceof Error) {
        console.error(error)
        return { authError: error.message }
      }
      return { authError: 'Invalid TOTP' }
    }
  }

  // Get the TOTP cookie and the token from the URL.
  const cookie = new Cookie(request.headers.get('Cookie') || '')
  const totpCookieValue = cookie.get('_totp')

  if (totpCookieValue) {
    const params = new URLSearchParams(totpCookieValue)
    return {
      authEmail: params.get('email'),
      authError: params.get('error'),
    }
  }

  // If the TOTP cookie is not found, redirect to the login page.
  throw redirect('/auth/login')
}

export async function action({ request }: Route.ActionArgs) {
  try {
    return await authenticator.authenticate('TOTP', request)
  } catch (error) {
    if (error instanceof Response) {
      const cookie = new Cookie(error.headers.get('Set-Cookie') || '')
      const totpCookieValue = cookie.get('_totp')

      if (totpCookieValue) {
        const params = new URLSearchParams(totpCookieValue)
        return {
          authEmail: params.get('email'),
          authError: params.get('error'),
        }
      }

      // If no error is found, throw the error.
      throw error
    }

    return { error: 'Invalid TOTP' }
  }
}

export default function Verify({ loaderData }: Route.ComponentProps) {
  const [value, setValue] = useState('')

  const authEmail = 'authEmail' in loaderData ? loaderData.authEmail : undefined
  const authError = 'authError' in loaderData ? loaderData.authError : null

  const fetcher = useFetcher()
  const isSubmitting = fetcher.state !== 'idle' || fetcher.formData != null

  // Either get the error from the fetcher (action) or the loader.
  const errors = fetcher.data?.authError || authError

  return (
    <div className="animate-in fade-in relative flex min-h-[65vh] w-full flex-col items-center justify-center !duration-1000 md:min-h-[calc(100vh-160px)]">
      <div className="relative bottom-12 flex w-full max-w-80 flex-col items-center justify-center gap-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="relative top-4 h-16 w-16 opacity-5"
          viewBox="0 0 24 24"
          fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.9455 3.00001C15.9636 3.00001 15.9817 3.00001 15.9999 3.00001C16.018 3.00001 16.0362 3.00001 16.0543 3.00001C16.4784 2.99992 16.8905 2.99984 17.2304 3.04554C17.6136 3.09706 18.0509 3.22259 18.4141 3.5858C18.7773 3.94902 18.9028 4.38629 18.9544 4.76949C19.0001 5.10941 19 5.52153 18.9999 5.9456C18.9999 5.96372 18.9999 5.98186 18.9999 6.00001V8.00001C18.9999 8.01817 18.9999 8.03631 18.9999 8.05442C19 8.47849 19.0001 8.89062 18.9544 9.23053C18.9028 9.61374 18.7773 10.051 18.4141 10.4142C18.0509 10.7774 17.6136 10.903 17.2304 10.9545C16.8905 11.0002 16.4784 11.0001 16.0543 11C16.0362 11 16.018 11 15.9999 11C15.9817 11 15.9636 11 15.9455 11C15.5214 11.0001 15.1093 11.0002 14.7694 10.9545C14.3862 10.903 13.9489 10.7774 13.5857 10.4142C13.2225 10.051 13.0969 9.61374 13.0454 9.23053C12.9997 8.89062 12.9998 8.47849 12.9999 8.05442C12.9999 8.03631 12.9999 8.01817 12.9999 8.00001V6.00001C12.9999 5.98186 12.9999 5.96372 12.9999 5.94561C12.9998 5.52154 12.9997 5.10941 13.0454 4.76949C13.0969 4.38629 13.2225 3.94902 13.5857 3.5858C13.9489 3.22259 14.3862 3.09706 14.7694 3.04554C15.1093 2.99984 15.5214 2.99992 15.9455 3.00001ZM15.3997 5.00001C15.2113 5.00001 15.1171 5 15.0585 5.05858C14.9999 5.11716 14.9999 5.21139 14.9999 5.39986C14.9999 5.57327 14.9999 5.78553 14.9999 6.00001V8.00001C14.9999 8.21285 14.9999 8.4258 14.9999 8.60016C14.9999 8.78862 14.9999 8.88286 15.0585 8.94144C15.117 9.00001 15.2113 9.00001 15.3998 9.00001C15.6623 9.00001 15.9636 9.00001 15.9999 9.00001C16.2127 9.00001 16.4257 9.00001 16.6 9.00001C16.7885 9.00001 16.8827 9.00001 16.9413 8.94144C16.9999 8.88286 16.9999 8.7886 16.9999 8.60009C16.9999 8.33819 16.9999 8.03759 16.9999 8.00001V6.00001C16.9999 5.78553 16.9999 5.57326 16.9999 5.39984C16.9999 5.21139 16.9999 5.11716 16.9413 5.05858C16.8827 5 16.7885 5.00001 16.6 5.00001C16.4266 5.00001 16.2144 5.00001 15.9999 5.00001C15.7854 5.00001 15.5732 5.00001 15.3997 5.00001Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.94548 3.00001C3.9636 3.00001 3.98174 3.00001 3.99989 3.00001C4.01805 3.00001 4.03618 3.00001 4.0543 3.00001C4.47837 2.99992 4.8905 2.99984 5.23041 3.04554C5.61361 3.09706 6.05089 3.22259 6.41411 3.5858C6.77732 3.94902 6.90284 4.38629 6.95436 4.76949C7.00006 5.10941 6.99998 5.52153 6.9999 5.9456C6.9999 5.96372 6.99989 5.98186 6.99989 6.00001V8.00001C6.99989 8.01817 6.9999 8.03631 6.9999 8.05442C6.99998 8.47849 7.00006 8.89062 6.95436 9.23053C6.90284 9.61374 6.77732 10.051 6.41411 10.4142C6.05089 10.7774 5.61361 10.903 5.23041 10.9545C4.8905 11.0002 4.47837 11.0001 4.0543 11C4.03619 11 4.01805 11 3.99989 11C3.98174 11 3.9636 11 3.94548 11C3.52141 11.0001 3.10929 11.0002 2.76937 10.9545C2.38617 10.903 1.94889 10.7774 1.58568 10.4142C1.22246 10.051 1.09694 9.61374 1.04542 9.23053C0.999721 8.89062 0.999802 8.47849 0.999885 8.05442C0.999889 8.03631 0.999892 8.01817 0.999892 8.00001V6.00001C0.999892 5.98186 0.999889 5.96372 0.999885 5.94561C0.999802 5.52154 0.999721 5.10941 1.04542 4.76949C1.09694 4.38629 1.22246 3.94902 1.58568 3.5858C1.94889 3.22259 2.38617 3.09706 2.76937 3.04554C3.10929 2.99984 3.52141 2.99992 3.94548 3.00001ZM3.39975 5.00001C3.21128 5.00001 3.11705 5 3.05847 5.05858C2.99989 5.11716 2.99989 5.21139 2.99989 5.39986C2.99989 5.57327 2.99989 5.78553 2.99989 6.00001V8.00001C2.99989 8.21285 2.99989 8.4258 2.99989 8.60016C2.99989 8.78862 2.99989 8.88286 3.05847 8.94144C3.11705 9.00001 3.2113 9.00001 3.39981 9.00001C3.66228 9.00001 3.96356 9.00001 3.99989 9.00001C4.21273 9.00001 4.42568 9.00001 4.60004 9.00001C4.7885 9.00001 4.88273 9.00001 4.94131 8.94144C4.99989 8.88286 4.99989 8.7886 4.99989 8.60009C4.99989 8.33819 4.99989 8.03759 4.99989 8.00001V6.00001C4.99989 5.78553 4.99989 5.57326 4.99989 5.39984C4.99988 5.21139 4.99988 5.11716 4.9413 5.05858C4.88272 5 4.78849 5.00001 4.60003 5.00001C4.42662 5.00001 4.21437 5.00001 3.99989 5.00001C3.78542 5.00001 3.57316 5.00001 3.39975 5.00001Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.44548 13C8.4636 13 8.48174 13 8.49989 13C8.51805 13 8.53618 13 8.5543 13C8.97837 12.9999 9.3905 12.9998 9.73041 13.0455C10.1136 13.0971 10.5509 13.2226 10.9141 13.5858C11.2773 13.949 11.4028 14.3863 11.4544 14.7695C11.5001 15.1094 11.5 15.5215 11.4999 15.9456C11.4999 15.9637 11.4999 15.9819 11.4999 16V18C11.4999 18.0182 11.4999 18.0363 11.4999 18.0544C11.5 18.4785 11.5001 18.8906 11.4544 19.2305C11.4028 19.6137 11.2773 20.051 10.9141 20.4142C10.5509 20.7774 10.1136 20.903 9.73041 20.9545C9.3905 21.0002 8.97837 21.0001 8.5543 21C8.53619 21 8.51805 21 8.49989 21C8.48174 21 8.4636 21 8.44548 21C8.02141 21.0001 7.60929 21.0002 7.26937 20.9545C6.88617 20.903 6.44889 20.7774 6.08568 20.4142C5.72246 20.051 5.59694 19.6137 5.54542 19.2305C5.49972 18.8906 5.4998 18.4785 5.49989 18.0544C5.49989 18.0363 5.49989 18.0182 5.49989 18V16C5.49989 15.9819 5.49989 15.9637 5.49989 15.9456C5.4998 15.5215 5.49972 15.1094 5.54542 14.7695C5.59694 14.3863 5.72246 13.949 6.08568 13.5858C6.44889 13.2226 6.88617 13.0971 7.26937 13.0455C7.60929 12.9998 8.02141 12.9999 8.44548 13ZM7.89975 15C7.71128 15 7.61705 15 7.55847 15.0586C7.49989 15.1172 7.49989 15.2114 7.49989 15.3999C7.49989 15.5733 7.49989 15.7855 7.49989 16V18C7.49989 18.2128 7.49989 18.4258 7.49989 18.6002C7.49989 18.7886 7.49989 18.8829 7.55847 18.9414C7.61705 19 7.7113 19 7.89981 19C8.16228 19 8.46356 19 8.49989 19C8.71273 19 8.92568 19 9.10004 19C9.2885 19 9.38273 19 9.44131 18.9414C9.49989 18.8829 9.49989 18.7886 9.49989 18.6001C9.49989 18.3382 9.49989 18.0376 9.49989 18V16C9.49989 15.7855 9.49989 15.5733 9.49989 15.3998C9.49988 15.2114 9.49988 15.1172 9.4413 15.0586C9.38272 15 9.28849 15 9.10003 15C8.92662 15 8.71437 15 8.49989 15C8.28542 15 8.07316 15 7.89975 15Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.4455 13C15.4636 13 15.4817 13 15.4999 13C15.518 13 15.5362 13 15.5543 13C15.9784 12.9999 16.3905 12.9998 16.7304 13.0455C17.1136 13.0971 17.5509 13.2226 17.9141 13.5858C18.2773 13.949 18.4028 14.3863 18.4544 14.7695C18.5001 15.1094 18.5 15.5215 18.4999 15.9456C18.4999 15.9637 18.4999 15.9819 18.4999 16V18C18.4999 18.0182 18.4999 18.0363 18.4999 18.0544C18.5 18.4785 18.5001 18.8906 18.4544 19.2305C18.4028 19.6137 18.2773 20.051 17.9141 20.4142C17.5509 20.7774 17.1136 20.903 16.7304 20.9545C16.3905 21.0002 15.9784 21.0001 15.5543 21C15.5362 21 15.518 21 15.4999 21C15.4817 21 15.4636 21 15.4455 21C15.0214 21.0001 14.6093 21.0002 14.2694 20.9545C13.8862 20.903 13.4489 20.7774 13.0857 20.4142C12.7225 20.051 12.5969 19.6137 12.5454 19.2305C12.4997 18.8906 12.4998 18.4785 12.4999 18.0544C12.4999 18.0363 12.4999 18.0182 12.4999 18V16C12.4999 15.9819 12.4999 15.9637 12.4999 15.9456C12.4998 15.5215 12.4997 15.1094 12.5454 14.7695C12.5969 14.3863 12.7225 13.949 13.0857 13.5858C13.4489 13.2226 13.8862 13.0971 14.2694 13.0455C14.6093 12.9998 15.0214 12.9999 15.4455 13ZM14.8997 15C14.7113 15 14.6171 15 14.5585 15.0586C14.4999 15.1172 14.4999 15.2114 14.4999 15.3999C14.4999 15.5733 14.4999 15.7855 14.4999 16V18C14.4999 18.2128 14.4999 18.4258 14.4999 18.6002C14.4999 18.7886 14.4999 18.8829 14.5585 18.9414C14.617 19 14.7113 19 14.8998 19C15.1623 19 15.4636 19 15.4999 19C15.7127 19 15.9257 19 16.1 19C16.2885 19 16.3827 19 16.4413 18.9414C16.4999 18.8829 16.4999 18.7886 16.4999 18.6001C16.4999 18.3382 16.4999 18.0376 16.4999 18V16C16.4999 15.7855 16.4999 15.5733 16.4999 15.3998C16.4999 15.2114 16.4999 15.1172 16.4413 15.0586C16.3827 15 16.2885 15 16.1 15C15.9266 15 15.7144 15 15.4999 15C15.2854 15 15.0732 15 14.8997 15Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.9718 3.11833C11.297 3.29235 11.5 3.63121 11.5 4V10C11.5 10.5523 11.0523 11 10.5 11C9.9477 11 9.49998 10.5523 9.49998 10V5.86607C9.04701 6.12816 8.46229 5.99623 8.16793 5.5547C7.86158 5.09517 7.98576 4.4743 8.44528 4.16795L9.94528 3.16795C10.2521 2.96338 10.6467 2.94431 10.9718 3.11833Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.97184 13.1183C4.297 13.2923 4.49998 13.6312 4.49998 14V20C4.49998 20.5523 4.05227 21 3.49998 21C2.9477 21 2.49998 20.5523 2.49998 20V15.8661C2.04701 16.1282 1.46229 15.9962 1.16793 15.5547C0.861582 15.0952 0.985755 14.4743 1.44528 14.168L2.94528 13.168C3.25214 12.9634 3.64668 12.9443 3.97184 13.1183Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.4718 3.11833C22.797 3.29235 23 3.63121 23 4V10C23 10.5523 22.5523 11 22 11C21.4477 11 21 10.5523 21 10V5.86607C20.547 6.12816 19.9623 5.99623 19.6679 5.5547C19.3616 5.09517 19.4858 4.4743 19.9453 4.16795L21.4453 3.16795C21.7521 2.96338 22.1467 2.94431 22.4718 3.11833Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.4718 13.1183C22.797 13.2923 23 13.6312 23 14V20C23 20.5523 22.5523 21 22 21C21.4477 21 21 20.5523 21 20V15.8661C20.547 16.1282 19.9623 15.9962 19.6679 15.5547C19.3616 15.0952 19.4858 14.4743 19.9453 14.168L21.4453 13.168C21.7521 12.9634 22.1467 12.9443 22.4718 13.1183Z"
            fill="currentColor"
          />
        </svg>
        <div className="flex w-full flex-col items-center gap-1">
          <h1 className="text-center text-3xl font-semibold">Verify Code</h1>
          <p className="text-center text-base text-neutral-500">
            We've sent you a 6-digit code.
          </p>
        </div>

        {/* Form. */}
        <fetcher.Form method="post" className="w-full space-y-2">
          <Input
            required
            name="code"
            value={value}
            minLength={6}
            maxLength={6}
            onChange={(e) => setValue(e.target.value)}
            disabled={isSubmitting}
            placeholder="Enter the 6-digit code"
            className="h-10"
          />
          <Button
            type="submit"
            variant="secondary"
            size="default"
            className="w-full font-medium"
            disabled={isSubmitting || value.length !== 6}>
            {isSubmitting ? 'Verifying...' : 'Verify Code'}
          </Button>
        </fetcher.Form>

        {/* Error. */}
        {errors && <p className="text-center text-sm text-red-500">{errors}</p>}

        {/* Request New Code. */}
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-center text-sm font-normal text-neutral-500">
            Didn't receive the code?
          </p>
          <fetcher.Form
            method="POST"
            action="/auth/login"
            autoComplete="off"
            className="flex w-full flex-col">
            <Button
              type="submit"
              variant="secondary"
              size="default"
              className="w-full bg-transparent font-medium !shadow-none">
              Request a new code
            </Button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  )
}
