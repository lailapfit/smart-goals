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
            datasets: [{
                label: 'downloads',
                borderColor: '#249EBF',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: '#249EBF',
                backgroundColor: '#249EBF',
                data: this.chartData
            }]
        }, this.options)
    }
}
</script>