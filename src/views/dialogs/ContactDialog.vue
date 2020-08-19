<template>
  <transition name="modal">
    <div class="modal-mask" v-show="$contactDialog" @click.self="$contactDialog = false">
      <transition name="popover" mode="out-in">
        <div class="modal">
          <div class="modal__container">
            <div class="modal__header">
              <h4 class="text">Contact Me</h4>
              <button class="btn btn-icon-circle flat nb close" @click="$contactDialog = false" title="Close Share">
                <i class="material-icons">close</i>
              </button>
            </div>
            <div class="modal__body">
              <!-- prettier-ignore -->
              <form
                class="container"
                id="contact"
                ref="form"
                action
                method="post"
                @submit.prevent="onSubmit"
              >
                <!-- name -->
                <fieldset class="input-field mb-3">
                  <label class="text" for="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    class="sm"
                    v-model="name"
                    tabindex="1"
                    required
                    autofocus
                  />
                </fieldset>

                <!-- email -->
                <fieldset class="input-field mb-3">
                  <label class="text" for="email">Email</label>
                  <input
                    ref="email"
                    id="email"
                    type="email"
                    class="sm"
                    v-model="email"
                    tabindex="2"
                    required
                  />
                </fieldset>

                <!-- message -->
                <fieldset class="input-field mb-4">
                  <label class="text" for="message">Message</label>
                  <textarea id="message" class="lg" v-model="message" tabindex="3" required />
                </fieldset>

                <fieldset class="bottom">
                  <button
                    class="btn btn-primary with-icon submit"
                    tabindex="5"
                    :disabled="sending"
                    :class="{disabled: sending}"
                    id="contact-submit"
                    name="submit"
                    type="submit"
                  >
                    <i class="material-icons">mail_outline</i>
                    <span>{{!sending ? 'Send Message' : 'Sending message...'}}</span>
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'share-dialog',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      verified: false,
      sending: false,
    }
  },
  mounted() {
    this.$refs.email.onblur = () => {
      this.$refs.form.reportValidity()
    }
  },
  methods: {
    onSubmit() {
      this.sending = true
      fetch('https://nbirus-portfolio-api.herokuapp.com/', {
        method: 'post',
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          message: this.message,
        }),
      })
        .then(response => {
          return response.json()
        })
        .then(() => {
          alert('Your message has been sent!  I will get back to you ASAP')
        })
        .catch(e => {
          alert(e)
        })
        .finally(() => {
          this.sending = false
          this.$contactDialog = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.modal {
  &__container {
    width: 400px;
    padding: 2rem;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .btn {
      color: var(--c-grey5);

      &:hover {
        color: var(--c-grey8);
      }
    }
  }
  input,
  textarea {
    width: calc(100% - 2rem);
  }
}
.close {
  transform: translateY(-0.9rem) translateX(1.15rem) scale(0.9);
}
.contact .container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;

  .input-field {
    position: relative;
    margin-bottom: 2rem;
  }
  .bottom {
    display: flex;
  }
  .submit {
    width: 100%;
    justify-content: center;
    position: relative;

    i {
      margin-right: 0.65rem;
    }
  }
}
#contact-submit {
  width: calc(100% - 0.5rem);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 0.5rem;
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
  transform: scale(0.8);
}
</style>
