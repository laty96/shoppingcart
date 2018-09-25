<template>
  <div class="buy-items container p-3">
    <div class="card" v-if="itemsInCart.length">
      <div class="card-header">
        <h4>
          Checkout
        </h4>
      </div>
      <div class="card-content">
        <table class="table table-bordered text-right">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in itemsInCart" :key="item.id">
              <td class="pt-3">{{ +item.id+1 }}</td>
              <td class="pt-3">{{ item.name }}</td>
              <td>
              <input type="number" class="form-control form-control-sm" 
              v-model="item.quantity" min="1" v-bind:max="item.stock"
               @input="updatePrice(item)">
              </td>
              <td class="pt-3">{{ item.price }}</td>
              <td class="pt-3">&nbsp; {{ item.total }} &nbsp;
              <button class="btn badge badge-secondary" @click="removeCartItem(item)"><i class="fas fa-times"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary float-right" @click="checkout">Checkout</button>
      </div>
    </div>
    <h2 v-else-if="checkoutMessage">{{checkoutMessage}}</h2>
    <h2 v-else>Nothing in cart</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Checkout",
  created() {
    this.$store.dispatch('FETCH_CART_ITEMS')
  },
  computed: mapState([
    'itemsInCart',
    'checkoutMessage'
  ]),
  methods: {
    removeCartItem(item) {
      this.$store.dispatch("REMOVE_CART_ITEM", item)
    },
    updatePrice(item) {
      item.total = item.price * item.quantity
    },
    checkout() {
      this.$store.dispatch('CHECKOUT', this.itemsInCart);
      this.$store.dispatch('DELETE_CART');

    }
  }
};
</script>

<style>
</style>
