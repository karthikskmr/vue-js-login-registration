import { createRouter, createWebHistory } from "vue-router";
import RegistrationView from "../views/RegistrationView.vue";

const routes = [
  {
    path: "/",
    name: "registrtion",
    component: RegistrationView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
      meta: { requiresAuth: false },
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
      meta: { requiresAuth: true },
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  if (!isAuthenticated() && to.matched.some(record => record.meta.requiresAuth)) {
    next({ name: 'login'});
  } else {
    next();
  }
} );

function isAuthenticated() {
  const token = localStorage.getItem('authData');
  return token !== null && token !== undefined;
}
export default router;
