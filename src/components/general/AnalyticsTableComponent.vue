<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th class="id">ID</th>
          <th class="address">ADDRESS</th>
          <th class="chain">CHAIN</th>
          <th>REPORT</th>
          <th class="flags">FLAGS</th>
          <th class="time">LAST TX</th>
          <th class="time">AN DATE</th>
          <th class="set">SET M R</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in info"
          :key="index"
          :class="lastRowCliccked === row.ID ? 'highlighted' : ''"
          @click.capture="lastRowCliccked = null"
        >
          <td>{{ row.ID }}</td>
          <td>
            <div class="d-flex flex-column align-items-center">
              <div class="w-75 mb-3 d-flex flex-row justify-content-around">
                <a
                  :href="createScannerLink(row.chain, row.address, true)"
                  target="_blank"
                  @click="lastRowCliccked = row.ID"
                >
                  <img src="../../assets/img/visual-studio.png" alt="VSCode" class="ms-logo" />
                </a>
                <a
                  :href="createScannerLink(row.chain, row.address)"
                  target="_blank"
                  @click="lastRowCliccked = row.ID"
                >
                  <img src="../../assets/img/etherscan-logo.png" alt="Etherscan" class="ms-logo" />
                </a>
              </div>
              <a :href="createScannerLink(row.chain, row.address)" target="_blank" @click="lastRowCliccked = row.ID">
                {{ renderContract(row.address) }}
              </a>
            </div>
          </td>
          <td>{{ handleChain(row.chain) }}</td>
          <td class="record" v-html="reportHighlight(cleanNewLines(row.report))"></td>
          <td>
            <div class="d-flex flex-column">
              <span v-html="getPF(row.PF, row.RPF)"></span>
              <span v-html="getBF(row.BF, row.RBF)"></span>
            </div>
          </td>
          <td class="text-start" :style="{ backgroundColor: getColorByDate(row.lastTX)}">
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
            <ManualReviewComponent :detector-name="currentDetector" :id="row.ID" @pass-id="emitId" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ManualReviewComponent from "./ManualReviewComponent.vue";

export default {
  name: "AnalyticsTableComponent",

  props: {
    info: {
      type: Array,
      required: true,
    },

    currentDetector: {
      type: String,
      required: true,
    },
  },

  emits: ["re-pass-id"],

  components: { ManualReviewComponent },

  data() {
    return {
      showTPButtons: false,
      lastRowCliccked: null,
    };
  },

  methods: {
    emitId(id, revState) {
      this.$emit("re-pass-id", id, revState);
    },

    handleChain(chain) {
      switch (chain) {
        case "ETH_MAINNET":
          return "ETH";
        case "BSC_MAINNET":
          return "BSC";
        case "POLYGON":
          return "POLY";
        case "ARBITRUM":
          return "ARBI";
      }
    },

    reportHighlight(report) {
      return report.replace(/'([^']+)'/g, "<strong>$1</strong>");
    },

    createScannerLink(chain, address, isVSCode = false) {
      switch (chain) {
        case "BSC_MAINNET":
          return isVSCode ? `https://bscscan.deth.net/address/${address}` : `https://bscscan.com/address/${address}`;
        case "ETH_MAINNET":
          return isVSCode ? `https://etherscan.deth.net/address/${address}` : `https://etherscan.io/address/${address}`;
        case "POLYGON":
          return isVSCode
            ? `https://polygonscan.deth.net/address/${address}`
            : `https://polygonscan.com/address/${address}`;
        case "ARBITRUM":
          return isVSCode ? `https://arbiscan.deth.net/address/${address}` : `https://arbiscan.io/address/${address}`;
        default:
          return "";
      }
    },

    cleanNewLines(report){
      return report.replace(/\n/g, "<br>")
    },

    getColorByDate(date) {
      const colorBad = [190, 76, 76];
      let daysElapsed = Math.min(30, this.getDaysElapsed(date));
      if(daysElapsed <= 2)
        return 'rgba(0,0,0,0)' // 0 opacity
      let opacity = (daysElapsed / 30).toFixed(1)
      return `rgba(${colorBad[0]},${colorBad[1]},${colorBad[2]},${opacity})`
    },

    getDaysElapsed(mysqlDatetime) {
      const datetime = new Date(mysqlDatetime.replace(" ", "T"));
      const timeDifference = new Date() - datetime;
      const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysElapsed;
    },

    renderContract(contract) {
      const start = contract.substring(0, 5);
      const end = contract.substring(contract.length - 3);
      return `${start}...${end}`;
    },

    getPF(pf, rpf) {
      const values = [];
      pf ? values.push("<strong>PF</strong>") : null;
      rpf ? values.push("RPF") : null;
      return values.join(", ");
    },

    getBF(bf, rbf) {
      const values = [];
      bf ? values.push("<b>BF</b>") : null;
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
@use "../../assets/partials/variables" as *;

.table-wrapper {
  a {
    color: inherit;
    text-decoration: none;
  }

  table {
    width: 100%;
    table-layout: fixed;
    background-color: #dadada;
    border-color: $primary-blue;
    border-radius: 10px;
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

  .highlighted {
    background-color: rgba(223,255,0,0.12);
  }

  .id {
    width: 4.375rem;
  }
  .ms-logo {
    width: 2rem;
    height: 2rem;
  }
  .address {
    width: 6.25rem;
  }
  .chain {
    width: 4.375rem;
  }
  .flags {
    width: 4.375rem;
  }
  .time {
    width: 5rem;
  }
  .set {
    width: 120px;
  }
}
</style>
