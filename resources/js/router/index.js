import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import Notes from "../components/notes/NoteCategories.vue";
import SignIn from "../components/auth/SignIn.vue";
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "*",
    redirect: { name: "Dashboard" }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.name !== "SignIn" && !token) {
    store.commit('setUserData', null);
    store.commit("setUserToken", null);
    next({ name: "SignIn" });
  } else if (to.name === "SignIn" && token) {
    next({ name: "Dashboard" });
  } else next();
});

export default router;
