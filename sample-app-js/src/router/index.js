import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeComponent from '@/views/Home.vue';
// import ProfileComponent from '@/views/Profile.vue';
// import ShareComponent from '@/views/Share.vue';
// import SignInComponent from '@/views/SignIn.vue';

// import CalendarComponent from '@/views/Calendar.vue';
import { calendarRoutes } from '@/router/calendar/calendar';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeComponent,
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      title: 'home',
    },
  },
  ...calendarRoutes,
  // {
  //   path: '/calendar/:type',
  //   name: 'calendar',
  //   component: CalendarComponent,
  //   props: true,
  // },
  {
    path: '/profile',
    name: 'profile',
    // component: ProfileComponent,
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
  },
  {
    path: '/share',
    name: 'share',
    // component: ShareComponent,
    component: () =>
      import(/* webpackChunkName: "share" */ '@/views/Share.vue'),
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    // component: SignInComponent,
    component: () =>
      import(/* webpackChunkName: "signIn" */ '@/views/SignIn.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach(to => {
  if (!to.meta.title) {
    return;
  }
  document.title = to.meta.title;
});

router.beforeEach((to, from, next) => {
  if (to.path === '/sign-in') {
    next();
    return;
  }
  if (store.getters['profile/profile']) {
    next();
    return;
  }
  next('/sign-in');
});

export default router;
