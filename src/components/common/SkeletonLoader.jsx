/**
 * SkeletonLoader - Shimmer loading skeleton for glassmorphism UI
 * Supports card, text, circle, and chart variants
 */

function SkeletonBase({ className = '', children }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <SkeletonBase className={`glass rounded-2xl p-6 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-200/60" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200/60 rounded-lg w-3/4" />
          <div className="h-3 bg-gray-200/60 rounded-lg w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-200/60 rounded-lg w-full" />
        <div className="h-3 bg-gray-200/60 rounded-lg w-5/6" />
      </div>
    </SkeletonBase>
  );
}

export function SkeletonStat({ className = '' }) {
  return (
    <SkeletonBase className={`glass rounded-2xl p-5 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-gray-200/60 mb-3" />
      <div className="h-6 bg-gray-200/60 rounded-lg w-16 mb-2" />
      <div className="h-3 bg-gray-200/60 rounded-lg w-24" />
    </SkeletonBase>
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <SkeletonBase className={className}>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gray-200/60 rounded-lg"
            style={{ width: `${85 - i * 15}%` }}
          />
        ))}
      </div>
    </SkeletonBase>
  );
}

export function SkeletonChart({ className = '' }) {
  return (
    <SkeletonBase className={`glass rounded-2xl p-6 ${className}`}>
      <div className="h-4 bg-gray-200/60 rounded-lg w-32 mb-4" />
      <div className="flex items-end gap-3 h-40">
        {[60, 80, 45, 90, 55, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-gray-200/60 rounded-t-lg"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </SkeletonBase>
  );
}

export default { SkeletonCard, SkeletonStat, SkeletonText, SkeletonChart };
