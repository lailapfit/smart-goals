<template>
    <div class="goals">
        <div class="overflow-auto">
        <!-- <div class="goal" v-for="(goal,index) in goals" :key="index"> -->
            <b-table id="goals-table" :items="goals" :fields="fields" :per-page="perPage" :current-page="currentPage" default striped hover fixed>
                <template #cell(startDate1)="data">
                    <span>{{ formatEmptyDate(data.value) }}</span>
                </template>
                <template #cell(completionDate1)="data">
                    <span>{{ formatEmptyDate(data.value) }}</span>
                </template>
                <template #cell(stepsToAchieve)="data">
                    <span v-html="data.value"></span>
                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="goals-table" align="center"></b-pagination>
            <p class="mt-3">Current Page: {{ currentPage }}</p>
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
                    key: 'stepsToAchieve',
                    label: 'Steps to Achieve'
                },
                { 
                    key: 'whyIsThisGoalWorthwhile',
                    label: 'Why is this goal worthwhile?'
                },
                { 
                    key: 'notes',
                    label: 'Notes'
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
        }
  }
}
</script>

<style scoped>
.goals {
    margin: 5% 3%;
}
</style>