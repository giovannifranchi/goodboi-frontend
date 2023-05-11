<template>
  <div class="row py-5 position-relative overflow-hidden justify-content-between">
    <div class="col-4">
      <h3 class="text-center">{{ !tableShow ? 'Total' : 'Flagged' }}</h3>
      <VueApexCharts :type="'pie'" :series="getSeries" :options="getOptions" v-if="!tableShow"/>
      <VueApexCharts :type="'pie'" :series="getFlaggedSeries" :options="getOptions" v-else/>
    </div>
    <div class="col-7">
      <!-- Now it is always visible to make it hide put position absolute and add this :class="tableShow ? 'show' : 'hide'" -->
      <ErrorTableComponent
        :errorDetails="getCompilationErrors"
        :totalErrors="getTotalErrors"
        :errorsPercentage="getErrorsPercentage"
      />
    </div>
  </div>
  <div class="row mb-5">
    <div class="col-4">
      <ContractsComponent :contractsNumber="getContractNumer" :contracts24Number="getContracts24" />
      <button type="button" class="btn btn-danger" @click="showTable" :class="{active: tableShow}">Flagged: {{ getFlaggedNumber }}</button>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import ContractsComponent from "./ContractsComponent.vue";
import ErrorTableComponent from "./ErrorTableComponent.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StatsComponent",

  components: { VueApexCharts, ContractsComponent, ErrorTableComponent },

  data() {
    return {
      tableShow: true,
    };
  },

  computed: {
    ...mapGetters(["getContracts", "getContracts24", "getCompilationErrors", "getFlaggedContracts"]),

    getSeries() {
      const numbers = [];
      for (let contract in this.getContracts) {
        numbers.push(this.getContracts[contract]);
      }

      return numbers;
    },

    getOptions() {
      const pieLabels = [];
      for (let contract in this.getContracts) {
        pieLabels.push(contract);
      }
      return {
        labels: pieLabels,
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false,
        },
      };
    },

    getFlaggedSeries(){
      if(this.getFlaggedContracts){
        const numbers = [];
        for(let flagged in this.getFlaggedContracts){
          numbers.push(this.getFlaggedContracts[flagged]);
        }
        return numbers;
      }
    },

    getContractNumer() {
      const numbers = [];
      for (let contracts in this.getContracts) {
        numbers.push(this.getContracts[contracts]);
      }

      if (numbers.length === 0) {
        // implement with spinner component
        return 0;
      } else {
        return numbers.reduce((acc, curr) => acc + curr);
      }
    },

    getFlaggedNumber() {
      if (this.getFlaggedContracts) {
        const totalNumbers = [];
        for (let flagged in this.getFlaggedContracts) {
          totalNumbers.push(this.getFlaggedContracts[flagged]);
        }
        return totalNumbers.reduce((acc, curr) => acc + curr);
      }
    },

    getTotalErrors() {
      return this.getContractNumer + this.getContracts24;
    },

    getErrorsPercentage() {
      let totalErrors = 0;
      if (!this.getCompilationErrors || this.getCompilationErrors.length === 0) {
        return 0;
      } else {
        const errorsNumbers = this.getCompilationErrors.map((error) => error.count);
        if (errorsNumbers.length === 0) {
          totalErrors = 0;
        } else {
          totalErrors = errorsNumbers.reduce((acc, curr) => acc + curr);
          if (this.getContractNumer === 0) {
            return 0;
          } else {
            return ((totalErrors * 100) / this.getContractNumer).toFixed(2);
          }
        }
      }
    },
  },

  methods: {
    ...mapActions(["fetchContracts", "fetchContracts24", "fetchCompilationErrors", "fetchFlaggedContracts"]),

    showTable() {
      this.tableShow ? this.tableShow = false : this.tableShow = true;
    },
  },

  async created() {
    await this.fetchContracts();
    await this.fetchContracts24();
    await this.fetchCompilationErrors();
    await this.fetchFlaggedContracts();
  },
};
</script>

<style lang="scss" scoped>
.show {
  right: 0;
  opacity: 1;
  transition: all 0.4s ease-in-out;
}

.hide {
  right: -100%;
  opacity: 0;
  transition: all 0.7s ease-in-out;
}
</style>
