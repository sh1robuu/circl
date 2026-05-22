import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  Banknote,
  Shield,
  TrendingUp,
  BookOpen,
  Recycle,
  Lightbulb,
} from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import StatCard from '../components/common/StatCard';
import ProgressRing from '../components/common/ProgressRing';
import { MoneyBarChart } from '../components/dashboard/DashboardChart';
import { mockMoneyFlowChart, mockWeeklyReports } from '../data/mockReports';
import { skillTagLabels } from '../data/mockChallenges';
import { formatCurrency } from '../utils/helpers';

export default function ParentDashboardPage() {
  const { dashboardStats, approvals } = useStore();
  const pendingCount = approvals.filter((a) => a.status === 'pending').length;
  const latestReport = mockWeeklyReports[mockWeeklyReports.length - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-[Quicksand] text-2xl md:text-3xl font-bold text-gray-800 mb-1">
          Dashboard phụ huynh 📊
        </h1>
        <p className="text-gray-500 text-sm">
          Theo dõi hành trình học tập của Minh
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/parent/approvals">
          <GlassCard className="border-2 border-sun-200 bg-sun-50/50 flex items-center gap-3" padding="p-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center text-white">
              <ClipboardCheck size={18} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800">Hàng chờ duyệt</div>
              <div className="text-xs text-gray-500">{pendingCount} mục chờ</div>
            </div>
            {pendingCount > 0 && (
              <span className="w-6 h-6 rounded-full bg-coral-500 text-white text-xs font-bold flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </GlassCard>
        </Link>

        <Link to="/parent/money">
          <GlassCard className="flex items-center gap-3" padding="p-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center text-white">
              <Banknote size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Xác nhận tiền</div>
              <div className="text-xs text-gray-500">Ghi nhận giao dịch</div>
            </div>
          </GlassCard>
        </Link>

        <Link to="/parent/safety">
          <GlassCard className="flex items-center gap-3" padding="p-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf-400 to-leaf-600 flex items-center justify-center text-white">
              <Shield size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">Cài đặt an toàn</div>
              <div className="text-xs text-gray-500">7 tính năng bảo vệ</div>
            </div>
          </GlassCard>
        </Link>
      </div>

      {/* Weekly Summary */}
      {latestReport && (
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-mint-600" size={18} />
            <h2 className="font-semibold text-gray-800">Tóm tắt tuần mới nhất</h2>
            <span className="text-xs bg-mint-100 text-mint-700 px-2 py-0.5 rounded-full ml-auto">
              {latestReport.dateRange}
            </span>
          </div>
          <div className="bg-white/50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
            💡 {latestReport.parentInsight}
          </div>
        </GlassCard>
      )}

      {/* Money Responsibility Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-mint-600" size={18} />
          <h2 className="font-[Quicksand] font-bold text-lg text-gray-800">
            Trách nhiệm tài chính
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <StatCard
            icon="💰"
            label="Tổng ghi nhận"
            value={formatCurrency(dashboardStats.totalMoneyRecorded)}
            color="mint"
            delay={0}
          />
          <StatCard
            icon="🏦"
            label="Tỷ lệ tiết kiệm"
            value={`${dashboardStats.savingRatio}%`}
            subtitle={formatCurrency(dashboardStats.totalSaving)}
            color="mint"
            delay={0.05}
          />
          <StatCard
            icon="💳"
            label="Tỷ lệ chi tiêu"
            value={`${dashboardStats.spendingRatio}%`}
            subtitle={formatCurrency(dashboardStats.totalSpending)}
            color="sun"
            delay={0.1}
          />
          <StatCard
            icon="💚"
            label="Tỷ lệ chia sẻ"
            value={`${dashboardStats.sharingRatio}%`}
            subtitle={formatCurrency(dashboardStats.totalSharing)}
            color="leaf"
            delay={0.15}
          />
        </div>

        {/* Chart */}
        <GlassCard>
          <h3 className="font-semibold text-gray-800 mb-4">Biểu đồ phân bổ theo tuần</h3>
          <MoneyBarChart data={mockMoneyFlowChart} />
        </GlassCard>
      </div>

      {/* Responsible Consumption */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Recycle className="text-leaf-600" size={18} />
          <h2 className="font-[Quicksand] font-bold text-lg text-gray-800">
            Tiêu dùng có trách nhiệm
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon="📦"
            label="Đồ đã xem lại"
            value={dashboardStats.itemsReviewed}
            color="mint"
            delay={0}
          />
          <StatCard
            icon="♻️"
            label="Tái sử dụng"
            value={dashboardStats.itemsReused}
            color="leaf"
            delay={0.05}
          />
          <StatCard
            icon="🎁"
            label="Đã tặng / bán"
            value={dashboardStats.itemsDonated + dashboardStats.itemsSold}
            color="sun"
            delay={0.1}
          />
          <StatCard
            icon="🚫"
            label="Tránh mua không cần"
            value={dashboardStats.avoidedPurchases}
            color="coral"
            delay={0.15}
          />
        </div>
      </div>

      {/* Learning Progress */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-sun-500" size={18} />
          <h2 className="font-[Quicksand] font-bold text-lg text-gray-800">
            Tiến trình học tập
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <div className="flex items-center gap-4">
              <ProgressRing
                progress={(dashboardStats.challengesCompleted / dashboardStats.totalChallenges) * 100}
                size={80}
                strokeWidth={7}
                color="#14b89c"
              >
                <span className="text-sm font-bold text-gray-700">
                  {dashboardStats.challengesCompleted}/{dashboardStats.totalChallenges}
                </span>
              </ProgressRing>
              <div>
                <div className="text-sm font-medium text-gray-500">Nhiệm vụ hoàn thành</div>
                <div className="text-2xl font-bold text-gray-800 font-[Quicksand]">
                  {dashboardStats.challengesCompleted} / {dashboardStats.totalChallenges}
                </div>
                <div className="text-xs text-gray-400">Teach-back: {dashboardStats.teachBackCount} lần</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Kỹ năng đã học</h3>
            <div className="flex flex-wrap gap-2">
              {dashboardStats.skillTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-mint-50 text-mint-700 px-2.5 py-1 rounded-full font-medium border border-mint-100"
                >
                  {skillTagLabels[tag] || tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Parent Insight */}
      <GlassCard className="bg-gradient-to-r from-leaf-50/80 to-mint-50/80 border border-leaf-200">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="text-leaf-600" size={18} />
          <h3 className="font-semibold text-leaf-700">Nhận xét tổng hợp</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          Minh đang tiến bộ tốt trong chương trình 8 tuần. Bé thể hiện khả năng phân biệt nhu cầu/mong muốn, 
          biết tiết kiệm với tỷ lệ 43%, và đã bắt đầu suy nghĩ về tái sử dụng đồ cũ. 
          Streak 5 ngày liên tục cho thấy sự cam kết. Khuyến nghị: tiếp tục khuyến khích bé 
          chia sẻ thêm với cộng đồng (hiện 21%).
        </p>
      </GlassCard>
    </div>
  );
}
