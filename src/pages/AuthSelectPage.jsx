import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Loader2, Baby, AlertCircle, Link2 } from 'lucide-react';
import useStore from '../store/useStore';
import { registerUser, loginUser, getAuthErrorMessage } from '../utils/auth';
import { roles } from '../data/mockUsers';

const floatingCircles = [
  { size: 120, top: '10%', left: '5%', color: 'bg-mint-200/30', delay: 0 },
  { size: 80, top: '60%', right: '8%', color: 'bg-leaf-200/30', delay: 0.5 },
  { size: 60, top: '30%', right: '15%', color: 'bg-sun-200/30', delay: 1 },
  { size: 100, bottom: '15%', left: '10%', color: 'bg-coral-200/20', delay: 1.5 },
];

export default function AuthSelectPage() {
  const navigate = useNavigate();
  const { setAuthUser, setRole } = useStore();
  const [mode, setMode] = useState('select'); // 'select' | 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('9');
  const [childEmail, setChildEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      setAuthUser(user);
      navigate('/welcome', { state: { isNewUser: false } });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Mật khẩu cần ít nhất 6 ký tự'); return; }
    setLoading(true);
    try {
      const user = await registerUser({
        email, password, role: selectedRole,
        name: selectedRole === 'child' ? childName || name : name,
        childName: selectedRole === 'parent' ? childName : undefined,
        childAge: selectedRole === 'child' ? Number(childAge) : undefined,
        childEmail: selectedRole === 'parent' ? childEmail : undefined,
      });
      setAuthUser(user);
      navigate('/welcome', { state: { isNewUser: true } });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (roleId) => {
    setRole(roleId);
    navigate('/welcome', { state: { isNewUser: false } });
  };

  return (
    <div className="min-h-screen bg-circl-gradient flex items-center justify-center px-4 relative overflow-hidden">
      {floatingCircles.map((c, i) => (
        <motion.div key={i} className={`absolute rounded-full ${c.color} blur-xl`}
          style={{ width: c.size, height: c.size, top: c.top, left: c.left, right: c.right, bottom: c.bottom }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }} />
      ))}

      <div className="w-full max-w-lg relative z-10">
        {mode !== 'select' && (
          <button onClick={() => { setMode('select'); setError(''); }}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Quay lại
          </button>
        )}
        {mode === 'select' && (
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Về trang chủ
          </Link>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div className="text-5xl mb-4" animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}>🌿</motion.div>
          <h1 className="font-[Quicksand] text-3xl font-bold text-gray-800 mb-2">
            {mode === 'select' ? 'Chào mừng đến CIRCL' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
          </h1>
          <p className="text-gray-500">
            {mode === 'select' ? 'Đăng nhập hoặc tạo tài khoản mới' : mode === 'login' ? 'Nhập email và mật khẩu của bạn' : `Tạo tài khoản ${roles.find(r => r.id === selectedRole)?.label || ''}`}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ===== ROLE SELECT ===== */}
          {mode === 'select' && (
            <motion.div key="select" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              {/* Main auth buttons */}
              <div className="flex gap-3 mb-6">
                <motion.button onClick={() => setMode('login')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-mint-500 to-leaf-500 text-white py-3.5 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-mint-200 transition-all">
                  Đăng nhập
                </motion.button>
                <motion.button onClick={() => setMode('register')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white/70 border-2 border-mint-300 text-mint-700 py-3.5 rounded-2xl font-bold text-lg hover:bg-white hover:shadow-lg transition-all">
                  Đăng ký
                </motion.button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">hoặc dùng thử nhanh</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Demo roles */}
              <div className="space-y-3">
                {roles.map((role, idx) => (
                  <motion.button key={role.id} onClick={() => handleDemoLogin(role.id)}
                    className="w-full glass rounded-2xl p-5 text-left hover:shadow-xl hover:bg-white/80 transition-all group"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <div className="flex items-center gap-4">
                      <motion.div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-2xl shadow-md`}
                        whileHover={{ rotate: [0, -5, 5, 0] }}>{role.emoji}</motion.div>
                      <div className="flex-1">
                        <div className="font-[Quicksand] font-bold text-gray-800">{role.label}</div>
                        <div className="text-xs text-gray-500">{role.description}</div>
                      </div>
                      <span className="text-[10px] bg-sun-100 text-sun-700 px-2 py-0.5 rounded-full font-medium">Demo</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.p className="text-center text-xs text-gray-400 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                Demo mode cho phép trải nghiệm tất cả tính năng<br />mà không cần tạo tài khoản.
              </motion.p>
            </motion.div>
          )}

          {/* ===== LOGIN FORM ===== */}
          {mode === 'login' && (
            <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="glass rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email@example.com"
                        className="w-full bg-white/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Mật khẩu</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
                        className="w-full bg-white/60 border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <motion.div className="flex items-center gap-2 bg-coral-50 text-coral-600 text-sm px-4 py-3 rounded-xl border border-coral-200"
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={16} /> {error}
                  </motion.div>
                )}

                <motion.button type="submit" disabled={loading} whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
                  className="w-full bg-gradient-to-r from-mint-500 to-leaf-500 text-white py-3.5 rounded-2xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Đang đăng nhập...</> : 'Đăng nhập'}
                </motion.button>

                <p className="text-center text-sm text-gray-500">
                  Chưa có tài khoản?{' '}
                  <button type="button" onClick={() => { setMode('register'); setError(''); }}
                    className="text-mint-600 font-semibold hover:underline">Đăng ký ngay</button>
                </p>
              </form>
            </motion.div>
          )}

          {/* ===== REGISTER FORM ===== */}
          {mode === 'register' && !selectedRole && (
            <motion.div key="role-pick" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-center text-sm text-gray-600 mb-4 font-medium">Chọn loại tài khoản:</p>
              <div className="space-y-3">
                {roles.filter(r => r.id !== 'admin').map((role, idx) => (
                  <motion.button key={role.id} onClick={() => setSelectedRole(role.id)}
                    className="w-full glass rounded-2xl p-5 text-left hover:shadow-xl hover:bg-white/80 transition-all group"
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-3xl shadow-md`}>{role.emoji}</div>
                      <div>
                        <div className="font-[Quicksand] font-bold text-lg text-gray-800">Tài khoản {role.label}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                Đã có tài khoản?{' '}
                <button onClick={() => { setMode('login'); setError(''); }} className="text-mint-600 font-semibold hover:underline">Đăng nhập</button>
              </p>
            </motion.div>
          )}

          {mode === 'register' && selectedRole && (
            <motion.div key="register-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="glass rounded-2xl p-6 space-y-4">
                  {/* Role badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{roles.find(r => r.id === selectedRole)?.emoji}</span>
                    <span className="text-sm font-semibold text-gray-800">Đăng ký tài khoản {roles.find(r => r.id === selectedRole)?.label}</span>
                    <button type="button" onClick={() => setSelectedRole(null)} className="ml-auto text-xs text-mint-600 hover:underline">Đổi</button>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      {selectedRole === 'child' ? 'Tên con' : 'Tên của bạn'}
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                        placeholder={selectedRole === 'child' ? 'Ví dụ: Minh' : 'Ví dụ: Chị Lan'}
                        className="w-full bg-white/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300" />
                    </div>
                  </div>

                  {selectedRole === 'child' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tuổi của con</label>
                      <div className="relative">
                        <Baby size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select value={childAge} onChange={(e) => setChildAge(e.target.value)}
                          className="w-full bg-white/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300 appearance-none">
                          {[7, 8, 9, 10, 11, 12].map(a => <option key={a} value={a}>{a} tuổi</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedRole === 'parent' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tên con (tùy chọn)</label>
                        <div className="relative">
                          <Baby size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)}
                            placeholder="Ví dụ: Minh"
                            className="w-full bg-white/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                          Email tài khoản của con
                          <span className="text-gray-400 font-normal ml-1">(để kết nối)</span>
                        </label>
                        <div className="relative">
                          <Link2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="email" value={childEmail} onChange={(e) => setChildEmail(e.target.value)}
                            placeholder="email-con@example.com"
                            className="w-full bg-white/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300" />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1 pl-1">
                          💡 Nhập email tài khoản con đã đăng ký để liên kết và quản lý. Có thể thêm sau.
                        </p>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email@example.com"
                        className="w-full bg-white/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Mật khẩu</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Ít nhất 6 ký tự"
                        className="w-full bg-white/60 border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <motion.div className="flex items-center gap-2 bg-coral-50 text-coral-600 text-sm px-4 py-3 rounded-xl border border-coral-200"
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={16} /> {error}
                  </motion.div>
                )}

                <motion.button type="submit" disabled={loading} whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
                  className="w-full bg-gradient-to-r from-mint-500 to-leaf-500 text-white py-3.5 rounded-2xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Đang tạo tài khoản...</> : 'Tạo tài khoản'}
                </motion.button>

                <p className="text-center text-sm text-gray-500">
                  Đã có tài khoản?{' '}
                  <button type="button" onClick={() => { setMode('login'); setError(''); setSelectedRole(null); }}
                    className="text-mint-600 font-semibold hover:underline">Đăng nhập</button>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
