import Vue from 'vue';
import {
  configure,
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja.json';
import { required, max, ext, size } from 'vee-validate/dist/rules';

const config = {
  bails: false,
  mode: 'eager',
};
configure(config);

extend('required', required);
extend('max', max);
extend('userNameAllowedCharacters', {
  message: '{_field_}は英字、数字、「_」のみ使用できます。',
  validate: value => {
    return /^[0-9A-Z_]*$/i.test(value);
  },
});
extend('ext', ext);
extend('size', size);

localize('ja', ja);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
