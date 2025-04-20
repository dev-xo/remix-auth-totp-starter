import {
	type RouteConfig,
	index,
	layout,
	route,
} from '@react-router/dev/routes'

export default [
	layout('./routes/layout.tsx', [
		index('routes/home.tsx'),
		route('auth/login', './routes/auth.login.tsx'),
		route('auth/logout', './routes/auth.logout.tsx'),
		route('auth/verify', './routes/auth.verify.tsx'),
	]),
] satisfies RouteConfig
