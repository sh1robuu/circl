import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import { itemActions, safetyWarnings } from '../data/mockItems';
import { formatCurrency } from '../utils/helpers';

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, updateItemAction } = useStore();
  const item = items.find((i) => i.id === id);

  const [selectedAction, setSelectedAction] = useState(null);
  const [reason, setReason] = useState('');
  const [price, setPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!item) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">😕</div>
        <p className="text-gray-500">Không tìm thấy món đồ này</p>
        <button
          onClick={() => navigate('/child/items')}
          className="mt-4 text-mint-600 font-semibold text-sm hover:underline"
        >
          ← Quay lại
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-6xl mb-4">✅</div>
        <h2 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-2">
          Đã gửi cho phụ huynh!
        </h2>
        <p className="text-gray-500 mb-6 max-w-md">
          Đề xuất {selectedAction?.label?.toLowerCase()} "{item.name}" đã được gửi đến phụ huynh để duyệt.
        </p>
        <button
          onClick={() => navigate('/child/items')}
          className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Về danh sách đồ
        </button>
      </motion.div>
    );
  }

  const handleSubmit = () => {
    if (!selectedAction || !reason.trim()) return;
    updateItemAction(item.id, selectedAction, reason, price ? Number(price) : 0);
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/child/items')}
        className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Về danh sách đồ
      </button>

      {/* Item detail */}
      <GlassCard className="mb-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-4xl flex-shrink-0">
            {item.image}
          </div>
          <div className="flex-1">
            <h1 className="font-[Quicksand] text-xl font-bold text-gray-800">{item.name}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
                {item.categoryLabel}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
                {item.conditionLabel}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            {item.estimatedPrice > 0 && (
              <div className="text-lg font-bold text-mint-700 mt-2">
                {formatCurrency(item.estimatedPrice)}
              </div>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Select action */}
      <GlassCard className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Con muốn làm gì với món đồ này?</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {itemActions.map((action) => {
            const isSelected = selectedAction?.id === action.id;
            return (
              <motion.button
                key={action.id}
                onClick={() => setSelectedAction(action)}
                className={`border-2 rounded-2xl p-4 text-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-mint-500 to-leaf-500 border-mint-500 text-white'
                    : 'bg-white/50 border-gray-100 text-gray-700 hover:border-mint-200 hover:bg-white/70'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-1">{action.emoji}</div>
                <div className={`text-sm font-medium ${isSelected ? 'text-white' : ''}`}>
                  {action.label}
                </div>
              </motion.button>
            );
          })}
        </div>
      </GlassCard>

      {/* Reason & Price */}
      {selectedAction && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Lý do của con</h3>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tại sao con muốn làm điều này?"
              className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300 resize-none"
              rows={3}
            />

            {selectedAction.id === 'sell' && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Con muốn bán giá bao nhiêu?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    đ
                  </span>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      )}

      {/* Safety warnings */}
      <GlassCard className="mb-6 bg-coral-50/50 border border-coral-200">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="text-coral-500" size={18} />
          <h3 className="font-semibold text-coral-700 text-sm">Lưu ý an toàn</h3>
        </div>
        <div className="space-y-2">
          {safetyWarnings.map((warning, idx) => (
            <div key={idx} className="text-sm text-coral-600">
              {warning}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Submit */}
      {selectedAction && reason.trim() && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-mint-500 to-leaf-500 text-white py-3.5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-mint-200 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Gửi cho phụ huynh duyệt
          </button>
        </motion.div>
      )}
    </div>
  );
}
