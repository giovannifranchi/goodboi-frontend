<template>
  <div class="d-flex flex-column gap-3 align-items-center" v-if="!showTPButtons">
    <button type="button" class="btn btn-danger w-100">FP</button>
    <button type="button" class="btn btn-success w-50" @click="showTPButtons = true">TP</button>
  </div>
  <div class="d-flex flex-column gap-3 align-items-center" v-else>
    <button type="button" class="btn btn-danger w-100" @click="showTPButtons = false">Useless</button>
    <button type="button" class="btn btn-warning w-100" @click="showTPButtons = false">Nice</button>
    <button type="button" class="btn btn-success w-auto" @click="showTPButtons = false">Explotable</button>
  </div>
</template>

<script>
export default {
  name: "ManualReviewComponent",

  data(){
    return {
        showTPButtons: false,
    }
  }
};
</script>

<style lang="scss" scoped></style>
