<template>
    <div class="dashboard">
      <h1>{{ name }}'s Annual Performance Objectives</h1>
      <div class="widget-container">
          <EllipseProgress :progress-data="progressPercentage" color-line="blue" empty-color-line="#FFFFFF" :legend-value="progressPercentage" legend-value-slot="%" legend-caption="PROGRESS"></EllipseProgress>
          <EllipseProgress :progress-data="progressPercentage" color-line="blue" empty-color-line="#FFFFFF" :legend-value="progressAction" :legend-value-slot="progressActionSlot" legend-caption="ACTIONS"></EllipseProgress>
          <ActionButton text-one="UPDATE" text-two="GOALS" path-route="goal"></ActionButton>
      </div>
      <div class="widget-container" v-on:click="showGoalDetails">
        <ActionButton text-one="GOAL" text-two="DETAILS" path-route="false"></ActionButton>
        <div class="widget-background">
          <line-graph :chartdata="lineGraph" :options="options"></line-graph>
        </div>
      </div>
      <div class="goals-container" v-show="isActive">
          <Goal v-bind:goals="goals"></Goal>
      </div>
    </div>
</template>

<script>
import EllipseProgress from '@/components/EllipseProgress.vue';
import ActionButton from '@/components/CallToActionButton.vue';
import Goal from '@/components/Goal.vue';
import LineGraph from '@/components/Line.vue'

export default {
  name: 'dashboard',
  components: {
    EllipseProgress,
    ActionButton,
    Goal,
    LineGraph
  },
  data () {
    return {
      submissions: [],
      goals: [],
      progressPercentage: 0,
      progressAction: 0,
      progressActionSlot: '',
      name: '',
      isActive: false,
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 25,
            }
          }]
        }
      },
      lineGraph: {
        labels: ['M', 'N', 'X', 'P', 'O', 'Y', 'Z', 'L'],
        datasets: [
          { 
            label: 'Number of Moons',
            data: [0, 0, 1, 2, 67, 62, 27, 14],
            backgroundColor: [
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)'
            ],
            borderColor: [
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
            ],
            borderWidth: 3
          }
        ]
      }
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
    },
    showGoalDetails: function (event){
      if (event) event.preventDefault();
      this.isActive = !this.isActive;
    },
    getSubmission: function() {
      const baseURL = 'https://dqyymsublasmimb.form.io/smartgoals/submission';
      this.$http.get(baseURL)
      .then(submissions => {
        console.log('submissions:' + submissions.data);
        this.submissions = submissions.data;
        this.name = submissions.data[0].data.firstName + ' ' + submissions.data[0].data.lastName;
        this.goals = submissions.data[0].data.editGrid;
        this.progressAction = this.calculateProgress(this.goals);
        this.progressActionSlot = '/' + this.goals.length;
        this.progressPercentage = this.getPercentage(this.progressAction, this.goals.length);
        
        console.log('action: ' + this.progressAction);
        console.log('progressPercentage: ' + this.progressPercentage);
      })
      .catch(error => {
        console.log('error in dashboard: ' + error);
      })
    }
  },
  mounted: function() {
    this.getSubmission();
  }
}
</script>

<style scoped>
.dashboard .widget-container {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5%;
}
.dashboard .fomio-container {
  margin: 5% 2% 5% 2%;
  border: 1px solid #FCC58E;
  border-radius: 2%;
  padding: 1%;
}
.wigdet-background {
  background-color: #FCC58E;
  padding: 3% 0 3% 0;
  width: 30%;
  border-radius: 5%;
}
</style>