import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import { formatCurrency } from '../utils/helpers';

export default function MoneyConfirmationPage() {
  const navigate = useNavigate();
  const { confirmMoney, confirmedTransactions } = useStore();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!amount || Number(amount) <= 0) return;
    confirmMoney(Number(amount), note);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-6xl mb-4">✅</div>
        <h2 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-2">
          Đã xác nhận!
        </h2>
        <p className="text-gray-500 mb-2 max-w-md">
          Số tiền {formatCurrency(Number(amount))} đã được ghi nhận. Bé có thể phân bổ vào Ví 3 Lọ.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          Tiền thật đã về tài khoản phụ huynh. CIRCL chỉ ghi nhận để bé học.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setAmount('');
              setNote('');
              setConfirmed(false);
            }}
            className="bg-white/70 border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-white transition-all"
          >
            Xác nhận thêm
          </button>
          <button
            onClick={() => navigate('/parent')}
            className="bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Về Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={() => navigate('/parent')}
        className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Về Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-1">
          Xác nhận tiền 💰
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Ghi nhận số tiền bé nhận được từ giao dịch ngoài app
        </p>
      </motion.div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-mint-50 rounded-2xl p-4 border border-mint-200 mb-6">
        <Info className="text-mint-600 flex-shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-mint-700">
          <strong>Lưu ý:</strong> Tiền thật về tài khoản phụ huynh. CIRCL chỉ ghi nhận số tiền để bé học cách phân bổ vào Ví 3 Lọ.
        </p>
      </div>

      {/* Form */}
      <GlassCard className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Số tiền (VNĐ)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ví dụ: 200000"
              className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-mint-300"
            />
            {amount && Number(amount) > 0 && (
              <p className="text-sm text-mint-700 font-medium mt-1">
                = {formatCurrency(Number(amount))}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Ghi chú (tùy chọn)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ví dụ: Tiền bán bộ LEGO City"
              className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300 resize-none"
              rows={2}
            />
          </div>

          <button
            onClick={handleConfirm}
            disabled={!amount || Number(amount) <= 0}
            className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              amount && Number(amount) > 0
                ? 'bg-gradient-to-r from-mint-500 to-leaf-500 hover:shadow-lg cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 size={18} />
            Xác nhận tiền
          </button>
        </div>
      </GlassCard>

      {/* Transaction history */}
      {confirmedTransactions.length > 0 && (
        <GlassCard>
          <h3 className="font-semibold text-gray-800 mb-3">Lịch sử xác nhận</h3>
          <div className="space-y-2">
            {confirmedTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between bg-white/50 rounded-xl px-4 py-2.5"
              >
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {formatCurrency(txn.amount)}
                  </div>
                  {txn.note && <div className="text-xs text-gray-500">{txn.note}</div>}
                </div>
                <span className="text-xs text-leaf-600 bg-leaf-50 px-2 py-0.5 rounded-full">
                  ✅ Đã xác nhận
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
