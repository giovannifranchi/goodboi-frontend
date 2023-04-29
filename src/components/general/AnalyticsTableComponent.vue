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
          <td>
            <div class="d-flex flex-column">
              <span>{{ getPF(row.PF, row.RPF) }}</span>
              <span>{{ getBF(row.BF, row.RBF) }}</span>
            </div>
          </td>
          <td class="text-start">
            <div class="d-flex flex-column">
              <span>D: {{ handleDate(row.lastTX) }}</span>
              <span>T: {{ handleTime(row.lastTX) }}</span>
            </div>
          </td>
          <td class="text-start">
            <div class="d-flex flex-column">
              <span>D: {{ handleDate(row.anDate) }}</span>
              <span>T: {{ handleTime(row.anDate) }}</span>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <span>Go to <a href="#">scanner</a></span>
              <span>Go to <a href="#">neth.net</a></span>
            </div>
          </td>
          <td>
            <ManualReviewComponent/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ManualReviewComponent from './ManualReviewComponent.vue';


export default {
  name: "AnalyticsTableComponent",

  props: {
    info: {
      type: Array,
      required: true,
    },
  },

  components: {ManualReviewComponent},

  data(){
    return {
        showTPButtons: false,
    }
  },

  methods: {
    renderContract(contract) {
      const start = contract.substring(0, 5);
      const end = contract.substring(contract.length - 3);
      return `${start}...${end}`;
    },

    getPF(pf, rpf) {
      const values = [];
      pf ? values.push("PF") : null;
      rpf ? values.push("RPF") : null;
      return values.join(", ");
    },

    getBF(bf, rbf) {
      const values = [];
      bf ? values.push("BF") : null;
      rbf ? values.push("RBF") : null;
      return values.join(", ");
    },

    handleDate(myDate) {
      const handledDate = myDate.slice(0, 10);
      return handledDate.slice(2);
    },

    handleTime(myDate) {
      return myDate.slice(11, 19);
    },
  },
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

  .record {
    width: 30%;
  }

  .id {
    width: auto;
  }
}
</style>
