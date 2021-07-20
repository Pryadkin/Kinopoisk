<template>
  <div>
    <div v-if="filter.filters">
      <div class="filterContainer">
        <div
          class="filterName"
          @click="
            changeNest({ id: filter.id, name: filter.name, path: filter.path })
          "
        >
          {{ filter.name }}
        </div>

        <div class="filterArrow" @click="isOpen(filter.id)">&gt;&gt;</div>

        <div v-if="filter.isOpen">
          <div :style="{ marginLeft: '20px' }">
            <div v-if="filter.filters">
              <Filters
                v-for="filter in filter.filters"
                :key="filter.id"
                :filter="filter"
                @changeNest="changeNest"
                @isOpen="isOpen"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="filterName"
        @click="
          changeNest({ id: filter.id, name: filter.name, path: filter.path })
        "
      >
        {{ filter.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Filters',
    props: {
      filter: Object
    },
    methods: {
      changeNest(filter: { id: number; name: string; path: string }) {
        this.$emit('changeNest', filter)
      },
      isOpen(id: number) {
        this.$emit('isOpen', id)
      }
    },
    mounted() {
      console.log(this.filter)
    }
  })
</script>

<style lang="scss" scoped>
  .filterContainer {
    display: flex;
  }

  .filterName {
    width: fit-content;
    padding-right: 10px;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      color: green;
      margin-left: 2px;
    }
  }

  .filterArrow {
    font-weight: 800;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
</style>
