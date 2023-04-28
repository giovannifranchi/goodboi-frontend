<template>
  <button type="button" class="btn btn-primary" @click="handleClick()">
    {{ detectorName }}
    <span class="badge text-bg-secondary">{{ detectorCount }}</span>
  </button>
</template>

<script>
export default {
  name: "DetectorComponent",

  props: {
    detectorName: {
      type: String,
      required: true,
    },

    detectorCount: {
      type: Number,
      required: true,
    },
  },

  emits: ['handle-click'],

  methods: {
    handleClick(){
        this.$emit('handle-click', this.detectorName);
    }
  }

};
</script>

<style lang="scss" scoped></style>
