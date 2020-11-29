import Vue from 'vue';

Vue.config.errorHandler = (err, vm, info) => {
  console.log('Vue.config.errorHandler', info, err);
  if (
    'isAxiosError' in err &&
    ((err?.config?.method === 'POST' && err?.config?.url === 'log') ||
      err?.response?.status === 401 ||
      err?.response?.status === 422)
  ) {
    return;
  }
};
Vue.config.warnHandler = (msg, vm, trace) => {
  console.log('Vue.config.warnHandler:', msg, trace);
};
window.addEventListener('error', event => {
  console.log('error EventListener:', event.error);
});
window.addEventListener('unhandledrejection', event => {
  console.log('unhandledrejection EventListener', event.reason);
});
