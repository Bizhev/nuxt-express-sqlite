<template>
  <div>
    <div v-show="data.length">
      <ul>
        <li v-for="(x, i) in data" v-bind:key="i">
          {{ x.id }}, {{ x.fio }}, {{ x.subdivision }}, {{ x.topic }},
          {{ x.content }},
          <b
            >Создано:
            {{ $moment(x.createdAt).format('DD MM YYYY в HH:mm') }} </b
          >, {{ $moment(x.updatedAt).format('DD MM YYYY в HH:mm') }},
        </li>
      </ul>
    </div>
    <div v-show="!data.length">
      Записей пока нет, можете смело добавить новые 😉🎉🎉🎉
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    }
  },
  async created() {
    await this.$axios.post('/api/events').then((e) => {
      this.data = e.data
    })
  }
}
</script>
<style>
ul {
  list-style-type: none;
}
</style>
