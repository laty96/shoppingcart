<template>
  <div class="viewItems container p-3">
    <div class="row">
     <div class="col-md-4" v-for="item in items" :key="item.id">
      <div class="card m-2">
        <div class="card-header">
          <button class="btn float-right" @click="removeItem(item)"><i class="fas fa-times"></i></button>
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
        <div class="card-footer">
          <button class="btn btn-primary float-right" @click="addToCart(item)">Add to cart</button>
        </div>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
import cartItem from '../models/cartItem.js'

export default {
  name: "ViewItems",
  created() {
    this.$store.dispatch('FETCH_SHOP_ITEMS')
  },
  computed: {
    items() {
      return this.$store.state.items
    }
  },
  methods: {
    removeItem(item) {
      this.$store.dispatch('REMOVE_SHOP_ITEM', item);
    },
    addToCart(item) {
      let i = item;
      i.id = this.$store.getters.itemInCartID;
      let e = new cartItem(i);
      this.$store.dispatch("ADD_CART_ITEM", e);
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
