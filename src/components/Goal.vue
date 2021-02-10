<template>
    <div class="goals">
        <div class="overflow-auto">
        <!-- <div class="goal" v-for="(goal,index) in goals" :key="index"> -->
            <b-table id="goals-table" :items="goals" :per-page="perPage" :current-page="currentPage" default striped hover fixed >
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
            // slide: 0,
            // sliding: null
            perPage: 2,
            currentPage: 1,
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
    border-left: 1px solid #66C89C;
    border-right: 1px solid #66C89C;
    border-bottom: 1px solid #66C89C;
}

/* .goals .goal .card {
    border-radius: 8px;
    max-width: 50rem;
    height: 550px;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 6px, rgb(0 0 0 / 12%) 0px 1px 4px;
    transition: .15s all ease-in-out;
}
.goals .goal .card:hover {
    transform: scale(1.05);
}
.goals .goal .card-body {
    color: black;
}
.goals .card-deck {
    justify-content: center;
}
.goals .goal .card-title {
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
} */
</style>