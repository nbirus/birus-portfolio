<script>
export default {
	data() {
		return {
			scroll$: 0,
		}
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener('scroll', this.onScroll)
			this.onScroll()
		})
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll)
	},
	methods: {
		onScroll() {
			this.scroll$ = window.pageYOffset || document.documentElement.scrollTop
		},
	},
}
</script>