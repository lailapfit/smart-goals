<template>
    <div class="goals">
        <b-card-group deck>
        <div class="goal" v-for="(goal,index) in goals" :key="index">
            <b-card :title="goal.goal" style="max-width: 30rem;" class="mb-6">
                <b-card-text>Start Date: {{ goal.startDate1 }}
                Completion Date: {{ goal.completionDate1 }}        
                Steps to Achieve:
                    <span v-html="goal.stepsToAchieve"></span>
                Why is this goal worthwhile?
                {{ goal.whyIsThisGoalWorthwhile }}</b-card-text>
            </b-card>
        </div>
         </b-card-group>
    </div>
</template>

<script>
export default {
    name: 'Goal',
    props: ['goals']
}
</script>

<style scoped>
.goals {
    margin: 5%;
}
.goals .goal {
    margin: 2%;
}
.goals .goal .card {
    border: 2px solid  #FCC58E;
    border-radius: 40px;
    padding: 2%;
}
.goals .goal .card-body {
    height: 450px;
}
</style>