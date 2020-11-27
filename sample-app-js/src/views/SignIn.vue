<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <!-- <div v-if="foo">
        <v-text-field v-my-example="exampleHandler" />
      </div>
      <p v-text="bar" /> -->
      <!-- <my-example v-model="parentValue" @input="parentValue = $event" /> -->
      <my-example
        v-model="parentValue"
        counter="10"
        clearable
        @click:clear="customEventHandler"
        @customEvent="customEventHandler"
      />
      <p class="display-1 py-12">サンプルアプリケーションにサインインする</p>
      <div>
        <v-btn
          width="300"
          large
          color="#1da1f2"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS1
        </v-btn>
      </div>
      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#dd2a7b"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS2
        </v-btn>
      </div>
      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#3b5998"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS3
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';
import MyExample from '../components/MyExample.vue';
// import { profileStore, profileMockData } from '@/store/profile';
// import { signInAsync } from '@/store/profile';
// import { myExample } from '@/directive/my-example';

export default defineComponent({
  components: { MyExample },
  // directives: {
  //   myExample,
  // },
  setup(prop, context) {
    console.log('親コンポーネント: created');

    const state = reactive({
      // foo: null,
      // bar: null,
      parentValue: { foo: 'foo', bar: 'bar' },
    });
    /**
     * サインインします。
     */
    // const signIn = () => {
    //   profileStore.profile = profileMockData;
    //   context.root.$router.push('/');
    // };
    const signIn = async () => {
      try {
        // await signInAsync();
        await context.root.$store.dispatch('profile/signIn');
        context.root.$router.push('/');
      } catch (error) {
        console.log('error: ', error);
      }
    };
    // const exampleHandler = event => {
    //   console.log('event.target.value: ', event.target.value);
    // };

    const customEventHandler = value => {
      console.log('value: ', value);
    };

    onMounted(() => {
      console.log('親コンポーネント: mounted');
    });

    return {
      ...toRefs(state),
      signIn,
      // exampleHandler,
      customEventHandler,
    };
  },
});
</script>
