<template>
  <form name="form-events" method="post">
    <a-input
      v-for="(item, i) in formData"
      v-model="item.value"
      v-bind:key="i"
      :placeholder="item.text"
      :class="{ invalid: item.error }"
    >
    </a-input>
    <a-button @click="clearData" type="reset">Отчистить</a-button>
    <a-button @click="SendingForm" type="primary" html-type="submit"
      >Отправить</a-button
    >
  </form>
</template>
<script>
export default {
  data() {
    return {
      formData: [
        {
          name: 'fio',
          value: '',
          error: false,
          text: 'ФИО'
        },
        {
          name: 'subdivision',
          value: '',
          error: false,
          text: 'Подразделение'
        },
        {
          name: 'topic',
          value: '',
          error: false,
          text: 'Тема'
        },
        {
          name: 'content',
          value: '',
          error: false,
          text: 'Содержание'
        }
      ]
    }
  },
  methods: {
    clearData() {
      const mass = []
      this.formData.forEach((e) => {
        mass.push({
          name: e.name,
          value: '',
          error: false,
          text: e.text
        })
      })
      this.formData = mass
    },
    async SendingForm(event) {
      event.preventDefault()
      const body = {}
      try {
        this.formData.forEach((item) => {
          if (item.name === 'fio' && !item.value) throw item
          if (item.name === 'subdivision' && !item.value) throw item
          if (item.name === 'topic' && !item.value) throw item
          if (item.name === 'content' && !item.value) throw item

          body[item.name] = item.value
        })
        // sending form data
        this.$axios
          .post('/api/send-event', body)
          .then(await this.$message.success('Успешно!'))
      } catch (err) {
        await this.$message.error('Проверьте поле: ' + err.text)
        this.formData = this.formData.map((e) => {
          return {
            name: e.name,
            value: e.value,
            error: e.name === err.name,
            text: e.text
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.invalid {
  border: 1px solid #f00;
}
</style>
