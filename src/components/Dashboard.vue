<template>
    <div class="dashboard">
      <h1>{{ name }}'s Annual Performance Objectives</h1>
      <div class="widget-container">
          <EllipseProgress :progress-data="progressPercentage" color-line="blue" empty-color-line="#FFFFFF" :legend-value="progressPercentage" legend-value-slot="%" legend-caption="PROGRESS"></EllipseProgress>
          <EllipseProgress :progress-data="progressAction" color-line="blue" empty-color-line="#FFFFFF" :legend-value="progressAction" :legend-value-slot="progressActionSlot" legend-caption="ACTIONS"></EllipseProgress>
        <ActionButton text-one="UPDATE" text-two="GOALS"></ActionButton>
        </div>
        <div class="goals-container">
          <Goal v-bind:goals="goals"></Goal>
        </div>
    </div>
</template>

<script>
import EllipseProgress from '@/components/EllipseProgress.vue';
import ActionButton from '@/components/CallToActionButton.vue';
import Goal from '@/components/Goal.vue';

export default {
  name: 'dashboard',
  components: {
    EllipseProgress,
    ActionButton,
    Goal
  },
  data () {
    return {
      submissions: [],
      goals: [],
      progressPercentage: 0,
      progressAction: 0,
      progressActionSlot: '',
      name: ''
    }
  },
  methods: {
    calculateProgress: (smartGoals) => {
      let progress = 0;
      if (smartGoals.length > 0) {
        for(let goal of smartGoals) {
          if (goal.completionDate1 != '00/00/0000') {
            progress++;
          }
        }
      }
      console.log('progress: ' + progress);
      return progress;
    },
    getPercentage: (data, dataArr) => {
      return dataArr > 0 ? Math.round((data/dataArr) * 100) : 0;
    }
  },
  mounted: function() {
    const baseURL = 'https://dqyymsublasmimb.form.io/smartgoals/submission';
      this.$http.get(baseURL)
      .then(submissions => {
        console.log('submissions:' + submissions.data);
        this.submissions = submissions.data;
        console.log('this.submissions: ' + JSON.stringify(this.submissions));
        this.name = submissions.data[0].data.firstName + ' ' + submissions.data[0].data.lastName;
        this.goals = submissions.data[0].data.editGrid;
        this.progressAction = this.calculateProgress(this.goals);
        this.progressActionSlot = '/' + this.goals.length;
        console.log('action: ' + this.progressAction);
        this.progressPercentage = this.getPercentage(this.progressAction, this.goals.length);
        console.log('progressPercentage: ' + this.progressPercentage);
      })
      .catch(error => {
        console.log('error in dashboard: ' + error);
      })
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