import { update } from '@/store/shared-user';
import axios from 'axios';

/**
 * sessionStorageにプロフィール情報を保存します。
 */
const setStorage = profile => {
  sessionStorage.setItem('profile', JSON.stringify(profile));
};

export const profileModule = {
  namespaced: true,
  state: {
    profile: null,
  },
  getters: {
    /**
     * プロフィールを取得します。
     */
    profile(state) {
      // return state.profile;
      if (state.profile) {
        return state.profile;
      }
      const profile = sessionStorage.getItem('profile');
      if (profile) {
        return JSON.parse(profile);
      }

      return null;
    },
  },
  mutations: {
    /**
     * 新しいユーザー名を State に保存します。
     * @param userName ユーザー名
     */
    updateUserName(state, userName) {
      state.profile.userName = userName;
      setStorage(state.profile);
    },
    /**
     * 新しいニックネームを State に保存します。
     * @param nickname ニックネーム
     */
    updateNickname(state, nickname) {
      state.profile.nickname = nickname;
      setStorage(state.profile);
    },
    /**
     * 新しいテーマカラーを State に保存します。
     * @param themeColor テーマカラー
     */
    updateThemeColor(state, themeColor) {
      state.profile.themeColor = themeColor;
      setStorage(state.profile);
    },
    /**
     * プロフィールを State に保存します。
     * @param profile プロフィール
     */
    saveProfile(state, profile) {
      state.profile = profile;
      setStorage(state.profile);
    },
    /**
     * State からプロフィールをクリアします。
     */
    clearProfile(state) {
      state.profile = null;
    },
  },
  actions: {
    /**
     * ユーザー名を更新します。
     * @param userName ユーザー名
     */
    async updateUserName({ commit, state }, userName) {
      const data = { userName: userName };
      // eslint-disable-next-line no-useless-catch
      try {
        await axios.patch('api/profile', data);
        commit('updateUserName', userName);
        update(state.profile);
      } catch (error) {
        throw error;
      }
    },
    /**
     * ニックネームを更新します。
     * @param themeColor テーマカラー
     */
    async updateThemeColor({ commit, state }, themeColor) {
      commit('updateThemeColor', themeColor);
      update(state.profile);
    },
    /**
     * サインインします。
     */
    async signIn({ commit }) {
      // ここに外部認証に関連した実装が必要
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.get('api/profile');
        commit('saveProfile', response.data);
      } catch (error) {
        throw error;
      }
    },
    /**
     * サインアウトします。
     */
    async signOut({ commit }) {
      // eslint-disable-next-line no-useless-catch
      try {
        // ここにサインアウトに関連した実装が必要
        commit('clearProfile');
      } catch (error) {
        throw error;
      }
    },
  },
};
