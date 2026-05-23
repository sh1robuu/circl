/**
 * CIRCL Auth Utility — Firebase Integration
 * Wraps Firebase Auth functions with error handling
 * and Vietnamese error messages for the UI.
 */

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  onAuthChange,
} from './firebase';

/**
 * Translate Firebase error codes to Vietnamese messages
 */
export function getAuthErrorMessage(error) {
  const code = error?.code || '';
  const map = {
    'auth/email-already-in-use': 'Email này đã được sử dụng',
    'auth/invalid-email': 'Email không hợp lệ',
    'auth/operation-not-allowed': 'Chức năng này chưa được kích hoạt',
    'auth/weak-password': 'Mật khẩu quá yếu. Cần ít nhất 6 ký tự',
    'auth/user-disabled': 'Tài khoản đã bị vô hiệu hóa',
    'auth/user-not-found': 'Không tìm thấy tài khoản với email này',
    'auth/wrong-password': 'Mật khẩu không đúng',
    'auth/invalid-credential': 'Email hoặc mật khẩu không đúng',
    'auth/too-many-requests': 'Quá nhiều lần thử. Vui lòng đợi vài phút',
    'auth/network-request-failed': 'Lỗi kết nối mạng. Kiểm tra internet',
  };
  return map[code] || error?.message || 'Đã xảy ra lỗi. Vui lòng thử lại';
}
