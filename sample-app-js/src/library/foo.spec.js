/* eslint-disable no-unused-vars */
// テスト対象の関数
import { foo } from '@/library/foo';
// モック化した後、動作を変更する関数
import { validate } from 'vee-validate';

// vee-validate をモック化
jest.mock('vee-validate', () => ({
  validate: jest.fn(),
  extend: (name, schema) => {
    return;
  },
}));

// foo 関数のテスト
describe('foo', () => {
  // foo 関数が true を返した時の挙動を確認するテスト
  it('function foo (validate) return true', async () => {
    // validate が必ず true を返すようにモック化
    validate.mockResolvedValue({ valid: true });
    // テスト関数を実行
    const result = await foo('123');
    // 戻り値が true であることを検証
    expect(result).toBeTruthy();
  });
  // foo 関数が false を返した時の挙動を確認するテスト
  it('function foo (validate) return false', async () => {
    // validate が必ず false を返すようにモック化
    validate.mockResolvedValue({ valid: false });
    const result = await foo('123');
    expect(result).toBeFalsy();
  });
});

// // foo 関数のテスト
// describe('foo', () => {
//   // foo 関数が true を返した時の挙動を確認するテスト
//   it('function foo (validate) return true', async () => {
//     // テスト対象関数を実行
//     const result = await foo('123');
//     // 戻り値が true であることを検証
//     expect(result).toBeTruthy();
//   });
//   // foo 関数が false を返した時の挙動を確認するテスト
//   it('function foo (validate) return false', async () => {
//     // テスト対象関数を実行
//     const result = await foo('1234');
//     // 戻り値が false であることを検証
//     expect(result).toBeFalsy();
//   });
// });
