import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import DashboardView from '@/views/DashboardView.vue';

const isAuthenticated = () => !!localStorage.getItem('accessToken');

const routes = [
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView },
  {
    path: '/dashboard',
    component: DashboardView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next('/login');
      } else {
        next();
      }
    },
  },
  { path: '/logout', component: LoginView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
