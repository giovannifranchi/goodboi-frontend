<template>
  <div class="table-wrapper">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="id">ID</th>
          <th>ADDRESS</th>
          <th>CHAIN</th>
          <th class="record">REPORT</th>
          <th>FLAGS</th>
          <th>LAST TX</th>
          <th>AN DATE</th>
          <th>GO TO ACTION</th>
          <th>SET MANUAL REVIEW</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in info" :key="index">
          <td class="id">{{ row.ID }}</td>
          <td>{{ renderContract(row.address) }}</td>
          <td>{{ row.chain }}</td>
          <td class="record">{{ row["rep_load-not-store"] }}</td>
          <td>Flags</td>
          <td>{{ row.lastTX }}</td>
          <td>{{ row.anDate }}</td>
          <td><a href="#">go to action</a></td>
          <td>
            <button type="button" class="btn btn-success">True Positive</button>
            <button type="button" class="btn btn-danger">False Positive</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AnalyticsTableComponent",

  props: {
    info: {
      type: Array,
      required: true,
    },
  },

  methods: {
    renderContract(contract){
        const start = contract.substring(0,5);
        const end = contract.substring(contract.length - 4);
        return `${start}...${end}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  table {
    width: 100%;
    table-layout: fixed; 
  }
   th,
    td {
      white-space: normal;
      word-wrap: break-word;
      overflow-wrap: break-word;
      vertical-align: middle;
      text-align: center;
    }

    .record{
        width: 30%;
    }

    .id {
        width: auto;
    }
  
}
</style>
