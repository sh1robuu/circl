import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store/useStore';
import ApprovalCard from '../components/common/ApprovalCard';

export default function ApprovalQueuePage() {
  const navigate = useNavigate();
  const { approvals, approveItem, rejectItem, requestEdit } = useStore();
  const [filter, setFilter] = useState('all');

  const filteredApprovals =
    filter === 'all'
      ? approvals
      : approvals.filter((a) => a.status === filter);

  const pendingCount = approvals.filter((a) => a.status === 'pending').length;

  return (
    <div>
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
        <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-1">
          Hàng chờ duyệt 📋
        </h1>
        <p className="text-sm text-gray-500">
          {pendingCount} mục đang chờ phụ huynh xem xét
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Tất cả', count: approvals.length },
          { id: 'pending', label: 'Chờ duyệt', count: pendingCount },
          { id: 'approved', label: 'Đã duyệt', count: approvals.filter((a) => a.status === 'approved').length },
          { id: 'rejected', label: 'Từ chối', count: approvals.filter((a) => a.status === 'rejected').length },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.id
                ? 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white shadow-md'
                : 'bg-white/60 text-gray-600 hover:bg-white/80'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Approval cards */}
      <div className="space-y-4">
        {filteredApprovals.map((approval, idx) => (
          <ApprovalCard
            key={approval.id}
            approval={approval}
            onApprove={approveItem}
            onReject={rejectItem}
            onRequestEdit={requestEdit}
          />
        ))}
      </div>

      {filteredApprovals.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">✅</div>
          <p>Không có mục nào trong danh sách này</p>
        </div>
      )}
    </div>
  );
}
