<template>
  <div v-if="!tableShow">
    <div class="row">
      <div class="col-4">
        <VueApexCharts :type="'pie'" :series="getSeries" :options="getOptions" />
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <ContractsComponent
          :contractsNumber="store.mokup.general.totalContracts"
          :contracts24Number="store.mokup.general.Contracts24h"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4 d-flex gap-3">
        <h4>
          <span class="badge text-bg-danger">Errors: {{ store.mokup.general.analysisErrors.percentage }}%</span>
        </h4>
        <button type="button" class="btn btn-light" @click="tableShow = true">SEE MORE</button>
      </div>
    </div>
  </div>

  <div class="row" v-else>
    <div class="col-4">
      <ErrorTableComponent :errorDetails="store.mokup.general.analysisErrors.details" />
      <button type="button" class="btn btn-light" @click="tableShow = false">HIDE TABLE</button>
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
      this.tableShow = true;
    },

    hideTable() {
      this.tableShow = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
