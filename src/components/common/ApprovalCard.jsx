import { motion } from 'framer-motion';
import { Check, X, Edit3 } from 'lucide-react';

/**
 * ApprovalCard - Parent approval queue card
 */
export default function ApprovalCard({ approval, onApprove, onReject, onRequestEdit }) {
  const statusColors = {
    pending: 'bg-sun-100 text-sun-700',
    approved: 'bg-leaf-100 text-leaf-700',
    rejected: 'bg-coral-100 text-coral-600',
    'edit-requested': 'bg-mint-100 text-mint-700',
  };

  const statusLabels = {
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối',
    'edit-requested': 'Yêu cầu sửa',
  };

  const typeEmojis = {
    challenge: '📋',
    'item-action': '📦',
    listing: '🏷️',
    'money-split': '🏦',
  };

  return (
    <motion.div
      className="glass rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{typeEmojis[approval.type]}</span>
          <div>
            <div className="font-semibold text-gray-800 text-sm">{approval.title}</div>
            <div className="text-xs text-gray-500">
              {approval.typeLabel} • {approval.childName}
            </div>
          </div>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[approval.status]}`}
        >
          {statusLabels[approval.status]}
        </span>
      </div>

      {/* Content */}
      <div className="bg-white/50 rounded-xl p-3 mb-3 text-sm">
        {approval.type === 'challenge' && (
          <div className="space-y-2">
            {approval.content.answers?.map((a, i) => (
              <div key={i}>
                <div className="text-gray-500 text-xs">{a.question}</div>
                <div className="text-gray-800 font-medium">{a.answer}</div>
              </div>
            ))}
            {approval.content.decision && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">Quyết định:</span>{' '}
                <span className="font-medium text-gray-800">
                  {approval.content.decisionEmoji} {approval.content.decision}
                </span>
              </div>
            )}
          </div>
        )}

        {approval.type === 'item-action' && (
          <div className="space-y-1">
            <div>
              <span className="text-gray-500 text-xs">Món đồ:</span>{' '}
              <span className="font-medium text-gray-800">{approval.content.itemName}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Hành động:</span>{' '}
              <span className="font-medium text-gray-800">{approval.content.action}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs">Lý do:</span>{' '}
              <span className="text-gray-700">{approval.content.reason}</span>
            </div>
            {approval.content.estimatedPrice && (
              <div>
                <span className="text-gray-500 text-xs">Giá đề xuất:</span>{' '}
                <span className="font-medium text-mint-700">
                  {new Intl.NumberFormat('vi-VN').format(approval.content.estimatedPrice)}đ
                </span>
              </div>
            )}
          </div>
        )}

        {approval.type === 'money-split' && (
          <div className="space-y-1">
            <div className="font-medium text-gray-800">
              Tổng: {new Intl.NumberFormat('vi-VN').format(approval.content.totalAmount)}đ
            </div>
            <div className="flex gap-3 mt-2">
              <span className="text-xs bg-mint-50 text-mint-700 px-2 py-1 rounded-lg">
                🏦 TK: {new Intl.NumberFormat('vi-VN').format(approval.content.saving)}đ
              </span>
              <span className="text-xs bg-sun-50 text-sun-700 px-2 py-1 rounded-lg">
                💳 CT: {new Intl.NumberFormat('vi-VN').format(approval.content.spending)}đ
              </span>
              <span className="text-xs bg-leaf-50 text-leaf-700 px-2 py-1 rounded-lg">
                💚 CS: {new Intl.NumberFormat('vi-VN').format(approval.content.sharing)}đ
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Risk checklist */}
      {approval.riskChecklist && (
        <div className="mb-3">
          <div className="text-xs font-medium text-gray-500 mb-1.5">Kiểm tra an toàn:</div>
          <div className="space-y-1">
            {approval.riskChecklist.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center ${
                    item.checked ? 'bg-leaf-100 text-leaf-600' : 'bg-coral-100 text-coral-500'
                  }`}
                >
                  {item.checked ? '✓' : '!'}
                </span>
                <span className={item.checked ? 'text-gray-600' : 'text-coral-600 font-medium'}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {approval.status === 'pending' && (
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onApprove?.(approval.id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-leaf-500 hover:bg-leaf-600 text-white text-sm font-medium py-2 rounded-xl transition-colors"
          >
            <Check size={14} /> Duyệt
          </button>
          <button
            onClick={() => onRequestEdit?.(approval.id)}
            className="flex items-center justify-center gap-1.5 bg-sun-100 hover:bg-sun-200 text-sun-700 text-sm font-medium py-2 px-4 rounded-xl transition-colors"
          >
            <Edit3 size={14} /> Sửa
          </button>
          <button
            onClick={() => onReject?.(approval.id)}
            className="flex items-center justify-center gap-1.5 bg-coral-100 hover:bg-coral-200 text-coral-600 text-sm font-medium py-2 px-4 rounded-xl transition-colors"
          >
            <X size={14} /> Từ chối
          </button>
        </div>
      )}
    </motion.div>
  );
}
