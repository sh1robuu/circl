import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useStore from '../store/useStore';
import { roles } from '../data/mockUsers';

export default function AuthSelectPage() {
  const navigate = useNavigate();
  const { setRole } = useStore();

  const handleSelect = (roleId) => {
    setRole(roleId);
    const routeMap = {
      child: '/child',
      parent: '/parent',
      admin: '/admin',
    };
    navigate(routeMap[roleId]);
  };

  return (
    <div className="min-h-screen bg-circl-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Về trang chủ
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="text-4xl mb-4">🌿</div>
          <h1 className="font-[Quicksand] text-3xl font-bold text-gray-800 mb-2">
            Chào mừng đến CIRCL
          </h1>
          <p className="text-gray-500">Bạn muốn đăng nhập với vai trò nào?</p>
        </motion.div>

        <div className="space-y-4">
          {roles.map((role, idx) => (
            <motion.button
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className="w-full glass rounded-2xl p-6 text-left hover:shadow-xl hover:bg-white/80 transition-all duration-300 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-3xl shadow-md group-hover:shadow-lg transition-shadow`}
                >
                  {role.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-[Quicksand] font-bold text-lg text-gray-800">
                    {role.label}
                  </div>
                  <div className="text-sm text-gray-500">{role.description}</div>
                </div>
                <div className="text-gray-300 group-hover:text-mint-500 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          className="text-center text-xs text-gray-400 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Demo mode — không cần đăng nhập thật.
          <br />
          Chọn vai trò để trải nghiệm sản phẩm.
        </motion.p>
      </div>
    </div>
  );
}
