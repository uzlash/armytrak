<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card hover>
          <v-card-text class="text-h6 d-flex justify-space-between">
            <v-card class="pa-5 mt-n6">
              <v-img height="50" width="50" src="../assets/barcode-scanner.png">
              </v-img>
            </v-card>
            <span class="text-h5 font-weight-light">340,216 </span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-body-2 font-weight-light">
            Registered Scanners
            <v-icon size="15" class="ml-1" color="info"
              >mdi-chart-box-outline</v-icon
            >
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card hover>
          <v-card-text class="text-h6 d-flex justify-space-between">
            <v-card class="pa-5 mt-n6">
              <v-img height="50" width="50" src="../assets/smartphone.png">
              </v-img>
            </v-card>
            <span class="text-h5 font-weight-light">178,445 </span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-body-2 font-weight-light">
            Registered Phones
            <v-icon size="15" class="ml-1" color="success"
              >mdi-check-circle-outline</v-icon
            >
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card hover>
          <v-card-text class="text-h6 d-flex justify-space-between">
            <v-card class="pa-5 mt-n6">
              <v-img height="50" width="50" src="../assets/totalPersonnel.png">
              </v-img>
            </v-card>
            <span class="text-h5 font-weight-light">42,008 </span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-body-2 font-weight-light">
            Personnel Present
            <v-icon size="15" class="ml-1">mdi-check-circle-outline</v-icon>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card hover>
          <v-card-text class="text-h6 d-flex justify-space-between">
            <v-card class="pa-5 mt-n6">
              <v-img
                height="50"
                width="50"
                src="../assets/retiredPersonnel.png"
              >
              </v-img>
            </v-card>
            <span class="text-h5 font-weight-light">77,921 </span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="text-body-2 font-weight-light">
            Personnel Absent
            <v-icon size="15" class="ml-1" color="warning">mdi-cancel</v-icon>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <!-- Bar Chart -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="pa-2">
            <div class="d-flex align-center">
              <span class="lstick ml-n2 red"></span>
              <div class="ml-4 mr-1">
                <h5 class="subtitle-1">Personnel activity over time</h5>
                <h2
                  class="font-weight-regular body-2 grey--text text--darken-2"
                >
                  Year 2021/2022
                </h2>
              </div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <bar-chart
              style="height: 300px"
              :chartdata="barChartData"
              :options="barChartOptions"
            ></bar-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <!-- Line Chart -->
      <v-col cols="12" sm="12" md="9">
        <v-card class="custom__card">
          <v-card-title class="pa-2">
            <div class="d-flex align-center">
              <span class="lstick ml-n2 red"></span>
              <div class="ml-4 mr-1">
                <h5 class="subtitle-1">Personnel activity over time</h5>
                <h2
                  class="font-weight-regular body-2 grey--text text--darken-2"
                >
                  Year 2021
                </h2>
              </div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="">
            <line-chart
              style="height: 300px"
              :chartdata="lineChartData"
              :options="lineChartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Pie Chart -->
      <v-col cols="12" sm="12" md="3">
        <v-card tile class="custom__card">
          <v-card-title class="pa-2">
            <div class="d-flex align-center">
              <span class="lstick ml-n2 red"></span>
              <div class="ml-4 mr-1">
                <h5 class="subtitle-1">Overview</h5>
                <h2
                  class="font-weight-regular body-2 grey--text text--darken-2"
                >
                  Year 2021
                </h2>
              </div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="">
            <pie-chart
              style="height: 300px"
              :chartdata="pieChartData"
              :options="pieChartOptions"
            ></pie-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import PieChart from "@/components/PieChart.vue";
export default {
  name: "Dashboard",
  components: {
    LineChart,
    PieChart,
    BarChart,
  },
  data: () => ({
    lineChartData: {
      labels: [
        "Jul 21",
        "Aug 21",
        "Sep 21",
        "Oct 21",
        "Nov 21",
        "Dec 21",
        "Jan 22",
        "Feb 22",
        "Mar 22",
        "Apr 22",
        "May 22",
        "Jun 22",
      ],
      datasets: [
        {
          label: "Personnel present",
          borderColor: "#475C3B",
          backgroundColor: "transparent",
          borderWidth: 3,
          pointBorderColor: "white",
          data: [0, 150, 110, 240, 200, 200, 300, 200, 380, 300, 400, 380],
        },
        {
          label: "Personnel Absent",
          borderColor: "#946746",
          backgroundColor: "transparent",
          borderWidth: 3,
          pointBorderColor: "white",
          data: [0, 75, 90, 140, 180, 100, 150, 170, 190, 200, 300,240],
        },
      ],
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      fill: true,
    },
    pieChartData: {
      labels: ["Personnel Present", "Personnel Absent"],
      datasets: [
        {
          borderColor: ["#475C3B", "#946746",],
          backgroundColor: ["#475C3B", "#946746",],
          data: [70, 30],
        },
      ],
    },
    pieChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      fill: false,
    },
    barChartData: {
      labels: [
        "Jul 21",
        "Aug 21",
        "Sep 21",
        "Oct 21",
        "Nov 21",
        "Dec 21",
        "Jan 22",
        "Feb 22",
        "Mar 22",
        "Apr 22",
        "May 22",
        "Jun 22",
      ],
      datasets: [
        {
          barPercentage: 0.5,
          barThickness: 30,
          minBarLength: 2,
          label: "Personnel present",
          data: [10, 5, 30, 20, 50, 45, 20, 50, 30, 10, 25, 10],
          borderColor: "#475C3B",
          backgroundColor: "#475C3B",
        },
        {
          barPercentage: 0.5,
          barThickness: 30,
          minBarLength: 2,
          label: "Personnel Absent",
          data: [5, 1, 15, 8, 30, 25, 7, 40, 15, 1, 5, 6],
          borderColor: "#946746",
          backgroundColor: "#946746",
        },
      ],
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      fill: true,
    },
  }),
};
</script>
