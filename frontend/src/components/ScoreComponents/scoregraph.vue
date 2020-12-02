<script>
import { Line } from "vue-chartjs";
import store from "../../store/index.js";
import axios from "axios";
export default {
  extends: Line,
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            //Data to be represented on y-axis
            data: []
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },

  mounted() {
    axios
      .post("/api/score/gets", {
        stdid: store.state.who
      })
      .then((res) => {
        const data = this;
        const arr = res.data.socores;
        console.log(arr);
        console.log(data.datacollection);
        arr.forEach((e) => {
          data.datacollection.labels.push(e.s_semester);
          data.datacollection.datasets[0].data.push(e.s_score);
        });

        this.renderChart(this.datacollection, this.options);
      });
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
