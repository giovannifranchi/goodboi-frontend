<template>
  <main>
    <div class="container">
      <StatsComponentVue />

      <div class="row">
        <div class="col-3" v-for="(detector, index) in getDetectors" :key="index">
          <DetectorComponent
            :detectorName="detector.name"
            :detectorCount="detector.count"
            @handleClick="handleDetector"
            :class="currentDetector === detector.name ? 'active' : ''"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { store } from "../../store/store";
import StatsComponentVue from "../general/StatsComponent.vue";
import DetectorComponent from "../general/DetectorComponent.vue";

export default {
  name: "MainDashboard",

  components: { StatsComponentVue, DetectorComponent },

  data() {
    return {
      store,
      currentDetector: store.mokup.detectors[0].name,
    };
  },

  computed: {
    getDetectors() {
      return store.mokup.detectors;
    },
  },

  methods: {
    handleDetector(detectorName){
        this.currentDetector = detectorName;
        console.log(detectorName);
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

main {
  background-color: $header-color;
}
</style>
