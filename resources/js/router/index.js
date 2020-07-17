import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import Notes from "../components/notes/NoteCategories.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
  },
  {
    path: '*',
    redirect: { name: 'Dashboard' },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
