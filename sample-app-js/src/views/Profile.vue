<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" class="text-center">
      <p class="display-1 py-12">プロフィール</p>
      <v-row>
        <v-col cols="12" md="4">
          <v-avatar :color="profile.themeColor" size="72">
            <span class="white--text body-2" v-text="profile.nickname" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="画像を選択してください"
            prepend-icon="photo_camera"
            label="アバター"
            :error-count="Number.MAX_VALUE"
            :error-messages="avatarErrors"
            @change="saveFileContent"
          />
        </v-col>
      </v-row>
      <label class="v-label theme--light">テーマカラー*</label>
      <v-color-picker
        v-model="newThemeColor"
        class="mx-auto mb-4 mt-2"
        hide-canvas
        show-swatches
        swatches-max-height="120px"
      />
      <v-btn small rounded color="primary" @click="saveThemeColor">
        テーマカラーを決定する
      </v-btn>
      <v-text-field
        v-model="profile.userName"
        readonly="readonly"
        label="ユーザー名"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editUserName"
      />
      <v-dialog
        v-model="isOpenEditUserNameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <!-- <ValidationObserver v-slot="{ invalid }"> -->
          <ValidationObserver ref="userNameValidationObserver">
            <ValidationProvider
              v-slot="{ errors }"
              name="ユーザー名"
              :rules="validationRules.userName"
            >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="newUserName"
                      label="ユーザー名*"
                      :error-count="Number.MAX_VALUE"
                      :error-messages="errors"
                    />
                  </v-row>
                </v-container>
              </v-card-text>
            </ValidationProvider>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="closeEditUserNameDialog"
              >
                キャンセル
              </v-btn>
              <!-- <v-btn
                color="blue darken-1"
                text
                :disabled="invalid"
                @click="saveUserName"
              > -->
              <v-btn
                color="blue darken-1"
                text
                :disabled="userNameSaveDisabled"
                @click="saveUserName"
              >
                保存する
              </v-btn>
            </v-card-actions>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.nickname"
        readonly="readonly"
        label="ニックネーム*"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editNickname"
      />
      <v-dialog
        v-model="isOpenEditNicknameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <!-- <ValidationObserver v-slot="{ invalid }"> -->
          <ValidationObserver ref="nicknameValidationObserver">
            <ValidationProvider
              v-slot="{ errors }"
              name="ニックネーム"
              :rules="validationRules.nickname"
            >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="newNickname"
                      label="ニックネーム*"
                      :error-count="Number.MAX_VALUE"
                      :error-messages="errors"
                    />
                  </v-row>
                </v-container>
              </v-card-text>
            </ValidationProvider>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="closeEditNicknameDialog"
              >
                キャンセル
              </v-btn>
              <!-- <v-btn
                color="blue darken-1"
                text
                :disabled="invalid"
                @click="saveNickname"
              > -->
              <v-btn
                color="blue darken-1"
                text
                :disabled="nicknameSaveDisabled"
                @click="saveNickname"
              >
                保存する
              </v-btn>
            </v-card-actions>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.mailAddress"
        readonly
        label="メールアドレス"
      />
      <small class="float-left">*必須フィールドを示します</small>
    </v-col>
  </v-row>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
  // onErrorCaptured,
} from '@vue/composition-api';
// import {
//   profileStore,
//   updateThemeColor,
//   updateUserNameAsync,
//   updateNickname,
// } from '@/store/profile';
import { validate } from 'vee-validate';
// import { ValidationItems } from '@/validation/validation-items';

