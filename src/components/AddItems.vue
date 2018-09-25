<template>
  <div class="add-items container p-3">
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
            <input type="text" class="form-control" id="description" v-model="item.description">
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
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                // Read image as base64 and set to imageData
                this.item.imgData = e.target.result;
            }
            // Start the reader job - read file as a data url (base64 format)
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
