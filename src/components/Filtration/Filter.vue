<template>
  <li :key="model.id">
    <div class="tree" :class="{ isFolder: isFolder }">
      <div class="filterName" v-show="!isInput && isEdit" @dblclick="openInput">
        {{ model.name }} &nbsp;
      </div>

      <div
        class="filterName"
        v-show="!isInput && !isEdit"
        @click="addToMovie(model)"
      >
        {{ model.name }} &nbsp;
      </div>

      <a-form v-show="isInput" class="inputBlock">
        <a-input
          size="small"
          v-model="inputName"
          ref="inputRef"
          @keydown.enter="renameFilter"
        />
        <a-button type="primary" size="small" @click="renameFilter">
          rename
        </a-button>
      </a-form>

      <a-button type="primary" size="small" v-if="isFolder" @click="toggle">
        {{ open ? '-' : '+' }}
      </a-button>

      <a-radio-group size="small" v-if="isEdit">
        <a-radio-button v-if="!isFolder" @click="addChild">
          add
        </a-radio-button>
        <a-radio-button v-if="!isFolder" @click="delChild">
          del
        </a-radio-button>
      </a-radio-group>
    </div>

    <ul class="subFolder" v-show="open" v-if="isFolder">
      <Tree
        class="item"
        v-for="model in updateModel"
        :key="model.id"
        :model="model"
        :isEdit="isEdit"
      />

      <li class="add" :key="model.id" v-if="isEdit">
        <a-button size="small" @click="addChild">add Item</a-button>
      </li>
    </ul>
  </li>
</template>

<script>
  import { copyByJson } from '../../common/utils'
  import { updateFilterPath } from './func'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Tree',
    props: {
      model: Object,
      isEdit: Boolean
    },
    data() {
      return {
        open: false,
        isInput: false,
        inputName: ''
      }
    },
    computed: {
      ...mapGetters(['filterableMovie']),
      isFolder() {
        return this.model.children?.length
      },
      updateModel() {
        return this.model.children
      }
    },
    methods: {
      ...mapActions(['setFilterableMovie']),
      toggle() {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      addChild() {
        const newElem = {
          id: Math.trunc(Math.random() * 10e5),
          name: 'NEW FILTER',
          path: `${this.model.path}/newFilter`,
          children: []
        }

        this.model.children.push(newElem)
        this.open = true
      },
      delChild() {
        this.$parent.model.children.splice(
          this.$parent.model.children.indexOf(this.model),
          1
        )
      },
      openInput() {
        if (this.isEdit) {
          this.isInput = !this.isInput
          this.inputName = this.model.name
          this.$nextTick(() => this.$refs.inputRef.focus())
        }
      },
      renameFilter() {
        const updateFilter = updateFilterPath(
          this.inputName,
          copyByJson(this.model)
        )

        this.model = {
          ...updateFilter
        }
        this.isInput = !this.isInput
      },
      addToMovie() {
        const adoptFilter = {
          id: this.model.id,
          name: this.model.name,
          path: this.model.path
        }
        const idArray = this.filterableMovie.filters.map((item) => item.id)

        if (!idArray.includes(this.model.id)) {
          this.filterableMovie.filters.push(adoptFilter)
          this.setFilterableMovie(this.filterableMovie)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  // https://jsfiddle.net/1fynun7a/1591/
  // http://cssdeck.com/labs/pure-css-tree-menu-framework
  // https://two-wrongs.com/draw-a-tree-structure-with-only-css

  ul {
    list-style: none;
  }

  .tree {
    user-select: none;
    // font-size 1.2em
  }

  .filterName {
    display: inline-block;
    cursor: pointer;

    &:hover {
      color: green;
    }
  }

  .subFolder {
    margin-left: 0.5em;
    padding-left: 0;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 1em;
      left: 0;
      border-left: 1px solid;
    }

    li {
      // margin 0
      padding: 0 1em;
      line-height: 2em;
      font-weight: bold;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        top: 1em;
        left: 0;
        width: 0.7em;
        border-top: 1px solid;
        margin-top: -1px;
      }
    }
  }

  .inputBlock {
    width: 200px;
    display: flex;

    button {
      margin-left: 5px;
    }
  }
</style>
