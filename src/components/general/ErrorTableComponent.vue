<template>

  <table class="ms-table">
    <thead>
        <tr class="ms-border">
            <th class="px-3 py-2">Error Type</th>
            <th class="px-3 py-2">Occurencies</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(error, index) in orderErrors" :key="index" class="ms-border">
            <td class="px-3 py-2">{{ error.error }}</td>
            <td class="px-3 py-2">{{ error.count }}</td>
        </tr>
    </tbody>
    <tfoot>
      <tr>
          <td class="px-3 py-2"><strong>Overall</strong></td>
          <td class="px-3 py-2"><strong>{{ formatErrors(totalErrors) }} ({{ errorsPercentage }}%)</strong></td>
        </tr>
    </tfoot>
  </table>



</template>

<script>
export default {
  name: "ErrorTableComponent",

  props: {
    errorDetails: {
      type: Array,
      required: true,
    },

    totalErrors: {
      type: Number,
      required: true,
    },

    errorsPercentage: {
      type: Number,
      required: true
    }
  },

  computed: {
    orderErrors(){
      if(this.errorDetails){
        return this.errorDetails.sort((a, b)=> b.count - a.count);
      }
    },
  },

  methods: {
    formatErrors(number){
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

<style lang="scss" scoped>

.ms-table{

  background-color: transparent;
  width: 100%;
  
  border-radius: 15px;
  .ms-border {
    border-bottom: 2px solid #fff;
  }
}

</style>
