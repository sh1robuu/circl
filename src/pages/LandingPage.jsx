import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Wallet,
  Shield,
  RefreshCw,
  Heart,
  Leaf,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Users,
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🌿</span>
            <span className="font-[Quicksand] font-bold text-2xl text-mint-700">CIRCL</span>
          </Link>
          <Link
            to="/auth"
            className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-mint-200 transition-all duration-300 hover:scale-105"
          >
            Bắt đầu ngay
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white/90 text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
                <Leaf size={14} />
                <span>Pilot 8 tuần cho gia đình Việt</span>
              </div>
              <h1 className="font-[Quicksand] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Biến đồ cũ thành
                <br />
                <span className="text-sun-200">bài học môi trường</span>
                <br />
                và tài chính
              </h1>
              <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                CIRCL giúp trẻ 8–10 tuổi học quản lý tiền và tiêu dùng có trách nhiệm thông qua nhiệm vụ hằng tuần, Ví 3 Lọ, và sự đồng hành của phụ huynh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center gap-2 bg-white text-mint-700 px-8 py-3.5 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Bắt đầu cùng con
                  <ArrowRight size={20} />
                </Link>
                <a
                  href="#pillars"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Tìm hiểu thêm
                </a>
              </div>
            </motion.div>
          </div>

          {/* Floating cards */}
          <motion.div
            className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-4">
              <div className="glass-dark rounded-2xl p-4 w-56 animate-float">
                <div className="text-white/90 text-sm font-semibold mb-1">🏦 Lọ Tiết kiệm</div>
                <div className="text-white text-2xl font-bold font-[Quicksand]">120.000đ</div>
                <div className="w-full h-2 bg-white/20 rounded-full mt-2">
                  <div className="w-3/5 h-full bg-white/60 rounded-full" />
                </div>
              </div>
              <div className="glass-dark rounded-2xl p-4 w-52 ml-8 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-white/90 text-sm font-semibold mb-1">🎯 Nhiệm vụ tuần 4</div>
                <div className="text-white text-sm">Mua thông minh</div>
                <div className="text-sun-200 text-xs mt-1">🔥 Streak: 5 ngày</div>
              </div>
              <div className="glass-dark rounded-2xl p-4 w-48 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-white/90 text-sm font-semibold mb-1">⭐ Kỹ năng mới</div>
                <div className="flex gap-1 flex-wrap mt-1">
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">Kiên nhẫn</span>
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">Tiết kiệm</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path
              d="M0 40C240 10 480 70 720 40C960 10 1200 70 1440 40V80H0V40Z"
              fill="#f0fdf9"
            />
          </svg>
        </div>
      </section>

      {/* 3 Pillars */}
      <section id="pillars" className="bg-circl-gradient py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="font-[Quicksand] text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ba trụ cột của CIRCL
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Một hệ sinh thái học tập toàn diện, an toàn và phụ huynh luôn đồng hành.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="text-mint-600" size={28} />,
                emoji: '🎯',
                title: 'Nhiệm vụ kỹ năng sống hằng tuần',
                description:
                  'Curriculum 8 tuần với các nhiệm vụ thực tế: phân biệt cần/muốn, tìm đồ cũ, tập bán hàng an toàn. Mỗi tuần một bài học mới.',
                color: 'from-mint-400 to-mint-600',
              },
              {
                icon: <Wallet className="text-leaf-600" size={28} />,
                emoji: '🏦',
                title: 'Ví 3 Lọ học tài chính',
                description:
                  'Bé phân bổ tiền vào Tiết kiệm, Chi tiêu và Chia sẻ/Xanh. Đây là sổ học tập — CIRCL không giữ tiền thật.',
                color: 'from-leaf-400 to-leaf-600',
              },
              {
                icon: <Shield className="text-sun-600" size={28} />,
                emoji: '🛡️',
                title: 'Phụ huynh kiểm soát toàn bộ',
                description:
                  'Mọi hành động đều cần phụ huynh duyệt. Không chat, không thanh toán trong app, không ảnh mặt trẻ. An toàn tuyệt đối.',
                color: 'from-sun-400 to-sun-500',
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                {...stagger}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <GlassCard className="h-full text-center" hover>
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white text-3xl mb-5 shadow-lg`}
                  >
                    {pillar.emoji}
                  </div>
                  <h3 className="font-[Quicksand] text-lg font-bold text-gray-800 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CIRCL is not just a marketplace */}
      <section className="bg-white/50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-2 bg-mint-100 text-mint-700 text-sm px-4 py-1.5 rounded-full mb-4 font-medium">
                <Heart size={14} />
                Không phải marketplace
              </div>
              <h2 className="font-[Quicksand] text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                CIRCL không phải
                <br />
                <span className="text-mint-600">Chợ Tốt cho trẻ em</span>
              </h2>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                CIRCL là nền tảng giáo dục, không phải sàn giao dịch. Mọi hoạt động đều xoay quanh việc dạy bé tư duy tài chính và tiêu dùng có trách nhiệm.
              </p>
              <div className="space-y-4">
                {[
                  'Bé không tự giao dịch — phụ huynh duyệt và quản lý toàn bộ',
                  'Không thanh toán trong app — tiền về tài khoản phụ huynh',
                  'Không phải ví điện tử — Ví 3 Lọ là sổ học tập',
                  'Mục tiêu là kỹ năng sống, không phải bán hàng',
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-leaf-500 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '📋', label: 'Nhiệm vụ tuần', value: '8 tuần', sub: 'Curriculum có lộ trình' },
                  { emoji: '🏦', label: 'Sổ học tập', value: '3 Lọ', sub: 'Không giữ tiền thật' },
                  { emoji: '🤖', label: 'Bé dạy AI', value: 'Phản ánh', sub: 'Không chatbot mở' },
                  { emoji: '🛡️', label: 'An toàn', value: '100%', sub: 'Phụ huynh kiểm soát' },
                ].map((card, idx) => (
                  <GlassCard key={idx} className="text-center" padding="p-5">
                    <div className="text-3xl mb-2">{card.emoji}</div>
                    <div className="text-xs text-gray-500 mb-1">{card.label}</div>
                    <div className="text-xl font-bold text-gray-800 font-[Quicksand]">
                      {card.value}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{card.sub}</div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety by Design */}
      <section className="bg-circl-gradient py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-leaf-100 text-leaf-700 text-sm px-4 py-1.5 rounded-full mb-4 font-medium">
              <ShieldCheck size={14} />
              Safety by Design
            </div>
            <h2 className="font-[Quicksand] text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              An toàn là nguyên tắc thiết kế
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              CIRCL được xây dựng với an toàn trẻ em làm nền tảng, không phải tính năng bổ sung.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🚫', title: 'Không chat giữa trẻ', desc: 'Trẻ không thể liên lạc trực tiếp với nhau trên nền tảng.' },
              { icon: '✅', title: 'Phụ huynh duyệt mọi thứ', desc: 'Mọi hành động của bé đều cần sự đồng ý của phụ huynh.' },
              { icon: '💰', title: 'Không giữ tiền thật', desc: 'CIRCL là sổ học tập. Tiền thật luôn ở tài khoản phụ huynh.' },
              { icon: '📸', title: 'Không ảnh mặt trẻ', desc: 'Hệ thống cảnh báo nếu phát hiện ảnh có khuôn mặt trẻ em.' },
              { icon: '🤝', title: 'Liên hệ có đồng thuận', desc: 'Phụ huynh 2 bên phải đồng ý trước khi chia sẻ thông tin.' },
              { icon: '👁️', title: 'AI minh bạch', desc: 'Phụ huynh xem được toàn bộ nội dung AI tương tác với bé.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...stagger}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Loop */}
      <section className="bg-white/50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <div className="inline-flex items-center gap-2 bg-sun-100 text-sun-700 text-sm px-4 py-1.5 rounded-full mb-4 font-medium">
              <Clock size={14} />
              Weekly Loop
            </div>
            <h2 className="font-[Quicksand] text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Vòng lặp học tập mỗi tuần
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Một chu trình đơn giản, lặp lại mỗi tuần để bé xây dựng thói quen bền vững.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                icon: '📋',
                title: 'Nhận nhiệm vụ',
                desc: 'Bé nhận nhiệm vụ tuần với chủ đề cụ thể',
                color: 'from-mint-400 to-mint-500',
              },
              {
                step: '2',
                icon: '🧠',
                title: 'Học & Thực hành',
                desc: 'Trả lời câu hỏi, ra quyết định, dạy lại AI',
                color: 'from-leaf-400 to-leaf-500',
              },
              {
                step: '3',
                icon: '🏦',
                title: 'Ghi sổ tài chính',
                desc: 'Phân bổ tiền vào Ví 3 Lọ',
                color: 'from-sun-400 to-sun-500',
              },
              {
                step: '4',
                icon: '✅',
                title: 'Phụ huynh duyệt',
                desc: 'Phụ huynh xem, duyệt và nhận insight',
                color: 'from-coral-400 to-coral-500',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...stagger}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
              >
                <GlassCard className="text-center h-full relative" padding="p-6 pt-10">
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${item.color} text-white text-sm font-bold flex items-center justify-center shadow-lg`}
                  >
                    {item.step}
                  </div>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero-gradient py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <motion.div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative" {...fadeInUp}>
          <h2 className="font-[Quicksand] text-3xl md:text-4xl font-bold text-white mb-6">
            Sẵn sàng bắt đầu hành trình
            <br />
            cùng con?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Tham gia pilot 8 tuần miễn phí. Giúp con học tài chính qua thực hành thực tế.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 bg-white text-mint-700 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Bắt đầu cùng con
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="font-[Quicksand] font-bold text-xl text-white">CIRCL</span>
            </div>
            <p className="text-sm text-center">
              © 2026 CIRCL. Nền tảng giáo dục tiêu dùng có trách nhiệm cho trẻ em Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck size={14} className="text-leaf-500" />
              <span>An toàn cho trẻ em</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
