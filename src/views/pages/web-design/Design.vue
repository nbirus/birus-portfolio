<template>
  <div class="design-page page">
    <ul class="design-list">
      <li>
        <a href="https://covidash.com/" target="_blank">
          <div class="design-list__card">
            <div class="design-list__title">
              <h3>Covidash</h3>
              <p>Data analytics dashboard for the COVID-19 pandemic</p>
            </div>
            <div class="design-list__icon"></div>
            <!-- <div class="design-list__img">
              <img src="covid-img.png" height="132" alt />
            </div>-->
          </div>
        </a>
      </li>
      <li>
        <a href="https://covidash.com/" target="_blank">
          <div class="design-list__card">
            <div class="design-list__title">
              <h3>Deep Ocean Commotion</h3>
              <p>A fun game</p>
            </div>
            <div class="design-list__icon"></div>
            <!-- <div class="design-list__img">
              <img src="covid-img.png" height="132" alt />
            </div>-->
          </div>
        </a>
      </li>
      <li>
        <a href="https://github.com/nbirus/portfolio" target="_blank">
          <div class="design-list__card">
            <div class="design-list__title">
              <h3>My Portfolio</h3>
              <p>Take a look at how this portfolio was built</p>
            </div>
            <div class="design-list__icon"></div>
            <!-- <div class="design-list__img">
              <img src="covid-img.png" height="132" alt />
            </div>-->
          </div>
        </a>
      </li>
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
  max-width: 900px;
  margin: 0 auto;
}
.design-list {
  width: 100%;

  li {
    margin-bottom: 1.5rem;
  }
  a {
    text-decoration: none !important;
  }
  &__card {
    padding: 1rem 1rem 1rem 1.5rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease, height 0.2s ease;
    border-radius: var(--r);
    flex-direction: row;
    display: flex;
    align-items: center;
    border: solid thin var(--c-grey1);

    &:hover {
      transform: scale(1.015);
      border-color: var(--c-blue);
      box-shadow: 0 5px 1rem -2px rgba(0, 0, 0, 0.075), 0 4px 10px -2px rgba(0, 0, 0, 0.05);
    }
  }
  &__title {
    flex: 0 1 100%;
    color: #000;

    p {
      margin-top: 0.35rem;
      font-size: 1rem;
    }
  }
  &__icon {
    flex: 0 1 auto;
    width: 80px;
    height: 80px;
    background-color: var(--c-grey1);
    border-radius: 0.5rem;
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
