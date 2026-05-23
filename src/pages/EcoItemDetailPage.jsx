import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Wrench, Gift, ShoppingBag, Repeat, Archive, Leaf } from 'lucide-react';
import { ecoEncyclopedia, materialTagColors } from '../data/ecoEncyclopedia';

const tabs = [
  { id: 'material', label: 'Làm từ gì?', emoji: '🏭' },
  { id: 'care', label: 'Dùng lâu hơn?', emoji: '🛡️' },
  { id: 'reuse', label: 'Nếu không dùng nữa?', emoji: '♻️' },
  { id: 'think', label: 'Suy nghĩ', emoji: '🤔' },
];

const actionIcons = { sell: ShoppingBag, gift: Gift, swap: Repeat, fix: Wrench, keep: Archive, reuse: Repeat, no: null };

export default function EcoItemDetailPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const item = ecoEncyclopedia.find((e) => e.id === itemId);
  const [activeTab, setActiveTab] = useState('material');

  if (!item) return <div className="p-6 text-center text-gray-500">Món đồ không tồn tại</div>;

  const tagColor = materialTagColors[item.materialTag] || materialTagColors['nhựa'];

  return (
    <div className="max-w-lg mx-auto space-y-5 pb-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <button onClick={() => navigate('/child/eco-encyclopedia')}
          className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
          <ChevronLeft size={16} /> Bách Khoa
        </button>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tagColor.bg} ${tagColor.text} ${tagColor.border}`}>
          {item.materialTag}
        </span>
      </motion.div>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-6 text-center">
        <motion.div className="text-6xl mb-3" animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}>{item.image}</motion.div>
        <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800 mb-1">{item.name}</h1>
        <p className="text-sm text-gray-500 italic">"{item.keyMessage}"</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100/80 rounded-xl p-1">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === tab.id ? 'bg-white text-leaf-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
            <span className="text-sm">{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-5">
        {activeTab === 'material' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏭</span>
              <h2 className="font-[Quicksand] font-bold text-gray-800">Món này làm từ gì?</h2>
            </div>
            <div className="bg-leaf-50 border border-leaf-200 rounded-xl p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{item.madeFrom}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-lg">🐿️</span>
              <p className="text-sm text-gray-600 italic">Sóc Xanh muốn con biết mỗi món đồ cần rất nhiều công sức để tạo ra!</p>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🛡️</span>
              <h2 className="font-[Quicksand] font-bold text-gray-800">Con nên làm gì để dùng lâu hơn?</h2>
            </div>
            <div className="space-y-2">
              {item.durabilityTips.map((tip, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-mint-50 border border-mint-200 rounded-xl">
                  <span className="text-sm">✅</span>
                  <span className="text-sm text-gray-700 font-medium">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reuse' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">♻️</span>
              <h2 className="font-[Quicksand] font-bold text-gray-800">Nếu con không dùng nữa?</h2>
            </div>
            <div className="space-y-2">
              {item.reuseOptions.map((opt, i) => {
                const Icon = actionIcons[opt.action];
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      opt.action === 'no' ? 'bg-coral-50 border-coral-200' : 'bg-leaf-50 border-leaf-200'
                    }`}>
                    {Icon && <Icon size={16} className={opt.action === 'no' ? 'text-coral-500' : 'text-leaf-500'} />}
                    <div>
                      <span className="text-sm font-bold text-gray-800">{opt.label}</span>
                      <span className="text-xs text-gray-500 ml-2">{opt.condition}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'think' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🤔</span>
              <h2 className="font-[Quicksand] font-bold text-gray-800">Câu hỏi suy nghĩ</h2>
            </div>
            <div className="space-y-3">
              {item.reflectionQs.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-sun-50 border border-sun-200 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-lg">🐿️</span>
                  <p className="text-sm text-gray-700 font-medium">{q}</p>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <button onClick={() => navigate('/child/my-items')}
                className="w-full py-3 bg-gradient-to-r from-leaf-400 to-mint-500 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-shadow">
                📦 Thêm vào Tủ Đồ của con
              </button>
              <button onClick={() => navigate('/child/eco-academy')}
                className="w-full py-3 bg-white border-2 border-leaf-300 text-leaf-600 rounded-xl font-bold text-sm hover:bg-leaf-50 transition-colors">
                🌿 Làm thử thách với món này
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
