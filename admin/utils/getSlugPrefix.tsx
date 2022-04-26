import { Environment } from '@contember/admin'


export function getSlugPrefix(environment: Environment, unpersistedHardPrefix?: string) {
	const webUrl = environment.getValue('WEB_URL')
	const prefix = unpersistedHardPrefix || '/'

	return (webUrl ? webUrl + prefix : prefix)
}
