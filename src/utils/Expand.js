import screenfull from 'screenfull'

export default function(elem) {
	if (screenfull.isEnabled) {
		screenfull.request(elem)
	}
}
