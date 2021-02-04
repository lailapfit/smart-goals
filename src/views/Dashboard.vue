<template>
    <div class="dashboard">
        <h1>{{ msg }}</h1>
        <EllipseProgress progress="50" color-line="blue" empty-color-line="#FFFFFF" legend-value="50" legend-value-slot="%" legend-caption="PROGRESS"></EllipseProgress>
        <EllipseProgress progress="25" color-line="blue" empty-color-line="#FFFFFF" legend-value="2" legend-value-slot="/6" legend-caption="ACTIONS"></EllipseProgress>
    </div>
</template>

<script>
import EllipseProgress from '@/components/EllipseProgress.vue';

export default {
  name: 'dashboard',
  components: {
    EllipseProgress
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: space-evenly;
}
</style>