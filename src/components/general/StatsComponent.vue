<template>
  <div>
    <div class="row pb-5">
      <div class="col-4">
        <VueApexCharts :type="'pie'" :series="getSeries" :options="getOptions" />
      </div>
    </div>
    <div class="row pb-3">
      <div class="col-4">
        <ContractsComponent
          :contractsNumber="store.mokup.general.totalContracts"
          :contracts24Number="store.mokup.general.Contracts24h"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-4 d-flex gap-3">
        <h4>
          <span class="badge text-bg-danger">Errors: {{ store.mokup.general.analysisErrors.percentage }}%</span>
        </h4>
        <button type="button" class="btn btn-light" @click="showTable">SEE MORE</button>
      </div>
    </div>
  </div>

  <!-- <div class="row mb-3" :class="tableShow ? 'show' : 'hide'">
    <div class="col-4">
      <ErrorTableComponent :errorDetails="store.mokup.general.analysisErrors.details"/>
    </div>
  </div> -->
  <div class="my-row mb-3" :class="tableShow ? 'show' : 'hide'">
    <div>
      <ErrorTableComponent :errorDetails="store.mokup.general.analysisErrors.details" />
    </div>
  </div>
</template>

<script>
import { store } from "../../store/store";
import VueApexCharts from "vue3-apexcharts";
import ContractsComponent from "./ContractsComponent.vue";
import ErrorTableComponent from "./ErrorTableComponent.vue";

export default {
  name: "StatsComponent",

  components: { VueApexCharts, ContractsComponent, ErrorTableComponent },

  data() {
    return {
      store,
      pieChart: store.mokup.pie_chart,
      tableShow: false,
    };
  },

  computed: {
    getSeries() {
      return this.pieChart.map((element) => element.tot);
    },

    getOptions() {
      const pieLabels = this.pieChart.map((element) => element.name);
      return {
        labels: pieLabels,
        dataLabels: {
          enabled: true,
        },
      };
    },
  },

  methods: {
    showTable() {
      this.tableShow ? this.tableShow = false : this.tableShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.show {
  height: auto;
  transform-origin: top;
  transform: scaleY(1);
  transition: transform 0.4s ease-in-out;
}

.hide {
  height: 0;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.4s ease-in-out;
}
</style>
