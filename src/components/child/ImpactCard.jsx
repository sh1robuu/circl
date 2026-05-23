import { motion } from 'framer-motion';
import { Leaf, Heart, Sparkles, ChevronRight } from 'lucide-react';

const actionData = {
  sell: { title: 'Món đồ đã có vòng đời thứ hai!', emoji: '💰', ecoMsg: 'Món đồ còn tốt được dùng tiếp thay vì nằm mãi trong tủ.', finMsg: 'Con có thêm tiền để chia vào Ví 3 Lọ.', q: 'Lần sau con sẽ chăm món đồ thế nào để dùng lâu hơn?' },
  gift: { title: 'Con đã giúp món đồ có thêm người bạn mới!', emoji: '🎁', ecoMsg: 'Tặng đồ là cách tuyệt vời để giảm lãng phí và chia sẻ yêu thương.', q: 'Con nghĩ bạn nhận sẽ vui thế nào?' },
  swap: { title: 'Con đã đổi thành công!', emoji: '🔄', ecoMsg: 'Đổi đồ giúp cả hai bạn đều có trò mới mà không cần mua thêm.', q: 'Con thấy đổi đồ vui hơn hay mua mới vui hơn?' },
  fix: { title: 'Con đã chọn sửa trước khi mua mới!', emoji: '🔧', ecoMsg: 'Sửa một món đồ giúp con dùng nó lâu hơn và giảm lãng phí.', q: 'Món đồ nào khác trong nhà có thể sửa thay vì bỏ đi?' },
  keep: { title: 'Con đã suy nghĩ kỹ trước khi quyết định!', emoji: '💚', ecoMsg: 'Giữ lại món đồ mình còn cần cũng là tiêu dùng có trách nhiệm.', q: 'Con sẽ chăm sóc món đồ này thế nào để dùng lâu hơn?' },
};

export default function ImpactCard({ action, chapterTitle, onDone }) {
  const data = actionData[action] || actionData.keep;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 18 }}
      className="space-y-4">
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-leaf-500 via-mint-500 to-leaf-600 p-6 text-white shadow-2xl">
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
            <Leaf size={12} /> Impact Reflection Card
          </div>

          {/* Emoji + Title */}
          <div className="text-center">
            <motion.div className="text-5xl mb-3" animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}>{data.emoji}</motion.div>
            <h2 className="font-[Quicksand] text-xl font-bold">{data.title}</h2>
          </div>

          {/* Eco meaning */}
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Leaf size={14} /> <span className="text-xs font-bold text-white/90">Ý nghĩa xanh</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">{data.ecoMsg}</p>
          </div>

          {/* Financial meaning (if applicable) */}
          {data.finMsg && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} /> <span className="text-xs font-bold text-white/90">Ý nghĩa tài chính</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">{data.finMsg}</p>
            </div>
          )}

          {/* Reflection question */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Heart size={14} /> <span className="text-xs font-bold text-white/90">Câu hỏi cho con</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed italic">{data.q}</p>
          </div>

          {/* Chapter badge */}
          {chapterTitle && (
            <div className="text-center">
              <span className="text-[11px] text-white/60 bg-white/10 px-3 py-1 rounded-full">
                📚 Bài học: {chapterTitle}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex-1 py-3 bg-gradient-to-r from-leaf-400 to-leaf-500 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2">
          💚 Lưu vào hành trình
        </motion.button>
        {onDone && (
          <motion.button onClick={onDone} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="py-3 px-4 bg-white border-2 border-leaf-300 text-leaf-600 rounded-xl font-bold text-sm flex items-center gap-1">
            Tiếp <ChevronRight size={14} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
