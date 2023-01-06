<template>
    <div class='dashboard'>
      <div class='introduction-container'>
        <h1>Hi, <span class='green-highlight'>{{ name }}</span> &#x1F44B;</h1>
        <div class='update-years-container'>
          <h3>Welcome to your <span class='orange-highlight'>{{ year }} Annual Personal Objectives</span> dashboard &#x1F64C;</h3>
          <b-col cols='2'>
            <b-form-group
              label='Year:'
              label-cols-md='3'
              label-align-md='right'
            >
              <b-form-select v-model='selectedYear' :options='years' size='md' @change='updateDashboard'></b-form-select>
            </b-form-group>        
          </b-col>
        </div>
      </div>
      <div class='date-now'>
        <h4>Today is <span class='green-highlight'>{{ currentDate }}</span></h4>
      </div>
      <div class='widget-container'>
          <EllipseProgress :progress-data='progressPercentage' color-line='#007bff' empty-color-line='#FFFFFF' :legend-value='progressPercentage' legend-value-slot='%' legend-caption='PROGRESS'></EllipseProgress>
          <EllipseProgress :progress-data='progressPercentage' color-line='#007bff' empty-color-line='#FFFFFF' :legend-value='progressAction' :legend-value-slot='progressActionSlot' legend-caption='ACTIONS'></EllipseProgress>
          <ActionButton text-one='UPDATE' text-two='GOALS' :path-route='goalRoute'></ActionButton>
      </div>
      <div class='widget-container' v-on:click='showGoalDetails'>
        <ActionButton text-one='GOAL' text-two='DETAILS' path-route='false'></ActionButton>
        <div class='widget-background'>
          <line-graph v-if='loaded' :chart-data='lineGraph' :chart-labels='labels'></line-graph>
        </div>
      </div>
      <div class='goals-container' v-show='isActive'>
          <Goal v-bind:goals='goals'></Goal>
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
    ActionButton,
    EllipseProgress,
    Goal,
    LineGraph
  },
  data () {
    return {
      currentDate: '',
      currentSubmission: {},
      goals: [],
      goalRoute: '',
      indecesByYear: {},
      isActive: false,
      labels: [],
      lineGraph: {
          stepGoals: [],
          complete: []
        },
      loaded: false,
      name: '',
      progressAction: 0,
      progressActionSlot: '',
      progressPercentage: 0,
      submissions: [],
      selectedYear: '',
      year: '',
      years: [],
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
      return progress;
    },
    calculateStepActionProgress: (stepActions) => {
      let progress = 0;
      if (stepActions.length > 0) {
        for(let goal of stepActions) {
          goal.stepStatus === 'complete' ? progress++ : progress;
        }
      }
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
        this.setPropBySubmissions(submissions.data);
      })
      .catch(error => {
        console.log('error in dashboard: ' + error);
      })
    },
    displayName: function(firstName, lastName) {
      return [firstName, lastName].join(' ')
    },
    getYears: function() {
      return this.submissions.map(submission => submission.data.goalTypeAnnualYear);
    },
    getSubmissionByYear: function(year) {
      return this.submissions.find(submission => submission.data.goalTypeAnnualYear === year);
    },
    getSelectedSubmissionByYear: function(currentYear) {
      let year = this.selectedYear ? this.selectedYear : currentYear;

      return this.getSubmissionByYear(year);
    },
    getDayOfTheWeek: function(day) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return days[day];
    },
    getMonthOfTheYear: function(month) {
      const months = ['January','February','March','April','May','June','July', 'August','September','October','November','December'];
      return months[month];
    },
    setCurrentDate: function() {
      let now = new Date();
      this.currentDate = `${this.getDayOfTheWeek(now.getDay())}, ${this.getMonthOfTheYear(now.getMonth())} ${now.getDate()}, ${now.getFullYear()}`;
    },
    setProgress: function() {
      this.progressActionSlot = '/' + this.goals.length;
      this.goalRoute = 'goals/' + this.currentSubmission._id;

      if (this.$root.progressAction === 0) {
        this.$root.progressAction = this.calculateProgress(this.goals);
      }
      this.progressAction = this.$root.progressAction;

      if (this.$root.progressPercentage === 0){
        this.$root.progressPercentage = this.getPercentage(this.progressAction, this.goals.length);
      }
      this.progressPercentage = this.$root.progressPercentage;
    },
    setLineGraph: function() {
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
    },
    setPropBySubmissions: function(submissions) {
      this.loaded = false;
      try {
        //widget progress
        if (this.submissions.length == 0) {
          this.submissions = submissions;
        }

        if (this.years.length == 0) {
          this.years = this.getYears();
        }

        let currentYear = new Date().getFullYear();
        let currentSubmission = this.getSelectedSubmissionByYear(currentYear);
        this.currentSubmission = currentSubmission ? currentSubmission : this.getSelectedSubmissionByYear(currentYear - 1);

        this.name = this.displayName(this.currentSubmission.data.firstName, this.currentSubmission.data.lastName);
        this.year = this.currentSubmission.data.goalTypeAnnualYear;
        this.selectedYear = this.currentSubmission.data.goalTypeAnnualYear;
        this.setCurrentDate()
        this.goals = this.currentSubmission.data.editGrid;

        // progress
        this.setProgress()

        //widget line graph
        this.setLineGraph()
        
      } catch (e) {
        console.log('error in dashboard set submission: ' + e);
      } finally {
        this.loaded = true;
      }
    },
    updateDashboard: function() {
      this.setPropBySubmissions(this.submissions);
    },
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
  margin-bottom: 3%;
}
.dashboard .fomio-container {
  margin: 5% 2% 5% 2%;
  border: 1px solid #FCC58E;
  border-radius: 2%;
  padding: 1%;
}
.update-years-container {
  display: flex;
  justify-content: space-between;
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
  margin: 3% 3% 2% 2%;
  padding-left: 1%;
  border-left: 1px solid black;
  padding-top: 0.5%;
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
.date-now {
  display: flex;
  align-items: flex-start;
  margin: 3.5% 3% 0.5% 2.5%;
}
</style>