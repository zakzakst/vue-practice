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

<script>
import Vue from "vue";

export function User(nickname, email) {
  this.nickname = nickname;
  this.email = email;
}

export default Vue.extend({
  props: {
    user: {
      type: User,
      required: true
    }
  },
  data() {
    return { editable: false };
  },
  methods: {
    edit() {
      this.editable = true;
      this.$nextTick(() => {
        this.$refs.editNickname.focus();
      });
    }
  }
});
</script>

<style>
td input {
  width: 95%;
}
</style>
