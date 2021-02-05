<template>
    <div class="dashboard">
      <h1>Laila's Annual Performance Objectives</h1>
      <div class="widget-container">
        <EllipseProgress progress-data="50" color-line="blue" empty-color-line="#FFFFFF" legend-value="50" legend-value-slot="%" legend-caption="PROGRESS"></EllipseProgress>
        <EllipseProgress progress-data="25" color-line="blue" empty-color-line="#FFFFFF" legend-value="2" legend-value-slot="/6" legend-caption="ACTIONS"></EllipseProgress>
        <ActionButton text-one="UPDATE" text-two="GOALS"></ActionButton>
        </div>
        <div class="fomio-container">
          <!-- <SmartGoal></SmartGoal> -->
        </div>
    </div>
</template>

<script>
import EllipseProgress from '@/components/EllipseProgress.vue';
import ActionButton from '@/components/CallToActionButton.vue';
// import SmartGoal from '@/components/SmartGoalForm.vue';

export default {
  name: 'dashboard',
  components: {
    EllipseProgress,
    ActionButton,
    // SmartGoal
  }
}
</script>

<style scoped>
.dashboard .widget-container {
  display: flex;
  justify-content: space-evenly;
}
.dashboard .fomio-container {
  margin: 5% 2% 5% 2%;
  border: 1px solid #FCC58E;
  border-radius: 2%;
  padding: 1%;
}
</style>