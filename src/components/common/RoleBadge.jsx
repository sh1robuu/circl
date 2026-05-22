/**
 * RoleBadge - Display user role with color coding
 */
export default function RoleBadge({ role, size = 'md' }) {
  const config = {
    child: { label: 'Con', emoji: '🧒', bg: 'bg-mint-100', text: 'text-mint-700' },
    parent: { label: 'Phụ huynh', emoji: '👩', bg: 'bg-leaf-100', text: 'text-leaf-700' },
    admin: { label: 'Quản trị', emoji: '🛡️', bg: 'bg-sun-100', text: 'text-sun-700' },
  };

  const c = config[role] || config.child;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${c.bg} ${c.text} ${sizeClasses} rounded-full font-medium`}
    >
      <span>{c.emoji}</span>
      <span>{c.label}</span>
    </span>
  );
}
