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
      this.$emit('pass-id', this.id);


      const endpoint = `http://65.108.85.188:3000/api/manualRevision/${this.id}/${this.detectorName}/${revState}`;

      const headers = {
        "Accept": "application/json",
        "authtoken": this.getAuthToken,

      };

      axios.put(endpoint, null,{ headers }).then((res) => {
        if (res.data.error === undefined || res.data.error === null) {
          console.log("put success");
        } else {
          console.log(res.data.error);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
