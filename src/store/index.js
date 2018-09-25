import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

import { shopItemsKey, cartItemsKey } from "./variables";
import { reId } from "../utilities/uti";
import db from "../database/firestore.js";

Vue.use(Vuex);
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
// const firebaseDb = firebase.database().ref();
var state = {
	// items: JSON.parse(localStorage.getItem(shopItemsKey) || "[]"),
	items: [],
	itemsInCart: [],
	searchedItems: []
};
var getters = {
	itemID: state => {
		return state.items.length;
	},
	itemInCartID: state => {
		return JSON.parse(localStorage.getItem(cartItemsKey) || "[]").length || 0;
	},
	items: state => {
		return state.items;
	}
};
var mutations = {
	setShopItem(state, item) {
		console.log(item);
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
		console.log(items);
	},
	fetchCartItems(state, items) {
		state.itemsInCart = items;
		console.log(items);
	},
	searchItems(state, items) {
		state.searchedItems = items;
		console.log(items);
	}
};

var actions = {
	ADD_SHOP_ITEM(context, item) {
		item.id = this.state.items.length
			? this.state.items[this.state.items.length - 1].id + 1
			: 0;
		console.log("ADD_SHOP_ITEM" + item);
		context.commit("setShopItem", item);
	},
	ADD_CART_ITEM(context, item) {
		item.id = this.state.itemsInCart.length
			? this.state.itemsInCart[this.state.itemsInCart.length - 1].id + 1
			: 0;
		context.commit("setCartItem", item);
	},
	REMOVE_SHOP_ITEM(context, item) {
		db.collection("shopItems")
			.where("id", "==", item.id)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					doc.ref.delete();
				});
			});
		context.commit("removeShopItem", item);
	},
	REMOVE_CART_ITEM(context, item) {
		db.collection("cartItems")
			.where("id", "==", item.id)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					doc.ref.delete();
				});
			});
		context.commit("removeCartItem", item);
	},
	FETCH_SHOP_ITEMS(context) {
		db.collection("shopItems")
			.orderBy("id", "asc")
			.get()
			.then(function(querySnapshot) {
				let a = [];
				querySnapshot.forEach(function(doc) {
					a.push(doc.data());
					console.log(doc.data());
				});
				context.commit("fetchShopItems", a);
			});
	},
	FETCH_CART_ITEMS(context) {
		db.collection("cartItems")
			.orderBy("id", "asc")
			.get()
			.then(function(querySnapshot) {
				let a = [];
				querySnapshot.forEach(function(doc) {
					a.push(doc.data());
					console.log(doc.data());
				});
				context.commit("fetchCartItems", a);
			});
	},
	SEARCH(context, item) {
		db.collection("shopItems")
			.where("name", "==", item)
			.orderBy("id", "asc")
			.get()
			.then(function(querySnapshot) {
				let a = [];
				querySnapshot.forEach(function(doc) {
					a.push(doc.data());
				});
				context.commit("searchItems", a);
			});
	},
	CHECKOUT(c, i) {
		db.collection("checkoutList")
			.add({
				i,
				date: Date.now()
			})
			.then(doc => doc.id)
			.catch(err => console.log(err));
	}
};
var plugins = [
	store => {
		store.subscribe((mutation, data) => {
			// let ref = firebase.database();
			// let shopItems = ref.ref("shopItems");
			// let cartItems = ref.ref("cartItems");
			// console.log(data.items[0]);
			if (mutation.type === "setShopItem") {
				console.log(mutation.type);
				db.collection("shopItems")
					.add(Object.assign({}, mutation.payload))
					.then(function(docRef) {
						console.log("Document written with ID: ", docRef.id);
					})
					.catch(function(error) {
						console.error("Error adding document: ", error);
					});
				console.log(data);
			}
			if (mutation.type === "setCartItem") {
				console.log("2");

				db.collection("cartItems")
					.add(Object.assign({}, mutation.payload))
					.then(function(docRef) {
						console.log("Document written with ID: ", docRef.id);
					})
					.catch(function(error) {
						console.error("Error adding document: ", error);
					});
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
