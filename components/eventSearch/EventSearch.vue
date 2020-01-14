<template>
  <div>
    <a-input v-model="search" placeholder="Поиск" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  }
}
</script>
