<template>
	<transition name="modal">
		<div class="modal-mask" v-if="$shareDialog" @click.self="$shareDialog = false">
			<div class="modal">
				<div class="modal__container">
					<div class="modal__header">
						<h4 v-text="label"></h4>
						<button class="btn btn-icon-circle flat nb" @click="$shareDialog = false" title="Close Share">
							<i class="material-icons">close</i>
						</button>
					</div>
					<div class="modal__body">
						<ul class="modal__share-list">
							<li v-for="(link, i) in shareLinks" :key="i" class="modal__share-list-item"></li>
						</ul>
						<input
							ref="copy"
							class="modal__share_url"
							type="text"
							readonly
							:value="shareLink"
							onclick="this.select()"
							@click="copy"
						/>
						<transition name="popover" mode="out-in">
							<div class="modal__share_url_popover" v-if="copyPopover">
								<i class="material-icons">check</i>
								<span>Copied to clipboard</span>
							</div>
						</transition>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'share-dialog',
	data() {
		return {
			copyPopover: false,
			shareLinks: [
				{
					name: 'Facebook',
				},
				{
					name: 'Twitter',
				},
				{
					name: 'Pintrest',
				},
				{
					name: 'Tumblr',
				},
			],
		}
	},
	computed: {
		shareLink() {
			if (this.$route.params.id) {
				return `nbirus.com/photography/${this.$route.params.id}`
			}
			if (this.$route.query.tag) {
				return `nbirus.com/photography?tag=${this.$route.query.tag}`
			} else {
				return 'nbirus.com/photography'
			}
		},
		label() {
			if (this.$route.params.id) {
				return 'Share Photo'
			}
			if (this.$route.query.tag) {
				return 'Share Photos'
			} else {
				return 'Share Photos'
			}
		},
	},
	methods: {
		copy() {
			document.execCommand('copy')
			this.copyPopover = true
			setTimeout(() => {
				this.copyPopover = false
			}, 4000)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: opacity 0.3s ease;
}

.modal {
	&__container {
		width: 350px;
		margin: 0px auto;
		padding: 1.25rem 1.5rem;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		transition: all 0.3s ease;
		position: relative;
	}
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;

		.btn {
			color: var(--c-grey5);
			&:hover {
				color: var(--c-grey8);
			}
		}
	}
	&__share_url {
		width: 235px;
		text-align: center;
		padding: 0.75rem 2rem;
		font-size: 1rem;
		border-radius: 4px;
		border: solid thin var(--c-border);
		outline: none;
		transition: box-shadow 0.3s ease;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;

		&:focus {
			border: solid thin var(--c-blue);
			@include active-shadow;
		}
		&::selection {
			background: fade-out(#2296f3, 0.75);
		}
	}
	&__share_url_popover {
		position: absolute;
		padding: 0.5rem;
		background-color: var(--c-blue);
		margin-top: 0.5rem;
		left: calc(50% - 100px);
		width: 200px;
		text-align: center;
		border-radius: 25px;
		color: white;
		font-weight: var(--bold);
		font-size: 0.9rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		display: flex;
		align-items: center;

		i {
			margin-right: 0.5rem;
		}
	}
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
	transform: scale(1.1);
}
</style>