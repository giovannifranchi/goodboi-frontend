<template>
  <div class="d-flex flex-column">
    <h4><span class="badge text-bg-primary">Contracts:  {{ formatContracts(contractsNumber) }}</span></h4>
    <h4><span class="badge text-bg-primary">Contracts last 24h: {{ formatContracts(contracts24Number) }}</span></h4>
  </div>
</template>

<script>
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

  methods: {
    formatContracts(number){
      const formattedNumber = number.toLocaleString('en-US', {
        useGrouping: true,
        minimumFractionDigits: 0
      }).replace(/,/g, "'"); //Remove the replace if you want separators at the bottom
      return formattedNumber;
    }
  }
};
</script>

<style lang="scss" scoped></style>
