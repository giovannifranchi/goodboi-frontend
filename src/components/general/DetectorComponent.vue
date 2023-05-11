<template>
  <button type="button" class="btn ms-btn" @click="handleClick()">
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

<style lang="scss" scoped>
@use '../../assets/partials/variables' as *;

.ms-btn {
  background-color: $secondary-blue;
  color: #fff;
}

</style>
