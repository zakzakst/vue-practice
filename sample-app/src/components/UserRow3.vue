<template>
  <tr>
    <td>
      <span v-if="!editable" @click="edit()">{{ user.nickname }}</span>
      <input
        v-show="editable"
        ref="editNickname"
        v-model="user.nickname"
        @blur="editable = false"
      />
    </td>
    <td>{{ user.email }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, PropType } from "@vue/composition-api";

export interface User {
  nickname: string;
  email: string;
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup() {
    const editable = ref(false);
    const editNickname = ref<HTMLFormElement | null>(null);

    const edit = () => {
      editable.value = true;
      nextTick(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        editNickname.value!.focus();
      });
    };

    return {
      editable,
      editNickname,
      edit
    };
  }
});

// import { Component, Vue, Prop } from "vue-property-decorator";

// export interface User {
//   nickname: string;
//   email: string;
// }

// type Refs<T extends object> = Vue["$refs"] & T;

// @Component
// export default class UserRowComponent extends Vue {
//   $refs!: Refs<{
//     editNickname: HTMLFontElement;
//   }>;

//   @Prop({ required: true })
//   private user!: User;

//   private editable = false;

//   private edit() {
//     this.editable = true;
//     this.$nextTick(() => {
//       (this.$refs.editNickname as HTMLFontElement).focus();
//     });
//   }
// }
</script>

<style>
td input {
  width: 95%;
}
</style>
