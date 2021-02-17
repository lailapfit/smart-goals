<template>
    <div class="dashboard">
      <div class="introduction-container">
        <h1>Hi <span class="green-highlight">{{ name }}</span> &#x1F44B;</h1>
        <h3>Welcome to your <span class="orange-highlight">{{ year }} Annual Personal Objectives</span> dashboard &#x1F64C;</h3>
      </div>
      <div class="widget-container">
          <EllipseProgress :progress-data="progressPercentage" color-line="#007bff" empty-color-line="#FFFFFF" :legend-value="progressPercentage" legend-value-slot="%" legend-caption="PROGRESS"></EllipseProgress>
          <EllipseProgress :progress-data="progressPercentage" color-line="#007bff" empty-color-line="#FFFFFF" :legend-value="progressAction" :legend-value-slot="progressActionSlot" legend-caption="ACTIONS"></EllipseProgress>
          <ActionButton text-one="UPDATE" text-two="GOALS" :path-route="goalRoute"></ActionButton>
      </div>
      <div class="widget-container" v-on:click="showGoalDetails">
        <ActionButton text-one="GOAL" text-two="DETAILS" path-route="false"></ActionButton>
        <div class="widget-background">
          <line-graph v-if="loaded" :chart-data="lineGraph" :chart-labels="labels"></line-graph>
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
import LineGraph from '@/components/Line.vue';

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
      labels: [],
      lineGraph: {
          stepGoals: [],
          complete: []
        },
      loaded: false,
      year: '',
      goalRoute: ''
    }
  },
  methods: {
    calculateProgress: (smartGoals) => {
      let progress = 0;
      if (smartGoals.length > 0) {
        for(let goal of smartGoals) {
          goal.completionDate1 != '00/00/0000' ? progress++ : progress;
        }
      }
      console.log('progress: ' + progress);
      return progress;
    },
    calculateStepActionProgress: (stepActions) => {
      let progress = 0;
      if (stepActions.length > 0) {
        for(let goal of stepActions) {
          goal.stepStatus === 'complete' ? progress++ : progress;
        }
      }
      console.log('step action progress: ' + progress);
      return progress;
    },
    getPercentage: (data, dataArr) => {
      return dataArr > 0 ? Math.round((data/dataArr) * 100) : 0;
    },
    showGoalDetails: function (event){
      if (event) event.preventDefault();
      this.isActive = !this.isActive;
    },
    getCompletedStepGoals: function (goals) {
      return goals.map(stepGoals => {
        return this.calculateStepActionProgress(stepGoals.dataGridStepsToAchieve)
      })
    },
    getSubmission: function() {
      const baseURL = 'https://dqyymsublasmimb.form.io/smartgoals/submission';
      this.$http.get(baseURL)
      .then(submissions => {
        console.log('submissions:' + submissions.data);
        this.$root.submissions = submissions.data;
        this.setPropBySubmission(submissions.data);
      })
      .catch(error => {
        console.log('error in dashboard: ' + error);
      })
    },
    setPropBySubmission: function(submission) {
      this.loaded = false;
      try {
        //widget progress
        this.submissions = submission;
        this.name = submission[0].data.firstName + ' ' + submission[0].data.lastName;
        this.year = submission[0].data.goalTypeAnnualYear;
        this.goals = submission[0].data.editGrid;
        this.progressActionSlot = '/' + this.goals.length;
        this.goalRoute = 'goals/' + submission[0]._id;

        if (this.$root.progressAction === 0) {
          this.$root.progressAction = this.calculateProgress(this.goals);
        }
        this.progressAction = this.$root.progressAction;

        if (this.$root.progressPercentage === 0){
          this.$root.progressPercentage = this.getPercentage(this.progressAction, this.goals.length);
        }
        this.progressPercentage = this.$root.progressPercentage;
        
        console.log('action: ' + this.progressAction);
        console.log('progressPercentage: ' + this.progressPercentage);

        //widget line graph
        if (this.$root.labels.length === 0) {
          this.$root.labels = this.goals.map(goal => goal.goalTitle);
        }
        this.labels = this.$root.labels;
        
        if (this.$root.lineGraph.stepGoals.length === 0) {
          this.$root.lineGraph.stepGoals = this.goals.map(goal => goal.dataGridStepsToAchieve.length);
        }
        this.lineGraph.stepGoals = this.$root.lineGraph.stepGoals;

        if (this.$root.lineGraph.complete.length === 0) {
          this.$root.lineGraph.complete = this.getCompletedStepGoals(this.goals);
        }
        this.lineGraph.complete = this.$root.lineGraph.complete;
        this.loaded = true;
      } catch (e) {
        console.log('error in dashboard set submission: ' + e);
      }
    }
  },
  async mounted() {
    if (this.$root.submissions.length > 0) {
      console.log('cached data');
      this.setPropBySubmission(this.$root.submissions);
    } else {
      console.log('non-cached data');
      this.getSubmission();
    }
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
.widget-background {
  background-color: #FCC58E;
  padding-bottom: 5px;
  padding-left: 8px;
  width: 60%;
  border-radius: 20px;
}
.introduction-container {
  text-align: left;
  margin: 3% 3% 3% 2%;
  padding-left: 1%;
  border-left: 1px solid black;
}
.green-highlight, .orange-highlight {
  position: relative;
}
.green-highlight:before {
  content: "";
  z-index: -1;
  top: 0.7em;
  right: -6px;
  position: absolute;
  border: 2px solid #42b983;
  background-color: #42b983;
  border-right-color: transparent;
  width: 105%;
  height: 0.5em;
  transform: rotate(1deg);
  opacity: 0.5;
  border-radius: 0.25em;
  font-weight: 600;
}
.orange-highlight:before {
  content: "";
  z-index: -1;
  top: 0.7em;
  right: -6px;
  position: absolute;
  border: 2px solid#FCC58E;
  background-color: #FCC58E;
  border-right-color: transparent;
  width: 103%;
  height: 0.5em;
  transform: rotate(1deg);
  opacity: 0.5;
  border-radius: 0.25em;
  font-weight: 600;
}
</style>