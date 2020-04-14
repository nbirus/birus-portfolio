<template>
  <div class="design-page page">
    <ul class="design-list">
      <a href="https://covidash.com/" target="_blank">
        <div class="design-list__card">
          <div class="design-list__title">
            <h3>Covidash</h3>
            <p>Data analytics dashboard for the COVID-19 pandemic</p>
          </div>
          <div class="design-list__img">
            <img src="covid-img.png" height="132" alt />
          </div>
        </div>
      </a>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'design',
}
</script>

<style lang="scss" scoped>
.design-page {
  min-height: 90vh;
}
.design-list {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  a {
    text-decoration: none !important;
  }
  &__card {
    padding: 2rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease, height 0.2s ease;
    border-radius: var(--r);

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 35px -2px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.1) !important;
    }
  }
  &__title {
    h3 {
    }

    color: #000;
    p {
      margin-top: 0.5rem;
    }
  }
  &__img {
    position: absolute;
    top: 0;

    bottom: 0;
    right: 0;
    z-index: 1;

    pointer-events: none;

    position: none;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
}
</style>
