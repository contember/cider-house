import { useProjectSlug, useShowToast, EntityAccessor, EntityListAccessor } from '@contember/admin'
import { useCallback } from 'react'
import { useInvite } from './useInvite'
import { useUpdate } from './useUpdate'

async function asyncIdentitiesCheck(array: EntityAccessor[], callback: (item: EntityAccessor, index: number, array: EntityAccessor[]) => Promise<void>) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}

export const useInviteOrUpadateUsers = () => {
	const invite = useInvite()
	const project = useProjectSlug()
	const toast = useShowToast()
	const update = useUpdate()

	return useCallback(async (getAccessorList: () => EntityListAccessor) => {
		const accessorList = getAccessorList()
		await asyncIdentitiesCheck(Array.from(accessorList), async (accessor) => {
			const identityId = accessor.getField('identityId')
			const role = accessor.getField<string>('role').value
			if (!role) {
				return
			}

			if (identityId.value) {
				const identityIdValue = identityId.value as string
				const role = accessor.getField<string>('role').value

				const result = await update({
					identityId: identityIdValue,
					projectSlug: project!,
					memberships: [{ role: role!, variables: [] }]
				})
				if (!result.ok) {
					toast({
						message: `Nepovedlo se upravit osobu: ${result.error.developerMessage}`,
						dismiss: true,
						type: 'error',
					})
					return
				}

				return
			}

			const result = await invite({
				email: String(accessor.getField('email').value),
				projectSlug: project!,
				memberships: [{ role, variables: [] }]
			})

			if (!result.ok) {
				toast({
					message: `There was any error to invite user: ${result.error.developerMessage}`,
					dismiss: true,
					type: 'error',
				})
				return
			}

			identityId.updateValue(result.result.person.identity.id)
		})
	}, [])
}

export const useInviteUser = () => {
	const invite = useInvite()
	const project = useProjectSlug()
	const toast = useShowToast()

	return useCallback(async (getAccessor: () => EntityAccessor) => {
		const accessor = getAccessor()
		const identityId = accessor.getField('identityId')
		const role = accessor.getField<string>('role').value
		if (!role) {
			return
		}

		const result = await invite({
			email: String(accessor.getField('email').value),
			projectSlug: project!,
			memberships: [{ role, variables: [] }]
		})

		if (!result.ok) {
			toast({
				message: `There was any error to invite user: ${result.error.developerMessage}`,
				dismiss: true,
				type: 'error',
			})
			return
		}

		identityId.updateValue(result.result.person.identity.id)
	}, [])
}
