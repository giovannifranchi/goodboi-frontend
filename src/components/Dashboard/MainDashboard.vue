<template>
  <main>
    <div class="container">
      <StatsComponentVue class="py-5" />
      <!-- Rev State radios -->

      <h3>Revision State</h3>
      <div class="row row-cols-6 w-75 pt-3">
        <div class="col d-flex justify-content-center" v-for="(radio, index) in revStateFields" :key="index">
          <div class="form-check">
            <input
              class="form-check-input ms-radio"
              type="radio"
              name="flexRadioDefault"
              :id="`rev${index}`"
              :checked="radio.value === revState"
              v-model="revState"
              :value="radio.value"
              @change="
                () => {
                  isTablesBusy = true;
                  fetchTables({ detector: this.currentDetector, revState: this.revState, offset: 0 }).then(
                    () => (isTablesBusy = false)
                  );
                }
              "
            />
            <label class="form-check-label" :for="`rev${index}`">{{ radio.name }}</label>
          </div>
        </div>
      </div>

      <h3 class="pt-5">Detectors</h3>

      <div v-if="isDetectorBusy">
        <AtomSpinner :size="200" color="#fff" />
      </div>
      <div class="d-flex flex-wrap pb-5 pt-3 gy-4 gap-3" v-else>
        <DetectorComponent
          :detectorName="detector"
          :rev-state="revState"
          @handleClick="handleDetector"
          @click="
            () => {
              isTablesBusy = true;
              isAnalysisBusy = true;
              fetchTables({ detector: this.currentDetector, revState: this.revState, offset: 0 }).then(
                () => (isTablesBusy = false)
              );
              fetchAnalysisCount(this.currentDetector).then(() => (isAnalysisBusy = false));
            }
          "
          :class="currentDetector === detector ? 'active' : ''"
          class="flex-grow-1"
          v-for="(detector, index) in orderDetectors"
          :key="index"
        />
      </div>

      <div class="row justify-content-center">
        <div class="col-6 d-flex justify-content-between">
          <h5 class="fw-light">Detector: {{ currentDetector }}</h5>
          <!-- ADD: format number method -->
          <h5 v-if="isAnalysisBusy"><AtomSpinner :size="50" color="#fff" /></h5>
          <h5 class="fw-light" v-else>
            Analyzed: {{ getAnalysisCount ? formatNumber(getAnalysisCount.count) : "" }} ({{
              getDetectorAnalysisPercentage
            }}%)
          </h5>
        </div>
      </div>
    </div>
    <AtomSpinner :size="100" color="#fff" v-if="isTablesBusy" />
    <AnalyticsTableComponent
      :info="filteredTables"
      :currentDetector="currentDetector"
      @re-pass-id="addToPutted"
      class="analytics-table"
      v-else
    />
  </main>

  <button
    class="btn btn-danger position-fixed"
    :class="showAbort ? 'ms-visible' : 'ms-unvisible'"
    @click="
      {
        abortActive = true;
        this.showAbort = false;
      }
    "
  >
    abort
  </button>
</template>

<script>
import axios from "axios";
import StatsComponentVue from "../general/StatsComponent.vue";
import DetectorComponent from "../general/DetectorComponent.vue";
import AnalyticsTableComponent from "../general/AnalyticsTableComponent.vue";
import { mapActions, mapGetters } from "vuex";
import { AtomSpinner } from "epic-spinners";

