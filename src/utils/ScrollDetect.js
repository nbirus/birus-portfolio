export default function(cb) {
	// eslint-disable-next-line
	window.onscroll = function(e) {
		if (this.oldScroll > this.scrollY) {
			cb()
		}
		this.oldScroll = this.scrollY
	}
}
