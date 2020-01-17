<template>
	<intersect @enter="show = true">
		<lazy-img v-if="show" v-bind="$attrs" />
	</intersect>
</template>

<script>
import Intersect from 'vue-intersect'
import LazyImg from '@/components/LazyImg'

export default {
	name: 'img-intersect',
	components: { LazyImg, Intersect },
	data() {
		return {
			show: false,
		}
	},
}
</script>
