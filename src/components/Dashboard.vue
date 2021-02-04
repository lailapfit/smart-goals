<template>
    <div class="dashboard">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>