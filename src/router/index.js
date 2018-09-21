import Vue from "vue";
import router from "vue-router";

Vue.use(router);

export default new router({
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("@/components/ViewItems")
    },
    {
      name: "addItems",
      path: "/add-items",
      component: () => import("@/components/AddItems")
    },
    {
      name: "viewItems",
      path: "/view-items",
      component: () => import("@/components/ViewItems")
    },
    {
      name: "searchItems",
      path: "/search-items",
      component: () => import("@/components/SearchItems")
    },
    {
      name: "checkout",
      path: "/checkout",
      component: () => import("@/components/Checkout")
    }
  ]
});
