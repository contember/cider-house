import { SchemaDefinition as def } from '@contember/schema-definition'
import { Page } from './Page'

export const LinkEnum = def.createEnum('url', 'article', 'page')

export class Link {
	type = def.enumColumn(LinkEnum).notNull()
	url = def.stringColumn()
	page = def.manyHasOne(Page, 'linkedFrom').setNullOnDelete()
}