export default defineComponent({
  setup(prop, context) {
    const state = reactive({
      userNameValidationObserver: null,
      nicknameValidationObserver: null,
      // profile: profileStore.profile,
      profile: context.root.$store.getters['profile/profile'],
      newUserName: null,
      newNickname: null,
      // newThemeColor: profileStore.profile.themeColor,
      newThemeColor: context.root.$store.getters['profile/profile'].themeColor,
      isOpenEditUserNameDialog: false,
      isOpenEditNicknameDialog: false,
      avatarErrors: null,
      userNameSaveDisabled: false,
      nicknameSaveDisabled: false,
      validationRules: computed(() => {
        return {
          nickname: {
            required: true,
            max: 15,
            // ...ValidationItems.nickname,
          },
          userName: {
            required: true,
            userNameAllowedCharacters: true,
            max: 15,
            // ...ValidationItems.userName,
          },
          avatar: {
            ext: ['png', 'jpeg', 'bmp'],
            size: 300,
            // ...ValidationItems.avatar,
          },
        };
      }),
    });
    /**
     * 新しいユーザー名の保存が無効かどうかを判断します。
     * 新しいユーザー名の値が変更される度に判定を行います。
     */
    watch(
      () => state.newUserName,
      () => {
        nextTick(() => {
          state.userNameValidationObserver
            .validate({ silent: true })
            .then(result => {
              state.userNameSaveDisabled = !result;
            });
        });
      },
    );
    /**
     * 新しいニックネームの保存が無効かどうかを判断します。
     * 新しいニックネームの値が変更される度に判定を行います。
     */
    watch(
      () => state.newNickname,
      () => {
        nextTick(() => {
          state.nicknameValidationObserver
            .validate({ silent: true })
            .then(result => {
              state.nicknameSaveDisabled = !result;
            });
        });
      },
    );
    // onErrorCaptured(error => {
    //   if (error?.response?.status === 422) {
    //     context.root.$toast(error.response?.data?.title);
    //   }
    //   return false;
    // });
    // テーマカラーを更新するアクションです。
    const updateThemeColorAction = themeColor =>
      context.root.$store.dispatch('profile/updateThemeColor', themeColor);
    // ユーザー名を更新するアクションです。
    const updateUserNameAction = userName =>
      context.root.$store.dispatch('profile/updateUserName', userName);
    // ニックネームを更新するアクションです。
    const updateNicknameAction = nickname =>
      context.root.$store.dispatch('profile/updateNickname', nickname);
    /**
     * アバターを保存します。
     * @param file アバターの画像ファイル
     */
    // eslint-disable-next-line no-unused-vars
    const saveFileContent = file => {
      state.avatarErrors = null;
      if (!file) {
        return;
      }
      validate(file, state.validationRules.avatar, {
        name: 'アバター',
      }).then(result => {
        if (!result.valid) {
          state.avatarErrors = result.errors;
          return;
        }
      });
    };
    /**
     * テーマカラーを保存します。
     */
    const saveThemeColor = () => {
      // profileStore.profile.themeColor = state.newThemeColor;
      // updateThemeColor(state.newThemeColor);
      updateThemeColorAction(state.newThemeColor);
    };
    /**
     * ユーザー名の編集を開始します。
     */
    const editUserName = () => {
      state.newUserName = state.profile.userName;
      state.isOpenEditUserNameDialog = true;
    };
    /**
     * ユーザー名の編集を終了します。
     */
    const closeEditUserNameDialog = () => {
      state.isOpenEditUserNameDialog = false;
    };
    /**
     * ユーザー名を保存します。
     */
    const saveUserName = async () => {
      // if (state.newUserName) {
      //   // profileStore.profile.userName = state.newUserName;
      //   updateUserName(state.newUserName);
      // }
      // state.isOpenEditUserNameDialog = false;
      try {
        if (state.newUserName) {
          // await updateUserNameAsync(state.newUserName);
          await updateUserNameAction(state.newUserName);
        }
        state.isOpenEditUserNameDialog = false;
      } catch (error) {
        console.log('error: ', error.response?.data?.title);
        // if (error?.response?.status === 422) {
        //   context.root.$toast(error.response?.data?.title);
        // }
        // throw error;
      }
    };
    /**
     * ニックネームの編集を開始します。
     */
    const editNickname = () => {
      state.newNickname = state.profile.nickname;
      state.isOpenEditNicknameDialog = true;
    };
    /**
     * ニックネームの編集を終了します。
     */
    const closeEditNicknameDialog = () => {
      state.isOpenEditNicknameDialog = false;
    };
    /**
     * ニックネームを保存します。
     */
    const saveNickname = () => {
      if (state.newNickname) {
        // profileStore.profile.nickname = state.newNickname;
        // updateNickname(state.newNickname);
        updateNicknameAction(state.newNickname);
      }
      state.isOpenEditNicknameDialog = false;
    };

    return {
      ...toRefs(state),
      saveFileContent,
      saveThemeColor,
      editUserName,
      closeEditUserNameDialog,
      saveUserName,
      editNickname,
      closeEditNicknameDialog,
      saveNickname,
    };
  },
});
</script>
