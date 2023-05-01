<template>

  <table class="table table-striped table-hover">
    <thead>
        <tr>
            <th scope="col">Error Type</th>
            <th scope="col">Occurencies</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(error, index) in errorDetails" :key="index">
            <td>{{ error.error }}</td>
            <td>{{ error.count }}</td>
        </tr>
    </tbody>
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
  }
};
</script>

<style lang="scss" scoped></style>
