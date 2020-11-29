import Vue from 'vue';
import axios from 'axios';

export class RetryHandler {
  static maxRetryCount = 1;

  static onRejected() {
    return error => {
      // キャンセルされた場合は何もしない
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }
      // HTTPステータスコード401と422を除外
      if (error?.response?.status === 401 || error?.response?.status === 422) {
        return Promise.reject(error);
      }
      let retryCount = 1;
      // configにretryableが指定されていなければリトライしない
      if (!('retryable' in error.config)) {
        return Promise.reject(error);
      }
      // configにretryCountが追加されている場合（リトライ済の場合）は加算
      if ('retryCount' in error.config) {
        retryCount = error.config.retryCount + 1;
      }
      // 最大リトライ回数に到達
      if (retryCount > this.maxRetryCount) {
        return this.handleError(error);
      }

      // configにretryCountを追加して、リクエストをリトライ。
      return axios.request({
        ...error.config,
        ...{ retryCount: retryCount },
      });
    };
  }

  static handleError(error) {
    Vue.prototype.$dialog.error({
      text: '問題が発生しました。時間をおいてもう一度お試しください。',
      title: 'Error',
      persistent: true,
      retainFocus: false,
    });
    return Promise.reject(error);
  }
}
