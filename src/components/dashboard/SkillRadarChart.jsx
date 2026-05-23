import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { motion } from 'framer-motion';

const skillDimensions = [
  { key: 'financial', label: 'Tài chính', fullMark: 100 },
  { key: 'saving', label: 'Tiết kiệm', fullMark: 100 },
  { key: 'reuse', label: 'Tái sử dụng', fullMark: 100 },
  { key: 'sharing', label: 'Chia sẻ', fullMark: 100 },
  { key: 'patience', label: 'Kiên nhẫn', fullMark: 100 },
  { key: 'reflection', label: 'Phản ánh', fullMark: 100 },
];

export default function SkillRadarChart({ stats, className = '' }) {
  const data = skillDimensions.map((dim) => ({
    subject: dim.label,
    value: stats?.[dim.key] ?? 0,
    fullMark: dim.fullMark,
  }));

  return (
    <motion.div className={className} initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Kỹ năng" dataKey="value" stroke="#14b89c" fill="#14b89c"
            fillOpacity={0.2} strokeWidth={2} dot={{ r: 4, fill: '#14b89c', strokeWidth: 0 }}
            animationDuration={1200} animationEasing="ease-out" />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function generateSkillStats(dashboardStats) {
  return {
    financial: Math.min(100, (dashboardStats.challengesCompleted / dashboardStats.totalChallenges) * 100 + 15),
    saving: Math.min(100, dashboardStats.savingRatio * 2),
    reuse: Math.min(100, (dashboardStats.itemsReused + dashboardStats.itemsDonated) * 25),
    sharing: Math.min(100, dashboardStats.sharingRatio * 3.5),
    patience: Math.min(100, dashboardStats.avoidedPurchases * 28 + 10),
    reflection: Math.min(100, dashboardStats.teachBackCount * 30),
  };
}
