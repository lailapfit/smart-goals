<template>
    <div class="ellipse-progress">
        <vue-ellipse-progress                 
          :progress="Number(progressData)"
          :angle="-90"
          :color="colorLine"
          :emptyColor="emptyColorLine"                  
          :size="300"
          :thickness="10"
          emptyThickness="7%"
          lineMode="in 10"
          :legend="true"
          :legendValue="legendValue"
          :legendFormatter="({currentValue}) => new Intl.NumberFormat('de-DE').format(currentValue)"
          legendClass="legend-custom-style"
          dash="60 0.9"
          animation="reverse 700 400"
          :noData="false"
          :loading="false"                      
          fontColor="white"
          :half="false"
          :gap="10"
          dot="10 blue"
          fontSize="5rem">
          <span slot="legend-value">{{ legendValueSlot }}</span>
          <p slot="legend-caption">{{legendCaption}}</p>
        </vue-ellipse-progress>
    </div>
</template>

<script>
export default {
  name: 'ellipse-progress',
  props: [ 'progressData', 'colorLine', 'emptyColorLine', 'legendValue', 'legendValueSlot', 'legendCaption'],
}
</script>

<style scoped>
.ellipse-progress {
    background-color: #FCC58E;
    padding: 3% 0 3% 0;
    width: 30%;
    border-radius: 5%;
}
</style>