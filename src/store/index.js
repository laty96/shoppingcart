import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

import db from "../database/firestore.js";
import query from "../database/dataQuery.js";

Vue.use(Vuex);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

var state = {
	items: [],
	itemsInCart: [],
	searchedItems: [],
	checkoutMessage: ""
};
var getters = {
	itemID: state => {
		return state.items.length;
	},
	itemInCartID: state => {
		return state.itemsInCart.length;
	},
	items: state => {
		return state.items;
	}
};
var mutations = {
	setShopItem(state, item) {
		state.items.push(item);
	},
	setCartItem(state, itemsInCart) {
		state.itemsInCart.push(itemsInCart);
	},
	removeShopItem(state, item) {
		state.items.splice(state.items.indexOf(item), 1);
	},
	removeCartItem(state, item) {
		state.itemsInCart.splice(state.itemsInCart.indexOf(item), 1);
	},
	fetchShopItems(state, items) {
		state.items = items;
	},
	fetchCartItems(state, items) {
		state.itemsInCart = items;
	},
	searchItems(state, items) {
		state.searchedItems = items;
	},
	checkout(state, mes) {
		state.checkoutMessage = mes;
		state.itemsInCart = [];
	}
};

var actions = {
	ADD_SHOP_ITEM(context, item) {
		item.id = this.state.items.length
			? +this.state.items[this.state.items.length - 1].id + 1
			: 0;
		context.commit("setShopItem", item);
	},
	ADD_CART_ITEM(context, item) {
		item.id = this.state.itemsInCart.length
			? +this.state.itemsInCart[this.state.itemsInCart.length - 1].id + 1
			: 0;
		context.commit("setCartItem", item);
	},
	REMOVE_SHOP_ITEM(context, item) {
		query.deleteQuery("shopItems", "id", "==", item.id, db);
		context.commit("removeShopItem", item);
	},
	REMOVE_CART_ITEM(context, item) {
		query.orderedQuery("shopItems", "id", db, async b => {
			context.commit("fetchShopItems", await b);
		});
	},
	FETCH_SHOP_ITEMS(context) {
		query.orderedQuery("shopItems", "id", db, async b => {
			context.commit("fetchShopItems", await b);
		});
	},
	FETCH_CART_ITEMS(context) {
		query.orderedQuery("cartItems", "id", db, async b => {
			context.commit("fetchCartItems", await b);
		});
	},
	SEARCH(context, item) {
		query.searchQuery("shopItems", "name", "==", item, db, async b => {
			context.commit("searchItems", b);
		});
	},
	CHECKOUT(c, i) {
		db.collection("checkoutList")
			.add({
				i,
				date: Date.now()
			})
			.then(doc => {
				c.commit("checkout", "Checkout success");
				c.commit("checkout", "Checkout success");
			})
			.catch(err => (this.state.checkoutMessage = "Checkout failed"));
	},
	DELETE_CART(c) {
		db.collection("cartItems")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					doc.ref.delete();
				});
			});
	}
};
var plugins = [
	store => {
		store.subscribe((mutation, data) => {
			if (mutation.type === "setShopItem") {
				query.addQuery("shopItems", mutation.payload, db, doc => {}, err => {});
			}
			if (mutation.type === "setCartItem") {
				query.addQuery("cartItems", mutation.payload, db, doc => {}, err => {});
			}
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
