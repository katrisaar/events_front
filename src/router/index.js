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
import CreateEventView from "@/views/CreateEventView.vue";
import EventView from "@/views/EventView.vue";
import EditEventView from "@/views/EditEventView.vue";
import HighlightedEventsView from "@/views/HighlightedEventsView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/highlighted',
    name: 'highlightedRoute',
    component: HighlightedEventsView
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
    path: '/createevent',
    name: 'createEventRoute',
    component: CreateEventView
  },
  {
    path: '/event',
    name: 'eventRoute',
    component: EventView
  },
  {
    path: '/editprofile',
    name: 'editProfileRoute',
    component: EditProfileView
  },
  {
    path: '/editevent',
    name: 'editEventRoute',
    component: EditEventView
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