export default {
  name: "MainDashboard",

  components: { StatsComponentVue, DetectorComponent, AnalyticsTableComponent, AtomSpinner },

  data() {
    return {
      currentDetector: "for-continue-increment",
      //ignored is like this because refactor on api is required
      revStateFields: [
        { name: "Unreviewed", value: 0 },
        { name: "False Positive", value: 1 },
        { name: "Ignored", value: 5 },
        { name: "TP Useless", value: 2 },
        { name: "TP Niceish", value: 3 },
        { name: "TP Explotable", value: 4 },
      ],
      revState: 0,
      isDetectorBusy: true,
      isTablesBusy: true,
      isAnalysisBusy: true,
      showAbort: false,
      abortActive: false,
      lastclickedID: "",
      puttedRows: [],
    };
  },

  computed: {
    ...mapGetters([
      "getDetectors",
      "getTables",
      "getAuthToken",
      "getAnalysisCount",
      "getFlaggedContracts",
      "getCompilationErrors",
    ]),

    getRevState() {
      return this.revState;
    },

    filteredTables() {
      if (this.puttedRows.length <= 0) {
        return this.getTables;
      } else {
        return this.getTables.filter((table) => {
          return !this.puttedRows.includes(table.ID);
        });
      }
    },

    getTotalErrors() {
      if (this.getCompilationErrors) {
        return this.getCompilationErrors.reduce((acc, curr) => acc + curr.count, 0);
      }
    },

    getTotalFlagged() {
      if (this.getFlaggedContracts) {
        const totalFlagged = [];
        for (let flagged in this.getFlaggedContracts) {
          totalFlagged.push(this.getFlaggedContracts[flagged]);
        }
        return totalFlagged.reduce((acc, curr) => acc + curr);
      }
    },

    getDetectorAnalysisPercentage() {
      if (this.getFlaggedContracts && this.getCompilationErrors && this.getAnalysisCount) {
        const totalErrors = this.getTotalErrors + this.getTotalFlagged;
        return ((this.getAnalysisCount.count * 100) / totalErrors).toFixed(2);
      }
    },

    orderDetectors() {
      if (this.getDetectors) {
        return this.getDetectors.sort();
      }
    },
  },

  methods: {
    ...mapActions(["fetchDetectors", "fetchTables", "fetchAnalysisCount", "fetchCompilationErrors"]),

    handleDetector(detectorName) {
      this.currentDetector = detectorName;
    },

    addToPutted(id, revState) {
      console.log(id, revState);
      this.puttedRows.push(id);
      this.putRev(id, revState);
    },

    putRev(id, revState) {
      this.lastclickedID = id;
      this.showAbort = true;
      let abortTimeout = setTimeout(() => {
        if (this.abortActive && id === this.lastclickedID) {
          this.puttedRows.pop();
          clearTimeout(abortTimeout);
          return;
        }
        this.showAbort = false;
        this.putCall(id, revState);
      }, 5000);
    },

    formatNumber(number) {
      if (number) {
        const formattedNumber = number
          .toLocaleString("en-US", {
            useGrouping: true,
            minimumFractionDigits: 0,
          })
          .replace(/,/g, "'"); //Remove the replace if you want separators at the bottom
        return formattedNumber;
      }
    },

    putCall(id, revState) {
      const endpoint = `http://65.108.85.188:3000/api/manualRevision/${id}/${this.currentDetector}/${revState}`;

      const headers = {
        Accept: "application/json",
        authtoken: this.getAuthToken,
      };

      axios.put(endpoint, null, { headers }).then((res) => {
        if (res.data.error === undefined || res.data.error === null) {
          console.log("put success");
        } else {
          console.log(res.data.error);
        }
        this.showAbort = false;
      });
    },
  },

  created() {
    this.fetchDetectors().then(() => (this.isDetectorBusy = false));
    this.fetchTables({ detector: this.currentDetector, revState: this.revState, offset: 0 }).then(
      () => (this.isTablesBusy = false)
    );
    this.fetchAnalysisCount(this.currentDetector).then(() => (this.isAnalysisBusy = false));
    this.fetchCompilationErrors();
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

.ms-radio {
  &:checked {
    background-color: $tertiary-blue;
    border: $secondary-blue;
  }
}

.ms-unvisible {
  top: 20px;
  right: -100px;
  opacity: 1;
  transition: opacity 6s ease-in, right 1s ease;
}

.ms-visible {
  top: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 6s ease-in-out, right 1s ease-out;
}

.analytics-table {
  margin: 0 15px;
}
</style>
