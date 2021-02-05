<template>
    <div class="container">
        <formio :src="formUrl" v-on:submit="onSubmitMethod"></formio>
  </div>
</template>

<script>
import { Form } from "vue-formio";

export default {
    name: "smartGoalsForm",
    components: {
        formio: Form
    },
    data: function() {
        console.log('in data')
    // Load these from vuex or some other state store system.
    return {
      formUrl: "https://dqyymsublasmimb.form.io/smartgoals"
    }
  },
  methods: {
    onSubmitMethod: function(submission) {
      console.log(submission);
    }
  }
}
</script>