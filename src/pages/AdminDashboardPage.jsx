import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ClipboardList,
  Flag,
  Users,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import StatCard from '../components/common/StatCard';

const mockListingQueue = [
  { id: 1, item: 'Bộ LEGO City Police', seller: 'Minh (9 tuổi)', status: 'approved', date: '2026-04-28' },
  { id: 2, item: 'Truyện Doraemon tập 1-10', seller: 'Minh (9 tuổi)', status: 'approved', date: '2026-04-27' },
  { id: 3, item: 'Xe scooter mini', seller: 'An (10 tuổi)', status: 'pending', date: '2026-04-29' },
];

const mockReported = [
  { id: 1, type: 'Ảnh không phù hợp', reporter: 'Hệ thống', item: 'Áo đồng phục', status: 'reviewing', date: '2026-04-27' },
];

const mockCampaigns = [
  { id: 1, name: 'Toy Reset Week Q2', status: 'active', participants: 45, items: 128 },
  { id: 2, name: 'Pilot 8 tuần - Đợt 1', status: 'active', participants: 20, completion: '62%' },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/auth')}
        className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Đổi vai trò
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[Quicksand] text-2xl md:text-3xl font-bold text-gray-800 mb-1">
          Admin Dashboard 🛡️
        </h1>
        <p className="text-gray-500 text-sm">Quản lý hệ thống CIRCL</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="👨‍👩‍👧" label="Gia đình" value="20" subtitle="Pilot đợt 1" color="mint" delay={0} />
        <StatCard icon="🧒" label="Trẻ em" value="22" subtitle="8-10 tuổi" color="leaf" delay={0.05} />
        <StatCard icon="📦" label="Listings" value="128" subtitle="45 đang hoạt động" color="sun" delay={0.1} />
        <StatCard icon="🎯" label="Nhiệm vụ" value="66" subtitle="62% hoàn thành" color="coral" delay={0.15} />
      </div>

      {/* Listing Review Queue */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="text-mint-600" size={18} />
          <h2 className="font-semibold text-gray-800">Listing Review Queue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">Món đồ</th>
                <th className="pb-2 font-medium">Người bán</th>
                <th className="pb-2 font-medium">Trạng thái</th>
                <th className="pb-2 font-medium">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {mockListingQueue.map((item) => (
                <tr key={item.id} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-gray-800">{item.item}</td>
                  <td className="py-3 text-gray-600">{item.seller}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.status === 'approved'
                          ? 'bg-leaf-100 text-leaf-700'
                          : 'bg-sun-100 text-sun-700'
                      }`}
                    >
                      {item.status === 'approved' ? (
                        <CheckCircle2 size={10} />
                      ) : (
                        <Clock size={10} />
                      )}
                      {item.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Reported Content */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Flag className="text-coral-500" size={18} />
          <h2 className="font-semibold text-gray-800">Nội dung báo cáo</h2>
          {mockReported.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-coral-500 text-white text-[10px] font-bold flex items-center justify-center">
              {mockReported.length}
            </span>
          )}
        </div>
        {mockReported.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between bg-coral-50 rounded-xl px-4 py-3 border border-coral-100"
          >
            <div>
              <div className="text-sm font-medium text-gray-800">
                <AlertTriangle className="inline text-coral-500 mr-1" size={14} />
                {report.type}
              </div>
              <div className="text-xs text-gray-500">
                {report.item} • Báo cáo bởi {report.reporter}
              </div>
            </div>
            <span className="text-xs bg-sun-100 text-sun-700 px-2 py-0.5 rounded-full">
              Đang xem xét
            </span>
          </div>
        ))}
      </GlassCard>

      {/* Campaigns */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-sun-500" size={18} />
          <h2 className="font-semibold text-gray-800">Chiến dịch</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {mockCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white/50 rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-800">{campaign.name}</h3>
                <span className="text-[10px] bg-leaf-100 text-leaf-700 px-2 py-0.5 rounded-full font-medium">
                  Đang chạy
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>👨‍👩‍👧 {campaign.participants} người</span>
                {campaign.items && <span>📦 {campaign.items} đồ</span>}
                {campaign.completion && <span>📊 {campaign.completion}</span>}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* User Management */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-leaf-600" size={18} />
          <h2 className="font-semibold text-gray-800">Quản lý người dùng</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-mint-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-mint-700 font-[Quicksand]">20</div>
            <div className="text-xs text-gray-500">Gia đình</div>
          </div>
          <div className="bg-leaf-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-leaf-700 font-[Quicksand]">22</div>
            <div className="text-xs text-gray-500">Trẻ em</div>
          </div>
          <div className="bg-sun-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-sun-700 font-[Quicksand]">3</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </GlassCard>

      {/* Pilot Metrics */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-mint-600" size={18} />
          <h2 className="font-semibold text-gray-800">Pilot Metrics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Completion Rate', value: '62%', trend: '↑' },
            { label: 'Avg Streak', value: '4.2 ngày', trend: '↑' },
            { label: 'Items Reused', value: '89', trend: '↑' },
            { label: 'Parent Engagement', value: '78%', trend: '→' },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white/50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-gray-800 font-[Quicksand]">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.label}</div>
              <div className="text-xs text-leaf-600 font-medium mt-0.5">{metric.trend}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
