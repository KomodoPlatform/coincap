<script>
  //Importing Line class from the vue-chartjs wrapper
  import { Line } from 'vue-chartjs'

  //Exporting this so it can be used in other components
  export default {
    extends: Line,
    props: ['coin'],
    data () {
      return {
        apiurl: window.config.API_URL,
        axios: window.axios,
        chart: [],
        datacollection: {
          //Data to be represented on x-axis
          labels: [],
          datasets: [
            {
              label: '',
              backgroundColor: '#41ead4',
              pointBackgroundColor: 'transparent',
              borderWidth: 1,
              pointBorderColor: 'transparent',
              //Data to be represented on y-axis
              data: []
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      const app = this
      app.datacollection.datasets[0].label = app.coin.toUpperCase() + '/USD'
      axios.get(app.apiurl + '/api/v1/charts/' + app.coin ).then(result => {
          app.chart = result.data.prices
          for(var i = 0; i < app.chart.length; i++){
            let value = app.chart[i]
            var ts = new Date(value[0]);
            app.datacollection.labels.push(ts.toDateString())
            app.datacollection.datasets[0].data.push(value[1])
          }
          this.renderChart(app.datacollection, this.options)
      })
      //renderChart function renders the chart with the datacollection and options object.
      //
    }
  }
</script>