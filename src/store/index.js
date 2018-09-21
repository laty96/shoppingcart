import Vue from "vue";
import Vuex from "vuex";

import { shopItemsKey } from "./variables";

Vue.use(Vuex);

var state = {
  items: JSON.parse(localStorage.getItem(shopItemsKey) || "[]"),
  itemsInCart: []
};
var getters = {
  itemID: state => {
    return JSON.parse(localStorage.getItem(shopItemsKey) || "[]").length || 0;
  }
};
var mutations = {
  setShopItem(state, item) {
    state.items.push(item);
    if (state.items.length) {
      for (let i in state.items) {
        state.items[i].id = i;
      }
    }
  },
  setCartItem(state, itemsInCart) {
    state.itemsInCart = itemsInCart;
  },
  removeShopItem(state, item) {
    state.items.splice(state.items.indexOf(item, 1));
  }
};
var actions = {
  ADD_SHOP_ITEM: (context, item) => {
    context.commit("setShopItem", item);
  },
  ADD_CART_ITEM(context, item) {
    context.commit("setCartItem", item);
  },
  REMOVE_SHOP_ITEM(context, item) {
    context.commit("removeShopItem", item);
  }
};
var plugins = [
  store => {
    store.subscribe((mutation, { items }) => {
      localStorage.setItem(shopItemsKey, JSON.stringify(items));
    });
  }
];

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins
});
