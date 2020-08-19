<template>
  <transition name="modal">
    <div class="modal-mask" v-show="value" @click.self="$emit('input', false)">
      <div class="modal">
        <div class="modal__container">
          <div class="modal__header">
            <button class="btn btn-icon-circle flat nb close" @click="$emit('input', false)" title="Close Share">
              <i class="material-icons">close</i>
            </button>
          </div>
          <div class="modal__body">
            <!-- <div class="info__description">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
								ea commodo consequat.
							</p>
						</div>-->
            <div class="info__date-location">
              <div class="info__date-location-group">
                <i class="material-icons">access_time</i>
                <span>{{ photo.date | date }}</span>
              </div>
              <div class="info__date-location-group">
                <i class="material-icons">location_on</i>
                <span>{{ photo.position }}</span>
              </div>
            </div>
            <div class="info__tags">
              <ul>
                <li v-for="(tag, i) in photo.tags" :key="i" v-text="tag"></li>
              </ul>
            </div>
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
      let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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

.modal {
  &__container {
    width: 450px;
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
.info {
  &__description {
    margin-bottom: 1.5rem;
    padding-top: 0.25rem;
  }
  &__date-location {
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
    border-top: solid thin var(--c-border-light);
  }
  &__date-location-group {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    text-transform: uppercase;

    i {
      margin-right: 0.75rem;
      font-size: 1.25rem;
    }
    &:first-child {
      margin-right: 3rem;
    }
  }
  &__tags {
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
    }
    li {
      display: block;
      padding: 0;
      background-color: var(--c-grey1);
      border-radius: 25px;
      padding: 0.5rem 0.75rem;
      font-size: 0.9rem;
      margin-right: 0.5rem;
    }
  }
}

.close {
  transform: translateY(-0.5rem) translateX(0.5rem) scale(0.9);
}

@media only screen and (max-width: 768px) {
  .modal {
    &__container {
      width: 100%;
    }
  }
  .info {
    &__date-location {
      flex-direction: column;
      align-items: flex-start;
    }
    &__date-location-group:first-child {
      margin-right: 0;
      margin-bottom: 1rem;
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
  transform: scale(0.8);
}
</style>
