<template>
  <div class="row py-5 position-relative overflow-hidden justify-content-between align-items-center">
    <div class="col-4" v-if="isContractsBusy || isContracts24Busy"><AtomSpinner :size="100" color="#fff"/></div>
    <div class="col-4" v-else>
      <h3 class="text-center">{{ !tableShow ? 'Total' : 'Flagged' }}</h3>
      <VueApexCharts :type="'pie'" :series="getSeries" :options="getOptions" v-if="!tableShow"/>
      <VueApexCharts :type="'pie'" :series="getFlaggedSeries" :options="getOptions" v-else/>
    </div>
    <div class="col-4">
      <ContractsComponent :contractsNumber="getContractNumer" :contracts24Number="getContracts24" />
      <button type="button" class="btn ms-blue w-auto d-flex align-items-center ms-btn" @click="showTable" :class="{active: tableShow}">
        <h4 class="fw-light mb-0 d-flex">Flagged:
          <strong class="align-self-center ms-2" v-if="isFlaggedBusy"><AtomSpinner :size="20" color="#fff"/></strong> 
          <strong class="ms-2" v-else>{{ formatNumber(getFlaggedNumber )}}</strong>
        </h4>
      </button>
    </div>
    <div class="col-4">
      <!-- Now it is always visible to make it hide put position absolute and add this :class="tableShow ? 'show' : 'hide'" -->
      <AtomSpinner :size="100" color="#fff" v-if="!getCompilationErrors"/>
      <ErrorTableComponent
        :errorDetails="getCompilationErrors"
        :totalErrors="getTotalErrors"
        :errorsPercentage="getErrorsPercentage"
        v-else
      />
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import ContractsComponent from "./ContractsComponent.vue";
import ErrorTableComponent from "./ErrorTableComponent.vue";
import { AtomSpinner } from 'epic-spinners';
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StatsComponent",

  components: { VueApexCharts, ContractsComponent, ErrorTableComponent, AtomSpinner },

  data() {
    return {
      tableShow: false,
      isContractsBusy: true,
      isContracts24Busy: true,
      isFlaggedBusy: true
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
        colors: ['#e9d8a6', '#ee9b00','#bb3e03', '#9b2226', '#9b2226']
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
      if(this.getCompilationErrors){
        return this.getCompilationErrors.reduce((acc, curr)=> acc + curr.count, 0);
      }
    },

    getErrorsPercentage() {
      let totalErrors = 0;
      if (!this.getCompilationErrors || this.getCompilationErrors.length === 0 || !this.getFlaggedNumber) {
        return 0;
      } else {
        const errorsNumbers = this.getCompilationErrors.map((error) => error.count);
        if (errorsNumbers.length === 0) {
          totalErrors = 0;
        } else {
          totalErrors = errorsNumbers.reduce((acc, curr) => acc + curr);
          if (this.getFlaggedNumber === 0) {
            return 0;
          } else {
            return ((totalErrors * 100) / this.getFlaggedNumber).toFixed(2);
          }
        }
      }
    },
  },

  methods: {
    ...mapActions(["fetchContracts", "fetchContracts24", "fetchFlaggedContracts"]),

    showTable() {
      this.tableShow ? this.tableShow = false : this.tableShow = true;
    },

    formatNumber(number){
      if(number){
        const formattedNumber = number.toLocaleString('en-US', {
        useGrouping: true,
        minimumFractionDigits: 0
      }).replace(/,/g, "'"); //Remove the replace if you want separators at the bottom
      return formattedNumber;
      }
    }
  },

  async created() {
    await this.fetchContracts().then(()=>this.isContractsBusy = false);
    await this.fetchContracts24().then(()=>this.isContracts24Busy = false);
    await this.fetchFlaggedContracts().then(()=>this.isFlaggedBusy = false);
  },
};
</script>

<style lang="scss" scoped>
@use '../../assets/partials/variables' as *;

.ms-blue{
  background-color: $secondary-blue;
  color: #fff;
}

.ms-btn {
  &:hover{
    border: 3px solid #404040;
  }
}
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
