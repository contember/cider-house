import { SchemaDefinition as def } from '@contember/schema-definition'
import { User } from './User'

def.Unique('day', 'type')
export class Slot {
	day = def.dateColumn().notNull()
	type = def.enumColumn(def.createEnum('morning', 'afternoon')).notNull()
	user = def.manyHasOne(User, 'slots').setNullOnDelete()
}


