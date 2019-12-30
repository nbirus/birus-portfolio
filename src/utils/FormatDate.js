export default function(d) {
	let date = new Date(d)
	let monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	let day = date.getDate()
	let monthIndex = date.getMonth()
	let year = date.getFullYear()

	return `${monthNames[monthIndex]} ${day}, ${year}`
}
