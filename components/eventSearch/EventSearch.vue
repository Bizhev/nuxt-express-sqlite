<template>
  <div>
    <a-input :ref="'box'" v-model="search" @change="handleChange" />
    <a-button @click="searching" type="primary">поиск по теме</a-button>

    <div
      :style="
        'left: ' + x.left + 'px; width: ' + x.width + 'px;top: ' + x.top + 'px'
      "
      :class="['wrapper_options', { after: isOption }]"
    >
      <ul>
        <li>ok</li>
        <li>ok2</li>
        <li>ok3</li>
      </ul>
      <div @click="isOption = false">скрыть</div>
    </div>

    <a-modal
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :okButtonProps="{ props: { disabled: true } }"
      :cancelButtonProps="{ props: { disabled: true } }"
      title="Диалоговое окно с формой"
    >
      <p><section-form-events /></p>
    </a-modal>
  </div>
</template>
<script>
import SectionFormEvents from '../sectionFormEvents/SectionFormEvents'
export default {
  components: {
    SectionFormEvents
  },
  data() {
    return {
      search: '',
      data: [],
      isOption: false,
      open: false,
      x: { left: 0, top: 0, width: 0 },
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    test() {
      this.isOption = !this.isOption
      // this.x = Math.round(this.$refs.box.$el.getBoundingClientRect().left)
      console.log(this.a, this.$refs.box.$el.getBoundingClientRect())
    },
    handleSearch(val) {
      console.log('handleSearch => ', val)
      if (val.length > 2) {
        this.data = localStorage.getItem('search')
          ? localStorage.getItem('search')
          : []
        if (this.data.length > 0) this.open = true
      }
    },
    handleChange(event) {
      this.isOption = this.search.length > 2

      this.x.left = event.target.offsetLeft
      this.x.top = event.target.offsetTop + event.target.clientHeight + 5
      this.x.width = event.target.clientWidth

      this.data.push({ text: 'text', value: '1' })
    },
    searching() {
      console.log('Searching')
      this.visible = true
    },

    showModal() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    },
    handleOk() {
      this.visible = false
    }
  }
}
</script>
<style scoped>
.wrapper_options {
  z-index: 1;
  background-color: orange;
  display: none;
  position: absolute;
  animation: 1s fade;
}
.after {
  display: inline-block;
  animation: 0.6s appear;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
