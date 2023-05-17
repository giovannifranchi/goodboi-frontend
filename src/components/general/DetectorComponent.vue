<template>
  <button
    type="button"
    class="btn ms-btn"
    @click="handleClick()"
    @mouseenter="showRefreash = true"
    @mouseleave="showRefreash = false"
  >
    {{ detectorName }}
    <span class="badge text-bg-secondary" v-if="isBusy"><AtomSpinner :size="20" color="#fff" /></span>
    <a v-else @click.stop="()=>{
      isBusy = true;
      getDetectorCount();
    }">
      <span class="badge text-bg-secondary">
        <template v-if="!showRefreash">{{ detectorCount }}</template>
        <template v-else><font-awesome-icon icon="fa-solid fa-arrows-rotate" /></template>
      </span>
    </a>
  </button>
</template>

<script>
import { mapGetters } from "vuex";
import { AtomSpinner } from "epic-spinners";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "DetectorComponent",

  data() {
    return {
      isBusy: true,
      detectorCount: null,
      showRefreash: false,
    };
  },

  props: {
    detectorName: {
      type: String,
      required: true,
    },

    revState: {
      type: Number,
      required: true,
    },
  },

  components: { AtomSpinner, FontAwesomeIcon },

  emits: ["handle-click"],

  computed: {
    ...mapGetters(["getAuthToken"]),
  },

  methods: {
    handleClick() {
      this.$emit("handle-click", this.detectorName);
    },

    async getDetectorCount() {
      const endpoint = `${import.meta.env.VITE_BASE_URI}/api/hitscount/${this.detectorName}/${this.revState}`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authtoken: this.getAuthToken,
      };
      const response = await axios.get(endpoint, { headers });
      this.detectorCount = response.data.count;
      this.isBusy = false;
    },
    greeting(){
         console.log('refresh has been cliccked');
    },
  },

  watch: {
    revState(newValue) {
      this.isBusy = true;
      this.getDetectorCount();
    },
  },

  created() {
    this.getDetectorCount();
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

.ms-btn {
  background-color: $secondary-blue;
  color: #fff;
}
</style>
