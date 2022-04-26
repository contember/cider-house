import { DataBindingProvider, FeedbackRenderer, PersistButton, LayoutPage } from '@contember/admin'
import * as React from 'react'
import { CalendarField } from '../components/CalendarField'

export default () => (
	<DataBindingProvider stateComponent={FeedbackRenderer} refreshOnPersist>
		<LayoutPage title="Reservation planner" actions={<PersistButton />}>
			<CalendarField />
		</LayoutPage>
	</DataBindingProvider>
)
