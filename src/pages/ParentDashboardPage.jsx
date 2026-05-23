import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Banknote, Shield, TrendingUp, BookOpen, Recycle, Lightbulb, Sparkles, ArrowUpRight, ArrowDownRight, MessageCircle, Clock, Heart } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import ProgressRing from '../components/common/ProgressRing';
import AnimatedCounter from '../components/common/AnimatedCounter';
import { MoneyBarChart } from '../components/dashboard/DashboardChart';
import SkillRadarChart, { generateSkillStats } from '../components/dashboard/SkillRadarChart';
import { mockMoneyFlowChart, mockWeeklyReports } from '../data/mockReports';
import { skillTagLabels } from '../data/mockChallenges';
import { formatCurrency } from '../utils/helpers';
import { parentPrompts } from '../data/parentPrompts';

function TrendBadge({ value, positive = true }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${positive ? 'bg-leaf-50 text-leaf-600' : 'bg-coral-50 text-coral-500'}`}>
      {positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {value}
    </span>
  );
}

function PremiumStatCard({ icon, label, children, subtitle, trend, trendPositive = true, delay = 0 }) {
  return (
    <motion.div className="glass rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center text-white text-lg">
          {icon}
        </div>
        {trend && <TrendBadge value={trend} positive={trendPositive} />}
      </div>
      <div className="text-2xl font-bold text-gray-800 font-[Quicksand]">{children}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
    </motion.div>
  );
}

export default function ParentDashboardPage() {
  const { dashboardStats, approvals } = useStore();
  const pendingCount = approvals.filter((a) => a.status === 'pending').length;
  const latestReport = mockWeeklyReports[mockWeeklyReports.length - 1];
  const skillStats = generateSkillStats(dashboardStats);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[Quicksand] text-2xl md:text-3xl font-bold text-gray-800 mb-1">Dashboard phụ huynh 📊</h1>
        <p className="text-gray-500 text-sm">Theo dõi hành trình học tập của Minh</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/parent/approvals">
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <GlassCard className="border-2 border-sun-200 bg-sun-50/50 flex items-center gap-3" padding="p-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sun-400 to-sun-500 flex items-center justify-center text-white">
                <ClipboardCheck size={18} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">Hàng chờ duyệt</div>
                <div className="text-xs text-gray-500">{pendingCount} mục chờ</div>
              </div>
              {pendingCount > 0 && (
                <motion.span className="w-6 h-6 rounded-full bg-coral-500 text-white text-xs font-bold flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}>
                  {pendingCount}
                </motion.span>
              )}
            </GlassCard>
          </motion.div>
        </Link>

        <Link to="/parent/money">
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <GlassCard className="flex items-center gap-3" padding="p-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center text-white">
                <Banknote size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Xác nhận tiền</div>
                <div className="text-xs text-gray-500">Ghi nhận giao dịch</div>
              </div>
            </GlassCard>
          </motion.div>
        </Link>

        <Link to="/parent/safety">
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <GlassCard className="flex items-center gap-3" padding="p-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf-400 to-leaf-600 flex items-center justify-center text-white">
                <Shield size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Cài đặt an toàn</div>
                <div className="text-xs text-gray-500">7 tính năng bảo vệ</div>
              </div>
            </GlassCard>
          </motion.div>
        </Link>
      </div>

      {/* AI Insight */}
      {latestReport && (
        <GlassCard className="gradient-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-mint-600" size={18} />
            <h2 className="font-semibold text-gray-800">AI Insight — Tuần mới nhất</h2>
            <span className="text-xs bg-mint-100 text-mint-700 px-2 py-0.5 rounded-full ml-auto">{latestReport.dateRange}</span>
          </div>
          <div className="bg-white/50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">💡 {latestReport.parentInsight}</div>
        </GlassCard>
      )}

      {/* Money Responsibility */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-mint-600" size={18} />
          <h2 className="font-[Quicksand] font-bold text-lg text-gray-800">Trách nhiệm tài chính</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <PremiumStatCard icon="💰" label="Tổng ghi nhận" trend="+15%" delay={0}>
            <AnimatedCounter value={dashboardStats.totalMoneyRecorded} currency />
          </PremiumStatCard>
          <PremiumStatCard icon="🏦" label="Tỷ lệ tiết kiệm" subtitle={formatCurrency(dashboardStats.totalSaving)} trend="+3%" delay={0.05}>
            <AnimatedCounter value={dashboardStats.savingRatio} suffix="%" />
          </PremiumStatCard>
          <PremiumStatCard icon="💳" label="Tỷ lệ chi tiêu" subtitle={formatCurrency(dashboardStats.totalSpending)} trend="-2%" trendPositive={true} delay={0.1}>
            <AnimatedCounter value={dashboardStats.spendingRatio} suffix="%" />
          </PremiumStatCard>
          <PremiumStatCard icon="💚" label="Tỷ lệ chia sẻ" subtitle={formatCurrency(dashboardStats.totalSharing)} trend="+5%" delay={0.15}>
            <AnimatedCounter value={dashboardStats.sharingRatio} suffix="%" />
          </PremiumStatCard>
        </div>

        <GlassCard>
          <h3 className="font-semibold text-gray-800 mb-4">Biểu đồ phân bổ theo tuần</h3>
          <MoneyBarChart data={mockMoneyFlowChart} />
        </GlassCard>
      </div>

      {/* Responsible Consumption */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Recycle className="text-leaf-600" size={18} />
          <h2 className="font-[Quicksand] font-bold text-lg text-gray-800">Tiêu dùng có trách nhiệm</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PremiumStatCard icon="📦" label="Đồ đã xem lại" delay={0}>
            <AnimatedCounter value={dashboardStats.itemsReviewed} />
          </PremiumStatCard>
          <PremiumStatCard icon="♻️" label="Tái sử dụng" trend="+1" delay={0.05}>
            <AnimatedCounter value={dashboardStats.itemsReused} />
          </PremiumStatCard>
          <PremiumStatCard icon="🎁" label="Đã tặng / bán" delay={0.1}>
            <AnimatedCounter value={dashboardStats.itemsDonated + dashboardStats.itemsSold} />
          </PremiumStatCard>
          <PremiumStatCard icon="🚫" label="Tránh mua không cần" trend="+2" delay={0.15}>
            <AnimatedCounter value={dashboardStats.avoidedPurchases} />
          </PremiumStatCard>
        </div>
      </div>

      {/* Learning Progress + Radar */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-sun-500" size={18} />
          <h2 className="font-[Quicksand] font-bold text-lg text-gray-800">Tiến trình học tập</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard>
            <div className="flex items-center gap-4">
              <ProgressRing progress={(dashboardStats.challengesCompleted / dashboardStats.totalChallenges) * 100}
                size={80} strokeWidth={7} color="#14b89c">
                <span className="text-sm font-bold text-gray-700">
                  {dashboardStats.challengesCompleted}/{dashboardStats.totalChallenges}
                </span>
              </ProgressRing>
              <div>
                <div className="text-sm font-medium text-gray-500">Nhiệm vụ hoàn thành</div>
                <div className="text-2xl font-bold text-gray-800 font-[Quicksand]">
                  <AnimatedCounter value={dashboardStats.challengesCompleted} /> / {dashboardStats.totalChallenges}
                </div>
                <div className="text-xs text-gray-400">Teach-back: {dashboardStats.teachBackCount} lần</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Kỹ năng đã học</h3>
            <div className="flex flex-wrap gap-2">
              {dashboardStats.skillTags.map((tag, idx) => (
                <motion.span key={tag}
                  className="text-xs bg-mint-50 text-mint-700 px-2.5 py-1 rounded-full font-medium border border-mint-100"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.06 }}>
                  {skillTagLabels[tag] || tag}
                </motion.span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Skill Radar */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-mint-600" size={18} />
          <h3 className="font-semibold text-gray-800">Bản đồ kỹ năng</h3>
        </div>
        <p className="text-xs text-gray-500 mb-2">Đánh giá tổng hợp các chiều phát triển của con</p>
        <SkillRadarChart stats={skillStats} />
      </GlassCard>

      {/* Overall Insight */}
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

      {/* Parent Co-Play Prompt */}
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-leaf-400 to-mint-500 flex items-center justify-center text-white">
            <MessageCircle size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">Gợi ý trò chuyện tuần này</h3>
          <span className="ml-auto text-[11px] font-bold text-mint-600 bg-mint-50 px-2 py-0.5 rounded-full">🐿️ Sóc Xanh</span>
        </div>
        {parentPrompts.slice(0, 1).map((prompt) => (
          <div key={prompt.id} className="space-y-3">
            <div className="bg-leaf-50 border border-leaf-200 rounded-xl p-4">
              <p className="text-sm text-leaf-800 font-medium leading-relaxed">
                <span className="text-lg mr-1">{prompt.emoji}</span> {prompt.whatChildLearned}
              </p>
            </div>
            <div className="bg-white/60 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-1 mb-2">
                <MessageCircle size={14} className="text-mint-500" />
                <span className="text-xs font-bold text-gray-600">Tối nay hỏi con:</span>
              </div>
              <p className="text-sm text-gray-700 italic">&ldquo;{prompt.questionToAsk}&rdquo;</p>
            </div>
            <div className="bg-sun-50 border border-sun-200 rounded-xl p-4">
              <div className="flex items-center gap-1 mb-2">
                <Clock size={14} className="text-sun-500" />
                <span className="text-xs font-bold text-gray-600">Hoạt động {prompt.timeEstimate}:</span>
              </div>
              <p className="text-sm text-gray-700">{prompt.activity}</p>
            </div>
            <div className="bg-coral-50 border border-coral-200 rounded-xl p-3">
              <div className="flex items-center gap-1">
                <Heart size={14} className="text-coral-500" />
                <span className="text-xs font-bold text-gray-600">Nên khen:</span>
                <span className="text-xs text-gray-600 ml-1">{prompt.positiveBehavior}</span>
              </div>
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
