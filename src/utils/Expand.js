import screenfull from 'screenfull'

export function expand(elem) {
	if (screenfull.isEnabled) {
		screenfull.request(elem)
	}
}
export function close() {
	screenfull.exit()
}
