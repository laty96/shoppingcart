<template>
  <div class="searchItems container p-3">
    <div class="input-group">
      <input type="text" class="form-control" autocomplete="false" placeholder="Search ..." v-model="searchText">
      <div class="input-group-append">
        <button class="btn"><i class="fas fa-search"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItems",
  data() {
    return {
      searchText: ''
    }
  }
};
</script>

<style>
</style>
