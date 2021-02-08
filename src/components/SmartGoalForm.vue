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