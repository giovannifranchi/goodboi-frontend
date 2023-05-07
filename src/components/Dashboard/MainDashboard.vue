<template>
  <main>
    <div class="container">
      <StatsComponentVue class="py-5" />

      <!-- Rev State radios -->
      <h3>Revision State</h3>
      <div class="row row-cols-5 w-50">
        <div class="col d-flex justify-content-center" v-for="(radio, index) in revStateFields" :key="index">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              :id="`rev${index}`"
              :checked="index === 0"
              v-model="revState"
              :value="index"
              @change="fetchDetectors(revState)"
            />
            <label class="form-check-label" :for="`rev${index}`">{{ radio }}</label>
          </div>
        </div>
      </div>
      <!-- TODOs: add a spinner component also here to handle the lag in fetchDetectors call ath radio button change -->

      <div class="row py-5">
        <div class="col-3" v-for="(detector, index) in getDetectors" :key="index">
          <DetectorComponent
            :detectorName="detector.name"
            :detectorCount="detector.count"
            @handleClick="handleDetector"
            @click="fetchTables({ detector: this.currentDetector, revState: this.revState, offset: 0 })"
            :class="currentDetector === detector.name ? 'active' : ''"
          />
        </div>
      </div>

      <div class="row py-3">
        <div class="col">
          <AnalyticsTableComponent
            :info="filteredTables"
            :currentDetector="currentDetector"
            @re-pass-id="addToPutted"
          />
        </div>
      </div>
    </div>
  </main>

  <button class="btn btn-danger position-fixed top-0 end-0" v-show="showAbort" @click="abortActive = true">
    abort
  </button>
</template>

<script>
import axios from "axios";
import StatsComponentVue from "../general/StatsComponent.vue";
import DetectorComponent from "../general/DetectorComponent.vue";
import AnalyticsTableComponent from "../general/AnalyticsTableComponent.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MainDashboard",

  components: { StatsComponentVue, DetectorComponent, AnalyticsTableComponent },

  data() {
    return {
      currentDetector: "unprotected-write",
      revStateFields: ['Unreviewed', 'FP', 'TP_Useless', 'TP_Niceish', 'TP_Explotable'],
      revState: 0,
      showAbort: false,
      abortActive: false,
      lastclickedID: "",
      puttedRows: [],
    };
  },

  computed: {
    ...mapGetters(["getDetectors", "getTables", "getAuthToken"]),

    filteredTables() {
      if (this.puttedRows.length <= 0) {
        return this.getTables;
      } else {
        return this.getTables.filter((table) => {
          return !this.puttedRows.includes(table.ID);
        });
      }
    },
  },

  methods: {
    //you need to move the put call in here which is triggered by the handle id emit
    ...mapActions(["fetchDetectors", "fetchTables"]),

    handleDetector(detectorName) {
      this.currentDetector = detectorName;
    },

    logQuery(query) {
      console.log(query.detector, query.revState);
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
        this.showAbort = false;
        if (this.abortActive && id === this.lastclickedID) {
          this.abortActive = false;
          this.puttedRows.pop();
          clearTimeout(abortTimeout);
          return;
        }
        this.putCall(id, revState);
      }, 5000);
    },

    putCall(id, revState) {
      const endpoint = `http://65.108.85.188:3000/api/manualRevision/${id}/${this.currentDetector}/${revState}`;

      const headers = {
        "Accept": "application/json",
        "authtoken": this.getAuthToken,
      };

      axios.put(endpoint, null, { headers }).then((res) => {
        if (res.data.error === undefined || res.data.error === null) {
          console.log("put success");
        } else {
          console.log(res.data.error);
        }
      });
      
    },
  },

  async created() {
    await this.fetchDetectors(this.revState);
    await this.fetchTables({ detector: this.currentDetector, revState: this.revState, offset: 0 });
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

main {
  background-color: $header-color;
}
</style>
