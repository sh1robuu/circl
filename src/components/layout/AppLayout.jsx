import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Target, Wallet, Bot, Package, LayoutDashboard, ClipboardCheck, Banknote, Shield, LogOut, Menu, X, Leaf, Search } from 'lucide-react';
import { useState } from 'react';
import useStore from '../../store/useStore';
import RoleBadge from '../common/RoleBadge';

const CHILD_AVATARS = ['🧒', '👦', '👧', '🦸', '🧑‍🚀', '🦊', '🐱', '🐶', '🐼', '🦁', '🐰', '🐸'];
function getAvatar(user) {
  if (user?.role === 'child' && user?.selectedAvatar != null) return CHILD_AVATARS[user.selectedAvatar] || '🧒';
  return user?.avatar || '👤';
}

const childNavItems = [
  { path: '/child', label: 'Trang chủ', icon: Home },
  { path: '/child/eco-academy', label: 'Học viện Xanh', icon: Leaf },
  { path: '/child/eco-encyclopedia', label: 'Bách Khoa', icon: Search },
  { path: '/child/challenge', label: 'Nhiệm vụ', icon: Target },
  { path: '/child/jars', label: 'Ví 3 Lọ', icon: Wallet },
  { path: '/child/teach-ai', label: 'Bé dạy AI', icon: Bot },
  { path: '/child/items', label: 'Đồ của con', icon: Package },
];

const parentNavItems = [
  { path: '/parent', label: 'Tổng quan', icon: LayoutDashboard },
  { path: '/parent/approvals', label: 'Chờ duyệt', icon: ClipboardCheck },
  { path: '/parent/money', label: 'Xác nhận', icon: Banknote },
  { path: '/parent/safety', label: 'An toàn', icon: Shield },
];

const adminNavItems = [
  { path: '/admin', label: 'Admin', icon: LayoutDashboard },
];

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, currentRole, logout, approvals } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const pendingCount = approvals?.filter((a) => a.status === 'pending').length || 0;

  const navItems = currentRole === 'child' ? childNavItems : currentRole === 'parent' ? parentNavItems : adminNavItems;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-circl-gradient">
      {/* Mobile Header */}
      <header className="md:hidden glass-strong sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-[Quicksand] font-bold text-xl text-mint-700">CIRCL</span>
        </Link>
        <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center text-lg">{getAvatar(currentUser)}</div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <motion.div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex">
        {/* Sidebar - desktop + mobile drawer */}
        <aside className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-64 glass-strong border-r border-white/30 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
          <Link to="/" className="flex items-center gap-3 px-6 py-5 border-b border-white/20">
            <span className="text-3xl">🌿</span>
            <div>
              <span className="font-[Quicksand] font-bold text-xl text-mint-700">CIRCL</span>
              <div className="text-[10px] text-gray-400 -mt-0.5">Tiêu dùng có trách nhiệm</div>
            </div>
          </Link>

          <div className="px-5 py-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-200 to-leaf-200 flex items-center justify-center text-xl">{getAvatar(currentUser)}</div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{currentUser?.name}</div>
                <RoleBadge role={currentRole} size="sm" />
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              const showBadge = item.path === '/parent/approvals' && pendingCount > 0;
              return (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    isActive ? 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white shadow-md shadow-mint-200' : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
                  }`}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {showBadge && (
                    <motion.span className="absolute right-3 w-5 h-5 rounded-full bg-coral-500 text-white text-[10px] font-bold flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}>
                      {pendingCount}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 py-4 border-t border-white/20 space-y-1">
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-coral-50 hover:text-coral-600 transition-colors w-full">
              <LogOut size={18} /> <span>Đăng xuất</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen md:p-6 p-4 pb-24 md:pb-6">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="max-w-5xl mx-auto">
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/30 px-2 py-1.5 safe-area-bottom">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            const showBadge = item.path === '/parent/approvals' && pendingCount > 0;
            return (
              <Link key={item.path} to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 relative ${
                  isActive ? 'text-mint-600' : 'text-gray-400'
                }`}>
                <div className="relative">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                  {showBadge && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-coral-500 text-white text-[8px] font-bold flex items-center justify-center">
                      {pendingCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${isActive ? 'text-mint-600' : 'text-gray-400'}`}>{item.label}</span>
                {isActive && (
                  <motion.div className="absolute -bottom-1 w-6 h-1 bg-gradient-to-r from-mint-400 to-leaf-500 rounded-full"
                    layoutId="bottomNavIndicator" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
