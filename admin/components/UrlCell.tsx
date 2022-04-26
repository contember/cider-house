import { Component, Scalar, StaticRender, TextCell, useEnvironment } from '@contember/admin'
import * as React from 'react'

export type UrlCellProps = {
	field: string,
	prefix?: string,
	header?: string,
}

type UrlCellFromatProps = {
	value: Scalar,
	prefix?: string,
}

const UrlCellFormat = ({ value, prefix }: UrlCellFromatProps) => {
	const webUrl = useEnvironment().getValue('WEB_URL')
	const url = prefix ? `${webUrl}/${prefix}/${value}` : `${webUrl}/${value}`

	return (
		<a href={url} target="_blank">{url}</a>
	)
}

export const UrlCell = Component<UrlCellProps>(
	({ field, prefix, header }) => {
		return (
			<TextCell
				field={field}
				header={header}
				format={(value) => <UrlCellFormat value={value} prefix={prefix} />}
			/>
		)
	},
	'UrlCell',
)
