export function compareISODates(a: string, b: string) {
	return a.split('T')[0] === b.split('T')[0]
}
