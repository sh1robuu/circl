import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Leaf } from 'lucide-react';
import { ecoEncyclopedia, materialTagColors } from '../data/ecoEncyclopedia';
import { useState } from 'react';

const materialFilters = [
  { key: 'all', label: 'Tất cả', emoji: '🔍' },
  { key: 'nhựa', label: 'Nhựa', emoji: '♻️' },
  { key: 'giấy', label: 'Giấy', emoji: '📄' },
  { key: 'vải', label: 'Vải', emoji: '🧵' },
];

export default function EcoEncyclopediaPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? ecoEncyclopedia : ecoEncyclopedia.filter((e) => e.materialTag === filter);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-leaf-600 text-sm font-medium mb-1">
          <Search size={14} /> Bách Khoa Đồ Vật
        </div>
        <h1 className="font-[Quicksand] text-xl font-bold text-gray-800 mb-2">
          🐿️ Mỗi món đồ trở thành một bài học môi trường!
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Bấm vào đồ chơi, sách, balo hoặc gấu bông để biết món đó làm từ gì, vì sao không nên bỏ phí và cách giúp món đồ có thêm vòng đời mới.
        </p>
      </motion.div>

      {/* Material Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-1">
        {materialFilters.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
              filter === f.key ? 'bg-leaf-500 text-white shadow-md' : 'bg-white/80 text-gray-600 border border-gray-200 hover:border-leaf-300'
            }`}>
            {f.emoji} {f.label}
          </button>
        ))}
      </motion.div>

      {/* Item Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((item, i) => {
          const tagColor = materialTagColors[item.materialTag] || materialTagColors['nhựa'];
          return (
            <motion.button key={item.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              onClick={() => navigate(`/child/eco-item/${item.id}`)}
              whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="glass rounded-2xl p-4 text-left hover:shadow-lg transition-shadow group">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-leaf-50 to-mint-50 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                {item.image}
              </div>

              {/* Name */}
              <h3 className="font-[Quicksand] font-bold text-gray-800 text-sm mb-1.5 leading-tight">{item.name}</h3>

              {/* Material tag */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${tagColor.bg} ${tagColor.text} ${tagColor.border}`}>
                {item.materialTag}
              </span>

              {/* Actions */}
              <div className="flex gap-1 mt-2 flex-wrap">
                {item.reuseOptions.slice(0, 3).map((opt, j) => (
                  <span key={j} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{opt.label}</span>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex justify-end mt-2">
                <ChevronRight size={14} className="text-gray-300 group-hover:text-leaf-400 transition-colors" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer quote */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-center py-3">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <Leaf size={12} /> Học từ đồ vật thật trong nhà
        </p>
      </motion.div>
    </div>
  );
}
