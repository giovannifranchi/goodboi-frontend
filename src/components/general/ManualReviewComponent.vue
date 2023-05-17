<template>
  <div class="d-flex flex-wrap align-items-center mx-1" v-if="!showTPButtons">
    <div class="d-flex justify-content-between w-100">
      <button type="button" class="btn dark-red my-3 py-3" @click="putManualReview(1)">PF</button>
      <button type="button" class="btn dark-red my-3 py-3" @click="putManualReview(5)">IG</button>
    </div>
    <button type="button" class="btn blue w-100" @click="showTPButtons = true">TP</button>
  </div>
  <div class="d-flex flex-column gap-3 align-items-center mx-1" v-else>
    <button
      type="button"
      class="btn light-blue w-100"
      @click="
        () => {
          showTPButtons = false;
          putManualReview(2);
        }
      "
    >
      Useless
    </button>
    <button
      type="button"
      class="btn mid-blue w-100"
      @click="
        () => {
          showTPButtons = false;
          putManualReview(3);
        }
      "
    >
      Nice
    </button>
    <button
      type="button"
      class="btn blue w-100"
      @click="
        () => {
          showTPButtons = false;
          putManualReview(4);
        }
      "
    >
      Exploit
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ManualReviewComponent",

  props: {
    id: {
      type: Number,
      required: true,
    },

    detectorName: {
      type: String,
      required: true,
    },
  },

  emits: ["pass-id"],

  data() {
    return {
      showTPButtons: false,
    };
  },

  computed: {
    ...mapGetters(["getAuthToken"]),
  },

  methods: {
    putManualReview(revState) {
      this.$emit("pass-id", this.id, revState);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/partials/variables" as *;

.dark-red {
  background-color: $dark-red;
  color: #fff;
}

.blue {
  background-color: $secondary-blue;
  color: #fff;
}

.btn-fp {
  width: calc(100% / 2 - 5px);
}

.ms-margin {
  margin-right: 5px;
}

.mid-blue {
  background-color: $tertiary-blue;
  color: #fff;
}

.light-blue {
  background-color: $dark-red;
  color: #fff;
}
</style>
