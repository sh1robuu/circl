/**
 * Utility helpers for CIRCL
 */

/** Format number as Vietnamese currency */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
};

/** Format date string to Vietnamese locale */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/** Format relative time */
export const timeAgo = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  return `${Math.floor(diffDays / 30)} tháng trước`;
};

/** Get color classes by color name */
export const getColorClasses = (color) => {
  const map = {
    mint: {
      bg: 'bg-mint-100',
      text: 'text-mint-700',
      border: 'border-mint-300',
      gradient: 'from-mint-400 to-mint-600',
    },
    leaf: {
      bg: 'bg-leaf-100',
      text: 'text-leaf-700',
      border: 'border-leaf-300',
      gradient: 'from-leaf-400 to-leaf-600',
    },
    sun: {
      bg: 'bg-sun-100',
      text: 'text-sun-700',
      border: 'border-sun-300',
      gradient: 'from-sun-400 to-sun-600',
    },
    coral: {
      bg: 'bg-coral-100',
      text: 'text-coral-600',
      border: 'border-coral-300',
      gradient: 'from-coral-400 to-coral-600',
    },
  };
  return map[color] || map.mint;
};

/** Calculate percentage */
export const calcPercent = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};
