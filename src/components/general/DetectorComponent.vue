<template>
  <button type="button" class="btn ms-btn" @click="handleClick()">
    {{ detectorName }}
    <span class="badge text-bg-secondary" v-if="isBusy"><SemipolarSpinner :size="20" color="#fff"/></span>
    <span class="badge text-bg-secondary" v-else>{{ detectorCount }}</span>
  </button>
</template>

<script>
import { mapGetters } from "vuex";
import {SemipolarSpinner} from 'epic-spinners';
import axios from "axios";

export default {
  name: "DetectorComponent",

  data(){
    return {
      isBusy: true,
      detectorCount: null,
    }
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

  components: {SemipolarSpinner},

  emits: ["handle-click"],

  computed: {
    ...mapGetters(["getAuthToken"]),
  },

  methods: {
    handleClick() {
      this.$emit("handle-click", this.detectorName);
    },
  },

  async created() {
    const endpoint = `${import.meta.env.VITE_BASE_URI}/api/hitscount/${this.detectorName}/${this.revState}`;
    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      authtoken: this.getAuthToken,
    };
    const response = await axios.get(endpoint, {headers});
    this.detectorCount = response.data.count;
    this.isBusy = false;
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
