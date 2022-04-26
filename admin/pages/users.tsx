import * as React from 'react'
import { Field, MultiEditPage, RadioField, Stack, StaticRender, TextareaField, TextField } from '@contember/admin'
import { useInviteOrUpadateUsers } from '../hooks/useInviteUser'

export default () => {
	const inviteUsers = useInviteOrUpadateUsers()

	return (
		<MultiEditPage entities="User" onBeforePersist={inviteUsers} orderBy="email">
			<Stack direction="horizontal">
				<TextField field="firstName" label="First name" />
				<TextField field="lastName" label="Last name" />
			</Stack>
			<TextField field="email" label="E-mail" />
			<TextareaField field="welcomeMessage" label="Welcome message" />
			<RadioField
				field="role"
				label="Role"
				orientation="horizontal"
				defaultValue="user"
				options={[{ value: 'user', label: 'User' }, { value: 'b2b', label: 'B2B' }, { value: 'admin', label: 'Admin' }]}
			/>
			<StaticRender>
				<Field field="identityId" />
			</StaticRender>
		</MultiEditPage>
	)
}
