import CalendarComponent from '@/views/Calendar.vue';

export const calendarRoutes = [
  {
    path: '/calendar/:type',
    name: 'calendar',
    component: CalendarComponent,
    props: true,
    meta: {
      title: 'calendar',
    },
  },
];
