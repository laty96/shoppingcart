<template>
  <div class="add-items p-3 row">
    <div class="col-md-4 offset-md-4">
    <div class="card">
      <div class="card-header bg-info text-white"><strong>Add new item</strong></div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="itemName">Name</label>
            <input type="text" class="form-control" id="itemName" v-model="item.name">
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea class="form-control" id="description" v-model="item.description"></textarea>
          </div>
          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input type="number" class="form-control" id="quantity" v-model="item.quantity">
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input type="number" class="form-control" id="price" v-model="item.price">
          </div>
           <div class="form-group">
            <label for="image">Image:</label>
            <input type="file" class="form-control" id="image" ref="myFiles" v-on:change="convertImg">
          </div>
        </form>
      </div> 
      <div class="card-footer">
        <button type="button" class="btn btn-primary float-right" @click="addItem">Submit</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemModel from '../models/item.js'

export default {
  name: "AddItems",
  data() {
    return {
      item: {
        id: '',
        name: 'item' + Math.floor(Math.random()*100),
        description: 'desc',
        quantity: Math.floor(Math.random()*100) ,
        price: Math.floor(Math.random()* 100) ,
        imgData: null
      }
    }
  },
  methods: {
    addItem() {
      let a = new itemModel(this.item);
      this.$store.dispatch('ADD_SHOP_ITEM', a) 
      this.item = {
        id: '',
        name: 'item' + Math.floor(Math.random()*100),
        description: 'desc',
        quantity: Math.floor(Math.random()*100) ,
        price: Math.floor(Math.random()* 100) ,
        imgData: null
      }     
    },
    convertImg(event) {
      var input = event.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.item.imgData = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>
