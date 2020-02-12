<script>
export default {
	data() {
		return {
			width$: 0,
		}
	},
	mounted() {
		this.$nextTick(() => {
			window.addEventListener('resize', this.onResize)
			this.onResize()
		})
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize)
	},
	methods: {
		onResize() {
			this.width$ = window.innerWidth
		},
	},
}
</script>