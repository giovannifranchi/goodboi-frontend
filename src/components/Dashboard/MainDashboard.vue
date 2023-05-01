<template>
  <main>
    <div class="container">
      <StatsComponentVue class="py-5" />

      <!-- Rev State radios -->
      <h3>Revision State</h3>
      <div class="row row-cols-5">
        <div class="col" v-for="(radio, index) in 5" :key="index">
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
            <label class="form-check-label" :for="`rev${index}`">{{ index }}</label>
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
            :class="currentDetector === detector.name ? 'active' : ''"
          />
        </div>
      </div>

      <div class="row py-3">
        <div class="col">
          <AnalyticsTableComponent :info="getTables" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { store } from "../../store/store";
import StatsComponentVue from "../general/StatsComponent.vue";
import DetectorComponent from "../general/DetectorComponent.vue";
import AnalyticsTableComponent from "../general/AnalyticsTableComponent.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MainDashboard",

  components: { StatsComponentVue, DetectorComponent, AnalyticsTableComponent },

  data() {
    return {
      store,
      currentDetector: store.mokup.detectors[0].name,
      revState: 0,
    };
  },

  computed: {
    ...mapGetters(["getDetectors"]),

    getTables() {
      return store.mokup.tableRows;
    },
  },

  methods: {
    ...mapActions(["fetchDetectors"]),

    handleDetector(detectorName) {
      this.currentDetector = detectorName;
    },
  },

  created() {
    this.fetchDetectors(this.revState);
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

main {
  background-color: $header-color;
}
</style>
