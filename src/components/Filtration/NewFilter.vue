<template>
  <li :key="model.id">
    <div class="tree" :class="{ isFolder: isFolder }">
      <div class="filterName" v-show="!isInput" @dblclick="openInput">
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

      <a-radio-group size="small">
        <a-radio-button v-if="!isFolder" @click="changeType('add')">
          add
        </a-radio-button>
        <a-radio-button v-if="!isFolder" @click="changeType('del')">
          del
        </a-radio-button>
      </a-radio-group>
    </div>
    <ul class="subFolder" v-show="open" v-if="isFolder">
      <Tree
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model"
      />
      <li class="add" :key="model.id">
        <a-button size="small" @click="addChild">add Item</a-button>
      </li>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'Tree',
    props: {
      model: {
        type: Object
      },
      mode: String
    },
    data() {
      return {
        open: false,
        isInput: false,
        inputName: ''
      }
    },
    computed: {
      isFolder() {
        return this.model.children && this.model.children.length
      }
    },
    methods: {
      toggle() {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      changeType(type) {
        if (type === 'add') {
          // console.log(this.model.name)
          this.$set(this.model, 'children', [])
          this.addChild()
          this.open = true
        }
        if (type === 'del') {
          this.$set(this.model, 'children', [])
          this.delChild()
        }
      },
      addChild() {
        this.model.children.push({
          id: Math.trunc(Math.random() * 10e5),
          name: 'NEW FILTER',
          path: `${this.model.path}/newFilter`
        })
        console.log(this.model.children)
      },
      delChild() {
        const filt = this.$parent.model.children.filter((item) => {
          console.log(item.id !== this.model.id)
          return item.id !== this.model.id
        })
        // console.log(filt)

        // console.log(filt)
        this.$nextTick(() => (this.$parent.model.children = filt))
        console.log(this.$parent.model.children)
        // this.$parent.model.children = copyByJson(filt)
      },
      openInput() {
        this.isInput = !this.isInput
        this.inputName = this.model.name
        this.$nextTick(() => this.$refs.inputRef.focus())
      },
      renameFilter() {
        this.model.name = this.inputName
        this.isInput = !this.isInput
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
