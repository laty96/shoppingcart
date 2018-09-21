<template>
  <div class="home">
    <div class="header">
      <h1>
        Test
      </h1>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link p-2">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="add-items" class="nav-link p-2">Add Items</router-link>
          </li>
          <li class="nav-item">
            <router-link to="search-items" class="nav-link p-2">Search Items</router-link>
          </li>
          <li class="nav-item">
            <router-link to="view-items" class="nav-link p-2">View Items</router-link>
          </li>
          <li class="nav-item">
            <router-link to="checkout" class="nav-link p-2">Checkout</router-link>
          </li>
        </ul>
      </nav>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AddItems from "./AddItems";
import SearchItems from "./SearchItems";
import ViewItems from "./ViewItems";
import Checkout from "./Checkout";

export default {
  name: "Home",
  components: {
    AddItems,
    SearchItems,
    ViewItems,
    Checkout
  }
};
</script>

<style scoped>
.nav-link.router-link-exact-active.router-link-active {
  color: #fff;
  background-color: #007bff;
}
h1 {
  text-align: center;
}
</style>
