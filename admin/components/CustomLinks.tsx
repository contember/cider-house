import * as React from 'react'
import { Box, Button, Component, Dropdown, EditorRenderElementProps, EditorTransforms, Icon, InitializeReferenceContentProps, Stack, useEditor } from '@contember/admin'
import { LinkField } from './LinkField'
import './customLinks.css'

export const InsertLink = Component<InitializeReferenceContentProps>(
	({ onSuccess, onCancel }) => (
		<Stack direction="vertical">
			<LinkField field="target" />
			<Stack direction="horizontal" justify="space-between">
				<Button onClick={onCancel}>Cancel</Button>
				<Button intent="primary" onClick={() => onSuccess({ createElement: { type: 'link' } })}>Insert</Button>
			</Stack>
		</Stack>
	),
	() => <LinkField field="target" />,
)


export const LinkElement = (props: EditorRenderElementProps) => {
	const editor = useEditor()
	return (
		<span {...props.attributes} className="link-element-wrapper">
			{props.children}
			<span contentEditable={false}>
				<Dropdown
					renderToggle={({ ref, onClick }) => (
						<button ref={ref as any} onClick={onClick} className="editorButton">
							<Icon blueprintIcon="link" />
						</button>
					)}
				>
					<Box>
						<LinkField field="target" />
						<Button
							size="small"
							onClick={() => EditorTransforms.unwrapNodes(editor, { at: [], match: node => node === props.element })}
						>
							Remove link
						</Button>
					</Box>
				</Dropdown>
			</span>
		</span>
	)
}
