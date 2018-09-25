<template>
  <div class="searchItems container p-3">
    <form @submit.prevent="search" class="input-group">
      <input type="text" class="form-control" autocomplete="false" placeholder="Search ..." 
      v-model="searchText">
      <div class="input-group-append">
        <button @click="search" class="btn"><i class="fas fa-search"></i></button>
      </div>
    </form>
    <div class="row">
     <div class="col-md-4" v-for="item in searchItem" :key="item.id">
      <div class="card m-2">
        <div class="card-header">
          <h4>
            {{ item.name }}
          </h4>
        </div>
        <div class="card-content p-3">
          <p>
            <strong>Description:</strong>
            {{ item.description }}
          <p>
            <strong>Quantity:</strong> {{ item.quantity }}
          </p>
          <p>
            <strong>Price:</strong> {{ item.price }}
            <img v-if="item.imgData" :src="item.imgData || ''" alt="preview image" class="preview-img float-right t-3">
          </p>
        </div>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchItems",
  data() {
    return {
      searchText: '',
      searchedItems: []
    }
  },
  methods: {
    search() {
      this.$store.dispatch('SEARCH', this.searchText);
    }
  },
  computed: {
    searchItem() {
      return this.$store.state.searchedItems
    }
  }
};
</script>

<style>
.preview-img {
    width: 50px;
    height: auto;
    border: 1px solid black;
    transition: all .3s ease .2s;
    top: 15px;
  }
  .preview-img:hover {
    width: 95%;
    height: auto;
    float: none;
  }
</style>
