import * as React from 'react'
import { Component, SelectField, Stack, EntityListSubTree, useEntityListSubTree, Field, Entity, Box, Button, EntitySubTree, useEntitySubTree, Identity, usePersist } from '@contember/admin'
import { compareISODates } from '../utils/compareISODates'
import './calendarField.css'

type CalendarFieldProps = {
	identity?: Identity
	b2b?: boolean
}

const numberOfDays = 14

export const CalendarField = Component<CalendarFieldProps>(
	({ b2b, identity }) => {
		const entity = identity && useEntitySubTree('me')
		const slots = useEntityListSubTree('slot')
		const persist = usePersist()

		const slotsArray = Array.from(slots)
		const days = Array.from({ length: numberOfDays - 1 })

		return (
			<>
				{b2b && identity && (
					<EntitySubTree entity={`User(email = '${identity.email}')`} alias="me">
						<div className="text">
							<p>Hey <Field field="firstName" />👋 <br />It's great to have you join our club!</p>
							<Field field="welcomeMessage" format={(value) => <p>{value}</p>} />
							<p><b>Book when you want to come:</b></p>
						</div>
					</EntitySubTree>
				)}
				<Stack direction="vertical" gap="large">
					{days.map(
						(_, index) => {
							const today = new Date()
							const theDay = new Date()
							theDay.setDate(today.getDate() + index)

							const slotAccessorMorning = slotsArray.find(slot => slot.getField('type').value === 'morning' && compareISODates(slot.getField<string>('day').value!, theDay.toISOString()))
							const slotAccessorAfternoon = slotsArray.find(slot => slot.getField('type').value === 'afternoon' && compareISODates(slot.getField<string>('day').value!, theDay.toISOString()))

							let isBlocked = false
							let isAvailable = false

							if (!slotAccessorMorning || !slotAccessorAfternoon) return null

							if (b2b && entity) {
								const morningAvailable = slotAccessorMorning.getField('user.email').valueOnServer || !slotAccessorMorning.getEntity('user').idOnServer
								const afternoonAvailable = slotAccessorAfternoon.getField('user.email').valueOnServer || !slotAccessorAfternoon.getEntity('user').idOnServer

								if (morningAvailable && afternoonAvailable) {
									isAvailable = true
									isBlocked = Boolean(slotAccessorMorning.getField('user.email').valueOnServer)
								}

								let button = <div style={{ padding: '10.5px 0' }}>Not available</div>
								if (isAvailable) {
									button = (
										<Button
											intent={isBlocked ? 'danger' : 'success'}
											onClick={() => {
												if (isBlocked) {
													slotAccessorMorning.disconnectEntityAtField('user')
													slotAccessorAfternoon.disconnectEntityAtField('user')
												} else {
													slotAccessorMorning.connectEntityAtField('user', entity)
													slotAccessorAfternoon.connectEntityAtField('user', entity)
												}
												persist()
											}}
										>
											{isBlocked ? 'Cancel' : 'Book'}
										</Button>
									)
								}

								return (
									<Stack direction="horizontal" justify="space-between" key={index}>
										<div>{(Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(theDay))}</div>
										<div>{button}</div>
									</Stack>
								)
							}

							return (
								<Box heading={Intl.DateTimeFormat('us-US', { dateStyle: 'short' }).format(theDay)} key={index}>
									<Stack direction="horizontal" key={index}>
										<Entity accessor={slotAccessorMorning}>
											<div className={slotAccessorMorning?.getEntity('user').existsOnServer ? 'green' : ''}>
												<SelectField field="user" label="Morning slot" placeholder="Free" options="User.firstName" allowNull />
											</div>
										</Entity>
										<Entity accessor={slotAccessorAfternoon}>
											<div className={slotAccessorAfternoon?.getEntity('user').existsOnServer ? 'green' : ''}>
												<SelectField field="user" label="Afternoon slot" placeholder="Free" options="User.firstName" allowNull />
											</div>
										</Entity>
									</Stack>
								</Box>
							)
						})
					}
				</Stack>
			</>
		)
	},
	({ identity }) => (
		<EntityListSubTree
			entities="Slot"
			alias="slot"
			onInitialize={getListAccessor => {
				const days = Array.from({ length: numberOfDays - 1 }, (_, i) => i)
				const slots = getListAccessor()

				Array.from({ length: days.length * 2 }, (_, i) => i).forEach((_, index) => {
					const tempToday = new Date(Date.now())
					const type = index % 2 === 0 ? 'morning' : 'afternoon'
					tempToday.setDate(tempToday.getDate() + Math.floor(index / 2))

					const slotExists = Array.from(slots).find(slot => {
						return slot.getField('type').value === type && compareISODates(slot.getField<string>('day').value!, tempToday.toISOString())
					})

					if (!slotExists) {
						slots.createNewEntity(getAccessor => {
							const slot = getAccessor()
							slot.getField('type').updateValue(type)
							slot.getField('day').updateValue(tempToday.toISOString())
						})
					}
				})
			}}>
			<Field field="day" isNonbearing />
			<Field field="type" isNonbearing />
			<SelectField field="user" label="User" options="User.email" />
			<SelectField field="user" label="User" options="User.firstName" />
			{identity &&
				<EntitySubTree entity={`User(email = '${identity.email}')`} alias="me">
					<Field field="firstName" />
					<Field field="email" />
					<Field field="welcomeMessage" />
					<Field field="id" />
				</EntitySubTree>
			}
		</EntityListSubTree>
	)
)
