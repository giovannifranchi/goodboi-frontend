<template>
  <div class="d-flex flex-column gap-3 align-items-center" v-if="!showTPButtons">
    <button type="button" class="btn btn-danger w-100 py-3" @click="putManualReview(1)">FP</button>
    <button type="button" class="btn btn-success w-100" @click="showTPButtons = true">TP</button>
  </div>
  <div class="d-flex flex-column gap-3 align-items-center" v-else>
    <button
      type="button"
      class="btn btn-danger w-100"
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
      class="btn btn-warning w-100"
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
      class="btn btn-success w-100"
      @click="
        () => {
          showTPButtons = false;
          putManualReview(4);
        }
      "
    >
      Exploitable
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

  emits: ['pass-id'], 

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
      this.$emit('pass-id', this.id, revState);
    },
  },
};
</script>

<style lang="scss" scoped></style>
