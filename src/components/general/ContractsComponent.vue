<template>
  <div class="d-flex flex-column">
    <h4 class="fw-light d-flex">Contracts: 
      <AtomSpinner :size="20" color="#fff" class="align-self-center ms-2" v-if="!contractsNumber"/>
      <strong class="ms-2" v-else>{{ formatContracts(contractsNumber) }}</strong>
    </h4>
    <h4 class="fw-light d-flex">Last 24h: 
      <AtomSpinner :size="20" color="#fff" class="align-self-center ms-2" v-if="!contracts24Number"/>
      <strong class="ms-2">{{ formatContracts(contracts24Number) }}</strong></h4>
  </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners';


export default {
  name: "ContractsComponent",

  props: {
    contractsNumber: {
      type: Number,
      required: true,
    },

    contracts24Number: {
      type: Number,
      required: true,
    },
  },

  components: {AtomSpinner},

  methods: {
    formatContracts(number){
      if(number){
        const formattedNumber = number.toLocaleString('en-US', {
        useGrouping: true,
        minimumFractionDigits: 0
      }).replace(/,/g, "'"); //Remove the replace if you want separators at the bottom
      return formattedNumber;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
