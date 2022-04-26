import { EditorTransforms, EditorWithBlocks, EntityAccessor } from '@contember/admin'

type withAnchorsAsReferenceProps = {
	elementType: string
	updateReference: (url: string, getAccessor: () => EntityAccessor) => void
	referenceType?: string
}

export const withAnchorsAsReference = (editor: EditorWithBlocks, { elementType, referenceType = elementType, updateReference }: withAnchorsAsReferenceProps) => {
	const { normalizeNode } = editor
	editor.normalizeNode = ([element, path]) => {
		if ('type' in element && element.type === 'anchor' && 'href' in element && typeof element.href === 'string') {
			const referenceId = editor.createElementReference(
				path,
				referenceType,
				getAccessor => updateReference(element.href as string, getAccessor),
			).id

			return EditorTransforms.setNodes(editor, { referenceId, href: null, type: elementType }, { at: path })
		}
		normalizeNode([element, path])
	}
}
