<template>
  <div class="d-flex align-items-center justify-content-center wrapper flex-column">
    <h1 class="mb-5">GoodBoi</h1>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" />
      </div>
      <button type="submit" class="btn btn-primary">login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Authentication",
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variables" as *;
.wrapper {
  height: 100vh;
  background-color: $header-color;
}
</style>
