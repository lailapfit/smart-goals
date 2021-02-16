<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: ['chartData', 'chartLabels'],
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            padding: 5,
                        }
                    }]
                }
            }
        }
    },
    mounted() {
        this.renderChart({
            labels: this.chartLabels,
            datasets: [
                {
                    label: 'Step Action Goals',
                    borderColor: '#249EBF',
                    pointBackgroundColor: 'white',
                    borderWidth: 3,
                    pointBorderColor: '#249EBF',
                    backgroundColor: 'transparent',
                    data: this.chartData.stepGoals
                },
                {
                    label: 'Complete Goals',
                    borderColor: '#f90a06',
                    pointBackgroundColor: 'white',
                    borderWidth: 3,
                    pointBorderColor: '#f90a06',
                    backgroundColor: 'transparent',
                    data: this.chartData.complete
                }
            ]
        }, this.options)
    }
}
</script>