<template>
  <div>
    <div v-if="filter.filters" class="filterContainer">
      <div class="filterName">
        <div class="addFilterIcon" @click="editFilter">+</div>

        {{ filter.name }}

        <div class="filterArrow" @click="isOpen(filter.id)">&gt;&gt;</div>
        <div v-if="isEdit" class="editModal">
          <p @click="addFilter(filter.id)">+</p>
          <p @click="deleteFilter(filter.id)">-</p>
          <p>rename</p>
        </div>
      </div>

      <div v-if="filter.isOpen">
        <div :style="{ marginLeft: '20px' }">
          <div v-if="filter.filters">
            <Filters
              v-for="filter in filter.filters"
              :key="filter.id"
              :filter="filter"
              @isOpen="isOpen"
              @addFilter="addFilter"
              @deleteFilter="deleteFilter"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="filterElement">
      <div class="filterName">
        <div class="addFilterIcon" @click="editFilter">+</div>

        {{ filter.name }}

        <div v-if="isEdit" class="editModal">
          <p @click="addFilter(filter.id)">+</p>
          <p @click="deleteFilter(filter.id)">-</p>
          <p>rename</p>
        </div>
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
    data: () => ({
      isEdit: false
    }),
    methods: {
      isOpen(id: number) {
        this.$emit('isOpen', id)
      },
      editFilter(id: number) {
        this.isEdit = !this.isEdit
      },
      addFilter(id: number) {
        this.$emit('addFilter', id)
        this.isEdit = false
      },
      deleteFilter(id: number) {
        this.$emit('deleteFilter', id)
        this.isEdit = false
      }
    }
  })
</script>

<style lang="scss" scoped>
  .filterContainer {
    display: flex;
    z-index: 1;
  }

  .filterName {
    position: relative;
    width: fit-content;
    padding-right: 25px;
    padding-left: 25px;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      color: green;
      margin-left: 2px;

      .addFilterIcon {
        display: block;
      }
    }

    .addFilterIcon {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 26px;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: red;
      }
    }

    .filterArrow {
      font-weight: 800;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: red;
      }
    }
  }

  .filterElement {
    display: flex;
  }

  .editModal {
    display: flex;
    position: absolute;
    top: -30px;
    left: 0;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    height: 40px;
    border: 1px solid gray;
    background-color: white;
    z-index: 10;
    color: black;

    p {
      height: 100%;
      font-size: 28px;
      margin: 0;
      user-select: none;

      &:hover {
        color: red;
      }
    }
  }
</style>
