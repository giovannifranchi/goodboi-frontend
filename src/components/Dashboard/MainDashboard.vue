<template>
  <main>
    <div class="container">
      <StatsComponentVue  class="py-5"/>

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
            <AnalyticsTableComponent :info="getTables"/>
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
    };
  },

  computed: {

    ...mapGetters(["getDetectors"]),


    getTables(){
        return store.mokup.tableRows;
    }
  },

  methods: {
    ...mapActions(["fetchDetectors"]),

    handleDetector(detectorName){
        this.currentDetector = detectorName;
        console.log(detectorName);
    }
  },

  created(){
    this.fetchDetectors();
  }
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

main {
  background-color: $header-color;
}
</style>
