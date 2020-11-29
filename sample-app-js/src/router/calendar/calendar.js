// import CalendarComponent from '@/views/Calendar.vue';

export const calendarRoutes = [
  {
    path: '/calendar/:type',
    name: 'calendar',
    // component: CalendarComponent,
    component: () =>
      import(/* webpackChunkName: "calendar" */ '@/views/Calendar.vue'),
    props: true,
    meta: {
      title: 'calendar',
    },
  },
];
