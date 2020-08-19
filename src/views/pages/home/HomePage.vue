<template>
  <div class="home-page page">
    <div class="header">
      <div class="contain">
        <div class="header__id">
          <h1 class="text mb-4">Nathan Birus</h1>
          <div class="text block-seperator mb-4"></div>
          <h4 class="text thin">web developer</h4>
        </div>
        <div class="header__img"></div>
      </div>
    </div>
    <div class="body"></div>
    <div class="about-container max-char">
      <!-- <h6 class="italic mb-2">About me</h6> -->
      <!-- eslint-disable-next-line -->
      <!-- <p>
				I am a passionate website designer/engineer with 3+ years of experience building enterprise
				level applications. I involve myself in all areas of front-end development including
				mockups, designs, selecting technologies, CI, implementation, and engineering the final
				product.
      </p>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-page',
}
</script>

<style lang="scss" scoped>
.home-page {
  padding: 0;
}

.contain {
  min-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header {
  display: flex;
  align-items: center;
  min-height: 400px;
  background-color: var(--c-grey1);

  h1 {
    font-size: 4rem;
    font-family: 'Permanent Marker', cursive;
  }
}
</style>