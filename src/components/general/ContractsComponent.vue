<template>
  <div class="d-flex flex-column">
    <h4><span class="badge text-bg-primary">Contracts:  {{ contractsNumber }}</span></h4>
    <h4><span class="badge text-bg-primary">Contracts last 24h: {{ contracts24Number }}</span></h4>
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
};
</script>

<style lang="scss" scoped></style>
