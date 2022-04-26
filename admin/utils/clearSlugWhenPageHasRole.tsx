import { EntityAccessor } from '@contember/admin'


export function clearSlugWhenPageHasRole(getEntityAccessor: EntityAccessor.GetEntityAccessor) {
	const entity = getEntityAccessor()
	if (entity.getField('role').value !== null) {
		entity.getField('slug').updateValue(null)
	}
}
