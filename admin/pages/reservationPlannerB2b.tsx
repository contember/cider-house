import { DataBindingProvider, FeedbackRenderer, PersistButton, LayoutPage, useIdentity } from '@contember/admin'
import * as React from 'react'
import { CalendarField } from '../components/CalendarField'
import AppleLogo from '../static/apple.svg'

export default () => {
	const identity = useIdentity()

	return (
		<DataBindingProvider stateComponent={FeedbackRenderer} refreshOnPersist>
			<style>{`.cui-layout-chrome-bar {display : none } .cui-titleBar {max-width : 100% }`}</style>
			<div className="cui-theme">
				<LayoutPage title={<><img src={AppleLogo} style={{height: '1.3em', margin: '0 auto', display: 'block'}} /></>} >
					<CalendarField b2b identity={identity} />
				</LayoutPage>
			</div>
		</DataBindingProvider>
	)
}
