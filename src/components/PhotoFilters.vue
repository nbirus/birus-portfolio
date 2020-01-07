<template>
  <div>
    <hr class="mb-5">
      <div class="photo-filters">
      <span class="text-secondary">Filter photos</span>

      <div role="group" aria-labelledby="id-group-label">
        <ul class="checkboxes">
          <li v-for="filter in filters" :key="filter">
            <div 
              class="checkbox text" 
              :class="{active: activeFilters.some(f => f === filter)}"
              role="checkbox"
              :aria-checked="activeFilters.some(f => f === filter) ? 'true' : 'false'"
              tabindex="0"
              v-text="filter"
              @click="toggle(filter)"
              @keydown.space.prevent="toggle(filter)"
            ></div>
          </li>
        </ul>
      </div>
    

    </div>
  </div>
</template>

<script>
export default {
  name: 'photo-filters',
  data() {
    return {
      filters: [
        'Croatia',
        'Japan',
        'Landscape',
        'City',
        'Patagonia',
      ],
      activeFilters: [],
    }
  },
  methods: {
    toggle(name) {
      if (this.activeFilters.some(f => f === name)) {
        const index = this.activeFilters.indexOf(name);
        if (index > -1) {
          this.activeFilters.splice(index, 1);
        }
      }
      else {
        this.activeFilters.push(name)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-filters {
  padding: 0; 

  span {
    font-weight: var(--bold);
    font-size: .95rem;
    text-transform: uppercase!important;
  }
  ul {
    margin: 1.5rem 0 0; padding: 0;
  }
  li {
    height: 50px;
    margin-bottom: .5rem;
  }
  .checkbox {
    width: 100%;
    height: 100%;
    padding: 0 2rem;
    padding: 0 2.25rem;
    text-transform: uppercase;
    font-size: .95rem;

    cursor: pointer;
    border: solid thin var(--c-border);
    display: flex;
    align-items: center;
    
    &:before, &:after {
      margin-left: .75rem;
    }
    &:hover {
      border: solid thin var(--c-blue);
      background-color: var(--c-grey1);
    }
    &:focus {
      box-shadow: 0 0 0 .1rem lighten(#2296f3, 5);
    }
    &.active {
      border: solid thin var(--c-blue);

      font-weight: var(--bold)
    }
  }
}
</style>