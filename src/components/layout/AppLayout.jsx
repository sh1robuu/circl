import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Target,
  Wallet,
  Bot,
  Package,
  LayoutDashboard,
  ClipboardCheck,
  Banknote,
  Shield,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';
import useStore from '../../store/useStore';
import RoleBadge from '../common/RoleBadge';

const childNavItems = [
  { path: '/child', label: 'Trang chủ', icon: Home },
  { path: '/child/challenge', label: 'Nhiệm vụ tuần', icon: Target },
  { path: '/child/jars', label: 'Ví 3 Lọ', icon: Wallet },
  { path: '/child/teach-ai', label: 'Bé dạy AI', icon: Bot },
  { path: '/child/items', label: 'Đồ của con', icon: Package },
];

const parentNavItems = [
  { path: '/parent', label: 'Tổng quan', icon: LayoutDashboard },
  { path: '/parent/approvals', label: 'Hàng chờ duyệt', icon: ClipboardCheck },
  { path: '/parent/money', label: 'Xác nhận tiền', icon: Banknote },
  { path: '/parent/safety', label: 'Cài đặt an toàn', icon: Shield },
];

const adminNavItems = [
  { path: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
];

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, currentRole, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems =
    currentRole === 'child'
      ? childNavItems
      : currentRole === 'parent'
      ? parentNavItems
      : adminNavItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-circl-gradient">
      {/* Mobile Header */}
      <header className="md:hidden glass-strong sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-[Quicksand] font-bold text-xl text-mint-700">CIRCL</span>
        </Link>
        <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center text-lg">
          {currentUser?.avatar}
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <motion.div
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-64 glass-strong border-r border-white/30 flex flex-col transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 px-6 py-5 border-b border-white/20"
          >
            <span className="text-3xl">🌿</span>
            <div>
              <span className="font-[Quicksand] font-bold text-xl text-mint-700">CIRCL</span>
              <div className="text-[10px] text-gray-400 -mt-0.5">Tiêu dùng có trách nhiệm</div>
            </div>
          </Link>

          {/* User info */}
          <div className="px-5 py-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-200 to-leaf-200 flex items-center justify-center text-xl">
                {currentUser?.avatar}
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{currentUser?.name}</div>
                <RoleBadge role={currentRole} size="sm" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white shadow-md shadow-mint-200'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="px-3 py-4 border-t border-white/20 space-y-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-coral-50 hover:text-coral-600 transition-colors w-full"
            >
              <LogOut size={18} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen md:p-6 p-4">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
