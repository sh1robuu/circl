import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import useStore from '../store/useStore';
import GlassCard from '../components/common/GlassCard';
import { itemCategories } from '../data/mockItems';
import { formatCurrency } from '../utils/helpers';

export default function MyItemsPage() {
  const navigate = useNavigate();
  const { items } = useStore();
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredItems = filter === 'all' ? items : items.filter((i) => i.category === filter);

  const approvalColors = {
    approved: 'bg-leaf-100 text-leaf-700',
    pending: 'bg-sun-100 text-sun-700',
    rejected: 'bg-coral-100 text-coral-600',
  };

  const approvalLabels = {
    approved: 'Đã duyệt',
    pending: 'Chờ duyệt',
    rejected: 'Từ chối',
  };

  const actionColors = {
    sell: 'text-sun-600 bg-sun-50',
    donate: 'text-leaf-600 bg-leaf-50',
    swap: 'text-coral-600 bg-coral-50',
    repair: 'text-mint-600 bg-mint-50',
    keep: 'text-gray-600 bg-gray-50',
  };

  return (
    <div>
      <button
        onClick={() => navigate('/child')}
        className="flex items-center gap-2 text-gray-500 hover:text-mint-700 text-sm mb-4 transition-colors"
      >
        <ArrowLeft size={16} /> Về trang chủ
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[Quicksand] text-2xl font-bold text-gray-800">Đồ của con 📦</h1>
          <p className="text-sm text-gray-500">{items.length} món đồ</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-mint-500 to-leaf-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
        >
          <Plus size={16} />
          Thêm đồ
        </button>
      </div>

      {/* Add Item Form */}
      {showAddForm && <AddItemForm onClose={() => setShowAddForm(false)} />}

      {/* Category filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white shadow-md'
              : 'bg-white/60 text-gray-600 hover:bg-white/80'
          }`}
        >
          Tất cả
        </button>
        {itemCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === cat.id
                ? 'bg-gradient-to-r from-mint-500 to-leaf-500 text-white shadow-md'
                : 'bg-white/60 text-gray-600 hover:bg-white/80'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Link to={`/child/items/${item.id}`}>
              <div className="glass rounded-2xl p-4 hover:shadow-lg hover:bg-white/75 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-3xl flex-shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {item.name}
                      </h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                          approvalColors[item.parentApproval]
                        }`}
                      >
                        {approvalLabels[item.parentApproval]}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.categoryLabel}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-lg font-medium ${
                          actionColors[item.action] || 'text-gray-600 bg-gray-50'
                        }`}
                      >
                        {item.actionLabel}
                      </span>
                      <span className="text-xs text-gray-400">{item.conditionLabel}</span>
                    </div>
                    {item.estimatedPrice > 0 && (
                      <div className="text-sm font-bold text-mint-700 mt-1">
                        {formatCurrency(item.estimatedPrice)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">📭</div>
          <p>Chưa có món đồ nào trong danh mục này</p>
        </div>
      )}
    </div>
  );
}

function AddItemForm({ onClose }) {
  const { addItem } = useStore();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('toys');
  const [condition, setCondition] = useState('good');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const cat = itemCategories.find((c) => c.id === category);
    addItem({
      name,
      category,
      categoryLabel: cat?.label || category,
      description,
      condition,
      conditionLabel: condition === 'good' ? 'Còn tốt' : condition === 'like-new' ? 'Như mới' : 'Dùng được',
      estimatedPrice: 0,
      image: cat?.emoji || '📦',
      action: 'keep',
      actionLabel: 'Giữ lại',
      reason: '',
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <GlassCard className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Thêm món đồ mới</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tên món đồ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300"
            >
              {itemCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300"
            >
              <option value="like-new">Như mới</option>
              <option value="good">Còn tốt</option>
              <option value="fair">Dùng được</option>
              <option value="needs-repair">Cần sửa</option>
            </select>
          </div>
          <textarea
            placeholder="Mô tả thêm..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-300 resize-none"
            rows={2}
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-mint-500 to-leaf-500 text-white py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
            >
              Thêm
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-white/60 hover:bg-white/80 transition-all"
            >
              Hủy
            </button>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  );
}
