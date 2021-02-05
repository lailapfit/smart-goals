<template>
    <div class="action-button" v-on:click="updateGoals">
        <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" >
        <polygon points="145 20, 290 290, 0 290"></polygon>
        <text x="48%" y="60%" dominant-baseline="middle" text-anchor="middle">{{ textOne }}</text> 
        <text x="48%" y="70%" dominant-baseline="middle" text-anchor="middle">{{ textTwo }}</text> 
      </svg>
    </div>
</template>

<script>
import SmartGoal from '@/components/SmartGoalForm.vue'

export default {
  name: 'action-button',
  props: ['textOne', 'textTwo'],
  methods: {
      updateGoals: function(event) {
          if (event) event.preventDefault();
          this.$router.push({ path: 'smart-goal', component: SmartGoal})
      }
  }
}
</script>

<style scoped>
.action-button {
    background-color: #FCC58E;
    padding: 3% 0 3% 0;
    width: 30%;
    border-radius: 5%;
}
.action-button polygon {
    fill: #42b983;
    text-align: center;
}
.action-button text {
    font-size: 2em;
    font-weight: bold; 
}
</style>