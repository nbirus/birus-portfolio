<template>
  <div class="contact page">
    <!-- prettier-ignore -->
    <form class="container" id="contact" ref="form" action method="post" @submit.prevent="onSubmit">
      <!-- name -->
      <fieldset class="input-field mb-3">
        <label class="text" for="name">Name</label>
        <input id="name" type="text" class="sm" v-model="name" tabindex="1" required autofocus />
      </fieldset>

      <!-- email -->
      <fieldset class="input-field mb-3">
        <label class="text" for="email">Email</label>
        <input ref="email" id="email" type="email" class="sm" v-model="email" tabindex="2" required />
      </fieldset>

      <!-- message -->
      <fieldset class="input-field mb-4">
        <label class="text" for="message">Message</label>
        <textarea id="message" class="lg" v-model="message" tabindex="3" required />
      </fieldset>

      <fieldset class="bottom">
        <!-- <recaptcha
          tabindex="4"
          class="recaptcha mb-3"
          :sitekey="capatchKey"
          type="3"
          :loadRecaptchaScript="true"
          @verify="verified = true"
        ></recaptcha>-->
        <button
          class="btn with-icon submit"
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
</template>

<script>
const capatchKey = '6LcV6cwUAAAAAD2GR6ba2LpowuES-TUYve1bbuzy'
export default {
  name: 'contact-page',
  components: {
    recaptcha: () => import('vue-recaptcha'),
  },
  data() {
    return {
      name: '',
      email: '',
      message: '',
      verified: false,
      sending: false,
      capatchKey,
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
          alert('Your message has been sent!  I will get back to you ASAP!')
        })
        .catch(e => {
          alert(e)
        })
        .finally(() => {
          this.sending = false
        })
    },
  },
}
</script>

<style lang="scss">
.contact .container {
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: solid thin red;

  .input-field {
    position: relative;
    min-width: 400px;
    max-width: 100%;
    margin-bottom: 2rem;

    input,
    textarea {
      width: calc(100% - 2rem);
    }
  }
  .bottom {
    display: flex;
  }
  .submit {
    width: 100%;
    justify-content: center;
    position: relative;
    border: solid thin red;
    display: none;

    i {
      margin-right: 0.65rem;
    }
  }
}
#contact-submit {
  img {
    margin-right: 0.5rem;
  }
}
</style>
