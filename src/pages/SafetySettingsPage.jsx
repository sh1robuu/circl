import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import SafetyBadge from '../components/common/SafetyBadge';

const safetySettings = [
  {
    id: 'no-child-chat',
    label: 'Không chat giữa trẻ',
    description: 'Trẻ không thể liên lạc trực tiếp với nhau trên CIRCL',
    enabled: true,
  },
  {
    id: 'parent-approval',
    label: 'Phụ huynh duyệt mọi hành động',
    description: 'Mọi đề xuất bán/tặng/đổi/sửa cần phụ huynh xác nhận',
    enabled: true,
  },
  {
    id: 'no-money',
    label: 'Không giữ tiền thật',
    description: 'CIRCL là sổ học tập. Tiền thật luôn ở tài khoản phụ huynh',
    enabled: true,
  },
  {
    id: 'no-face-photo',
    label: 'Không ảnh mặt trẻ em',
    description: 'Hệ thống cảnh báo nếu phát hiện ảnh có khuôn mặt trẻ em',
    enabled: true,
  },
  {
    id: 'mutual-consent',
    label: 'Liên hệ phải có đồng thuận',
    description: 'Phụ huynh 2 bên phải đồng ý trước khi chia sẻ thông tin liên lạc',
    enabled: true,
  },
  {
    id: 'parent-ai',
    label: 'AI minh bạch cho phụ huynh',
    description: 'Phụ huynh xem được toàn bộ nội dung AI tương tác với bé',
    enabled: true,
  },
  {
    id: 'data-minimization',
    label: 'Thu thập dữ liệu tối thiểu',
    description: 'Chỉ thu thập thông tin cần thiết cho mục đích giáo dục',
    enabled: true,
  },
];

export default function SafetySettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={() => navigate('/parent')}
        className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Về Dashboard
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-leaf-400 to-leaf-600 flex items-center justify-center text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800">
              Cài đặt an toàn
            </h1>
            <p className="text-sm text-gray-500">Safety by Design — luôn bật mặc định</p>
          </div>
        </div>
      </motion.div>

      {/* Safety info */}
      <GlassCard className="mb-6 bg-gradient-to-r from-leaf-50/80 to-mint-50/80 border border-leaf-200">
        <p className="text-sm text-leaf-700 leading-relaxed">
          🛡️ CIRCL được thiết kế với <strong>an toàn trẻ em là nguyên tắc nền tảng</strong>. 
          Các tính năng bảo vệ dưới đây luôn được bật mặc định và không thể tắt. 
          Đây là cam kết của chúng tôi đối với sự an toàn của con bạn.
        </p>
      </GlassCard>

      {/* Safety toggles */}
      <GlassCard>
        <div className="divide-y divide-gray-100">
          {safetySettings.map((setting, idx) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <SafetyBadge
                label={setting.label}
                description={setting.description}
                enabled={setting.enabled}
              />
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Footer note */}
      <motion.p
        className="text-center text-xs text-gray-400 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Các tính năng an toàn không thể tắt để đảm bảo bảo vệ tối đa cho trẻ em.
        <br />
        Liên hệ support@circl.vn nếu có câu hỏi.
      </motion.p>
    </div>
  );
}
