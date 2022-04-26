import { SchemaDefinition as def } from '@contember/schema-definition'
import { Slot } from './Slot'

export class User {
	email = def.stringColumn().notNull().unique()
	identityId = def.stringColumn().notNull().unique()
	firstName = def.stringColumn().notNull()
	lastName = def.stringColumn().notNull()
	welcomeMessage = def.stringColumn()
	role = def.enumColumn(def.createEnum('admin', 'b2b', 'user')).notNull().default('user')
	slots = def.oneHasMany(Slot, 'user').orderBy('day')
}
