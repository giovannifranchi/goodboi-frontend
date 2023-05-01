<template>
  <div class="row py-5 position-relative overflow-hidden">
    <div class="col-4">
      <VueApexCharts :type="'pie'" :series="getSeries" :options="getOptions" />
      
    </div>
    <div class="col-4">
      <ContractsComponent
        :contractsNumber="store.mokup.general.totalContracts"
        :contracts24Number="store.mokup.general.Contracts24h"
      />
      <button type="button" class="btn btn-danger" @click="showTable">
        Errors: {{ store.mokup.general.analysisErrors.percentage }}%
      </button>
    </div>
    <div class="col-4 position-absolute" :class="tableShow ? 'show' : 'hide'">
      <ErrorTableComponent :errorDetails="store.mokup.general.analysisErrors.details" />
    </div>
  </div>
</template>

<script>
import { store } from "../../store/store";
import VueApexCharts from "vue3-apexcharts";
import ContractsComponent from "./ContractsComponent.vue";
import ErrorTableComponent from "./ErrorTableComponent.vue";
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters(["getContracts"]),


    getSeries() {
      const numbers = [];
      for(let contract in this.getContracts){
        numbers.push(this.getContracts[contract]);
      }
      return numbers;
    },

    getOptions() {
      const pieLabels = [];
      for(let contract in this.getContracts){
        pieLabels.push(contract)
      }
      return {
        labels: pieLabels,
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false
        } 
      };
    },
  },

  methods: {
    ...mapActions(["fetchContracts"]),

    showTable() {
      this.tableShow ? (this.tableShow = false) : (this.tableShow = true);
    },
  },

  created(){
    this.fetchContracts();
  }
};
</script>

<style lang="scss" scoped>
.show {
  right: 0;
  opacity: 1;
  transition: all .4s ease-in-out;
}

.hide {
  right: -100%;
  opacity: 0;
  transition: all .7s ease-in-out;
}
</style>
