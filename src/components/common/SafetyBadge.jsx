import { Shield, ShieldCheck } from 'lucide-react';

/**
 * SafetyBadge - Displays safety feature status
 */
export default function SafetyBadge({ label, enabled = true, description }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          enabled ? 'bg-leaf-100 text-leaf-600' : 'bg-gray-100 text-gray-400'
        }`}
      >
        {enabled ? <ShieldCheck size={18} /> : <Shield size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800">{label}</div>
        {description && <div className="text-xs text-gray-500 mt-0.5">{description}</div>}
      </div>
      <div
        className={`w-10 h-6 rounded-full flex items-center transition-colors duration-200 ${
          enabled ? 'bg-leaf-500 justify-end' : 'bg-gray-300 justify-start'
        }`}
      >
        <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm" />
      </div>
    </div>
  );
}
