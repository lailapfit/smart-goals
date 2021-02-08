<template>
    <div class="goals">
        <b-card-group deck>
        <div class="goal" v-for="(goal,index) in goals" :key="index">
            <b-card class="mb-6" :title="goal.goal">
                    <div class="row">
                        <div class="col"><strong>Start Date:</strong> {{ goal.startDate1 }}</div>
                        <div class="col"><strong>Completion Date:</strong> {{ goal.completionDate1 }}</div>
                    </div>
                    <div class="padding-top-sm">
                        <strong>Steps to Achieve:</strong>
                        <span v-html="goal.stepsToAchieve"></span>
                    </div>
                    <div class="padding-top-sm">
                        <strong>Why is this goal worthwhile?</strong>
                        <p>{{ goal.whyIsThisGoalWorthwhile }}</p>
                    </div>
                
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
    border-radius: 40px;
    max-width: 30rem;
    height: 550px;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 6px, rgb(0 0 0 / 12%) 0px 1px 4px;
    transition: .15s all ease-in-out;
}
.goals .goal .card:hover {
    transform: scale(1.05);
}
.goals .goal .card-group {
    justify-content: center;
}
.goals .goal .card-title {
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
}
.goals .goal ol {
    text-align: justify;
}
</style>