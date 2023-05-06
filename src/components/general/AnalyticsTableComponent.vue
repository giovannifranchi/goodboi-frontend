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
          <td>
            <a :href="createScannerLink(row.chain, row.address)" target="_blank">
              {{ renderContract(row.address) }}
            </a>
          </td>
          <td>{{ handleChain(row.chain) }}</td>
          <td class="record">{{ row.report }}</td>
          <td>
            <div class="d-flex flex-column">
              <span>{{ getPF(row.PF, row.RPF) }}</span>
              <span>{{ getBF(row.BF, row.RBF) }}</span>
            </div>
          </td>
          <td class="text-start">
            <div class="d-flex flex-column align-items-center">
              <span>{{ handleDate(row.lastTX) }}</span>
              <span>{{ handleTime(row.lastTX) }}</span>
            </div>
          </td>
          <td class="text-start">
            <div class="d-flex flex-column align-items-center">
              <span>{{ handleDate(row.anDate) }}</span>
              <span>{{ handleTime(row.anDate) }}</span>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <span>Go to <a :href="createScannerLink(row.chain, row.address, true)" target="_blank">neth.net</a></span>
            </div>
          </td>
          <td>
            <ManualReviewComponent :detector-name="currentDetector" :id="row.ID" @pass-id="emitId"/>
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
      required: true
    },

    currentDetector: {
      type: String,
      required: true
    }
  },

  emits: ['re-pass-id'],

  components: {ManualReviewComponent},

  data(){
    return {
        showTPButtons: false,
    }
  },

  methods: {

    emitId(id){
      console.log(id, 'from table')
      this.$emit('re-pass-id', id)
    },

    handleChain(chain){
      switch(chain){
        case 'ETH_MAINNET':
          return 'ETH';
        case 'BSC_MAINNET':
          return 'BSC';
        case 'POLYGON':
          return 'POLY';
        case 'ARBITRIUM':
          return 'ARBI';
      }
    },

    createScannerLink(chain, address, isVSCode = false){
      switch(chain){
        case 'BSC_MAINNET':
          return  isVSCode ?  `https://bscscan.deth.net/address/${address}` : `https://bscscan.com/address/${address}`;
        case 'ETH_MAINNET':
          return  isVSCode ?  `https://etherscan.deth.net/address/${address}` : `https://etherscan.io/address/${address}`;
        case 'POLYGON':
          return  isVSCode ?  `https://polygonscan.deth.net/address/${address}` : `https://polygonscan.com/address/${address}`;
        case 'ARBITRIUM':
          return  isVSCode ?  `https://arbiscan.deth.net/address/${address}` : `https://arbiscan.io/address/${address}`;
        default:
          return '';
      }
    },

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
      return myDate.slice(11, 16);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../assets/partials/variables' as *;


.table-wrapper {
  width: 100%;
  table {
    width: 100%;
    table-layout: fixed;
    background-color: $table-color;
  }
  th,
  td {
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    vertical-align: middle;
    text-align: center;
  }
  td {
    padding: 0.5rem 0;
    &.record {
      text-align: left;
    }
  }
  .record {
    width: 30%;
  }

  .id {
    width: auto;
  }
}
</style>
