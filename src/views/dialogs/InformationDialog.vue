<template>
	<transition name="modal">
		<div class="modal-mask" v-show="value" @click.self="$emit('input', false)">
			<div class="modal">
				<div class="modal__container">
					<div class="modal__header">
						<button
							class="btn btn-icon-circle flat nb close"
							@click="$emit('input', false)"
							title="Close Share"
						>
							<i class="material-icons">close</i>
						</button>
					</div>
					<div class="modal__body">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat.
						</p>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'information-dialog',
	props: ['value', 'photo'],
	filters: {
		date(d) {
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

			var day = date.getDate()
			var monthIndex = date.getMonth()
			var year = date.getFullYear()

			return `${monthNames[monthIndex]} ${day}, ${year}`
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.modal-mask {
	position: fixed;
	z-index: 99999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: opacity 0.3s ease;
}
.modal {
	&__container {
		width: 450px;
		margin: 0px auto;
		padding: 1.25rem 1.5rem 1.5rem;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		transition: all 0.3s ease;
		position: relative;
	}
	&__header {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.btn {
			color: var(--c-grey5);
			&:hover {
				color: var(--c-grey8);
			}
		}
	}
	&__body {
		p {
			font-size: 1rem;
			line-height: 22px;
			text-align: justify;
		}
	}
}
.date {
	background-color: var(--c-grey1);
	border-radius: 25px;
	padding: 0.5rem 0.75rem;
	font-size: 0.9rem;
}

.close {
	transform: translateY(-0.5rem) translateX(0.5rem) scale(0.9);
}

// transition
.modal-enter {
	opacity: 0;
}
.modal-leave-active {
	opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(0.8);
}
</style>
