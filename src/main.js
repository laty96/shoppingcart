// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { store } from "./store";
import router from "./router/index";
// import VueFire from "vuefire";
import * as firebase from "firebase";
import firebaseConfig from "./configs/firebase.config";

// Vue.use(VueFire);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: "#app",
	components: { App },
	router,
	store,

	template: "<App/>"
});
