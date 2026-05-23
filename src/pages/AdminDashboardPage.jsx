import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Flag, Users, BarChart3, Target, AlertTriangle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import AnimatedCounter from '../components/common/AnimatedCounter';
import ProgressRing from '../components/common/ProgressRing';

const mockListingQueue = [
  { id: 1, item: 'Bộ LEGO City Police', seller: 'Minh (9 tuổi)', status: 'approved', date: '2026-04-28' },
  { id: 2, item: 'Truyện Doraemon tập 1-10', seller: 'Minh (9 tuổi)', status: 'approved', date: '2026-04-27' },
  { id: 3, item: 'Xe scooter mini', seller: 'An (10 tuổi)', status: 'pending', date: '2026-04-29' },
];
const mockReported = [{ id: 1, type: 'Ảnh không phù hợp', reporter: 'Hệ thống', item: 'Áo đồng phục', status: 'reviewing', date: '2026-04-27' }];
const mockCampaigns = [
  { id: 1, name: 'Toy Reset Week Q2', status: 'active', participants: 45, items: 128 },
  { id: 2, name: 'Pilot 8 tuần - Đợt 1', status: 'active', participants: 20, completion: '62%' },
];

function AdminStat({ icon, label, value, subtitle, color = 'mint', delay = 0 }) {
  const colors = { mint: 'from-mint-400 to-mint-600', leaf: 'from-leaf-400 to-leaf-600', sun: 'from-sun-400 to-sun-500', coral: 'from-coral-400 to-coral-600' };
  return (
    <motion.div className="glass rounded-2xl p-5 hover:shadow-lg transition-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white text-lg mb-3`}>{icon}</div>
      <div className="text-2xl font-bold text-gray-800 font-[Quicksand]"><AnimatedCounter value={typeof value === 'number' ? value : parseInt(value) || 0} delay={delay} /></div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/auth')} className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm transition-colors">
        <ArrowLeft size={16} /> Đổi vai trò
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[Quicksand] text-2xl md:text-3xl font-bold text-gray-800 mb-1">Admin Dashboard 🛡️</h1>
        <p className="text-gray-500 text-sm">Quản lý hệ thống CIRCL</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminStat icon="👨‍👩‍👧" label="Gia đình" value={20} subtitle="Pilot đợt 1" color="mint" delay={0} />
        <AdminStat icon="🧒" label="Trẻ em" value={22} subtitle="8-10 tuổi" color="leaf" delay={0.05} />
        <AdminStat icon="📦" label="Listings" value={128} subtitle="45 đang hoạt động" color="sun" delay={0.1} />
        <AdminStat icon="🎯" label="Nhiệm vụ" value={66} subtitle="62% hoàn thành" color="coral" delay={0.15} />
      </div>

      {/* Pilot Progress */}
      <GlassCard className="gradient-border">
        <div className="flex items-center gap-4">
          <ProgressRing progress={62} size={70} strokeWidth={6} color="#14b89c">
            <span className="text-sm font-bold text-gray-700">62%</span>
          </ProgressRing>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-800">Pilot 8 tuần — Đợt 1</div>
            <div className="text-xs text-gray-500 mb-2">20 gia đình • Tuần 4/8</div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-mint-400 to-leaf-500 rounded-full"
                initial={{ width: 0 }} animate={{ width: '62%' }} transition={{ duration: 1, ease: 'easeOut' }} />
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-leaf-600 text-xs font-semibold"><TrendingUp size={12} /> +8%</div>
            <div className="text-[10px] text-gray-400">vs tuần trước</div>
          </div>
        </div>
      </GlassCard>

      {/* Listing Review */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4"><ClipboardList className="text-mint-600" size={18} /><h2 className="font-semibold text-gray-800">Listing Review Queue</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-500 border-b border-gray-100"><th className="pb-2 font-medium">Món đồ</th><th className="pb-2 font-medium">Người bán</th><th className="pb-2 font-medium">Trạng thái</th><th className="pb-2 font-medium">Ngày</th></tr></thead>
            <tbody>{mockListingQueue.map((item) => (
              <motion.tr key={item.id} className="border-b border-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <td className="py-3 font-medium text-gray-800">{item.item}</td>
                <td className="py-3 text-gray-600">{item.seller}</td>
                <td className="py-3"><span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${item.status === 'approved' ? 'bg-leaf-100 text-leaf-700' : 'bg-sun-100 text-sun-700'}`}>{item.status === 'approved' ? <CheckCircle2 size={10} /> : <Clock size={10} />}{item.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}</span></td>
                <td className="py-3 text-gray-500">{item.date}</td>
              </motion.tr>
            ))}</tbody>
          </table>
        </div>
      </GlassCard>

      {/* Reported */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4"><Flag className="text-coral-500" size={18} /><h2 className="font-semibold text-gray-800">Nội dung báo cáo</h2>
          {mockReported.length > 0 && <motion.span className="w-5 h-5 rounded-full bg-coral-500 text-white text-[10px] font-bold flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}>{mockReported.length}</motion.span>}
        </div>
        {mockReported.map((r) => (
          <div key={r.id} className="flex items-center justify-between bg-coral-50 rounded-xl px-4 py-3 border border-coral-100">
            <div><div className="text-sm font-medium text-gray-800"><AlertTriangle className="inline text-coral-500 mr-1" size={14} />{r.type}</div><div className="text-xs text-gray-500">{r.item} • {r.reporter}</div></div>
            <span className="text-xs bg-sun-100 text-sun-700 px-2 py-0.5 rounded-full">Đang xem xét</span>
          </div>
        ))}
      </GlassCard>

      {/* Campaigns */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4"><Target className="text-sun-500" size={18} /><h2 className="font-semibold text-gray-800">Chiến dịch</h2></div>
        <div className="grid sm:grid-cols-2 gap-4">
          {mockCampaigns.map((c) => (
            <div key={c.id} className="bg-white/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-semibold text-gray-800">{c.name}</h3><span className="text-[10px] bg-leaf-100 text-leaf-700 px-2 py-0.5 rounded-full font-medium">Đang chạy</span></div>
              <div className="flex gap-4 text-xs text-gray-500"><span>👨‍👩‍👧 {c.participants}</span>{c.items && <span>📦 {c.items}</span>}{c.completion && <span>📊 {c.completion}</span>}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Metrics */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4"><BarChart3 className="text-mint-600" size={18} /><h2 className="font-semibold text-gray-800">Pilot Metrics</h2></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Completion Rate', value: 62, suffix: '%', trend: '↑' }, { label: 'Avg Streak', value: 4.2, suffix: ' ngày', trend: '↑' }, { label: 'Items Reused', value: 89, suffix: '', trend: '↑' }, { label: 'Parent Engagement', value: 78, suffix: '%', trend: '→' }].map((m, i) => (
            <div key={i} className="bg-white/50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-gray-800 font-[Quicksand]"><AnimatedCounter value={m.value} suffix={m.suffix} delay={i * 0.1} /></div>
              <div className="text-xs text-gray-500">{m.label}</div>
              <div className="text-xs text-leaf-600 font-medium mt-0.5">{m.trend}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
