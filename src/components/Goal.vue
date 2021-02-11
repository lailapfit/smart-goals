<template>
    <div class="goals">
        <div class="overflow-auto">
            <b-table id="goals-table" :items="goals" :fields="fields" :per-page="perPage" :current-page="currentPage" default striped hover fixed>
                <template #cell(startDate1)="data">
                    <span>{{ formatEmptyDate(data.value) }}</span>
                </template>
                <template #cell(completionDate1)="data">
                    <span>{{ formatEmptyDate(data.value) }}</span>
                </template>
                <template #cell(showDetail)="row">
                    <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                        {{ row.detailsShowing == 'true' ? 'Hide' : 'Show'}} Details
                    </b-button>
                </template>
                <template #row-details="row">
                    <div class="card-collapse-item" v-for="(d,index) in row.item.dataGridStepsToAchieve" :key="index">
                        <b-card>
                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Steps to Achieve Goals:</b></b-col>
                                <b-col class="text-sm-left">{{d.stepsToAchieveGoals }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                                <b-col sm="3" class="text-sm-right"><b>Status:</b></b-col>
                                <b-col class="text-sm-left step-status">
                                    <span>{{ formatStatus(d.stepStatus) }}</span>
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>
                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="goals-table" align="center"></b-pagination>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Goal',
    data () {
        return {
            perPage: 2,
            currentPage: 1,
            fields: [
                { 
                    key: 'goal',
                    label: 'Goals'
                },
                {
                    key: 'startDate1',
                    label: 'Start Date'
                },
                {
                    key: 'completionDate1',
                    label: 'Completion Date'
                },
                { 
                    key: 'whyIsThisGoalWorthwhile',
                    label: 'Why is this goal worthwhile?'
                },
                { 
                    key: 'notes',
                    label: 'Notes'
                },
                {
                    key: 'showDetail',
                    label: 'Detail'
                }
            ]
        }
    },
    props: ['goals', 'controls', 'indicators'],
    computed: {
      rows() {
        return this.goals.length
      }
    },
    methods: {
        formatEmptyDate(value) {
            return value === '00/00/0000' ? 'TBD' : value;
        },
        formatStatus(value) {
            return value.toUpperCase();
        }
  }
}
</script>

<style scoped>
.goals {
    margin: 5% 3%;
}
.goals .card {
    width: 950px;
    margin: auto;
    margin-bottom: 25px;
}
.goals .step-status span {
    border: 1px solid #42b983;
    padding: 6px 4px 6px 4px;
    border-radius: 5px;
    background-color: #42b983;
    font-weight: 600;
    color: white;
}
</style>