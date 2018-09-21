<template>
  <div class="buy-items container p-3">
    <div class="card">
      <div class="card-header">
        <h4>
          Checkout
        </h4>
      </div>
      <div class="card-content">
        <table class="table table-bordered">
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
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  data() {
    return {
      itemsInCart: []
    }
  }
};
</script>

<style>
</style>
