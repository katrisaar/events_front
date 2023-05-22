import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ErrorView from "@/views/ErrorView.vue";
import DashboardView from "@/views/DashboardView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import AdminView from "@/views/AdminView.vue";
import EditProfileView from "@/views/EditProfileView.vue";
import EventsView from "@/views/EventsView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView
  },
  {
    path: '/dashboard',
    name: 'dashboardRoute',
    component: DashboardView
  },
  {
    path: '/admin',
    name: 'adminRoute',
    component: AdminView
  },
  {
    path: '/events',
    name: 'eventsRoute',
    component: EventsView
  },
  {
    path: '/register',
    name: 'registerRoute',
    component: RegisterView
  },
  {
    path: '/editprofile',
    name: 'editProfileRoute',
    component: EditProfileView
  },
  {
    path: '/profile',
    name: 'profileRoute',
    component: ProfileView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
