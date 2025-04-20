import { Outlet } from 'react-router'
import { Navigation } from '~/components/navigation'
import { Footer } from '~/components/footer'

export default function Layout() {
	return (
		<div className="flex flex-col relative items-center w-full h-full overflow-x-hidden">
			{/* Navigation */}
			<Navigation />

			{/* Outlet */}
			<Outlet />

			{/* Footer */}
			<Footer />
		</div>
	)
}
