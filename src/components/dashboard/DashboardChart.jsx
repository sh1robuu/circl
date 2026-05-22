import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/**
 * DashboardChart - Charts for parent dashboard
 */

const COLORS = {
  saving: '#14b89c',
  spending: '#facc15',
  sharing: '#22c55e',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-strong rounded-xl p-3 text-xs">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} style={{ color: entry.color }} className="font-medium">
          {entry.name}: {new Intl.NumberFormat('vi-VN').format(entry.value)}đ
        </p>
      ))}
    </div>
  );
};

export function MoneyBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '12px' }}
          formatter={(value) => <span className="text-gray-600">{value}</span>}
        />
        <Bar dataKey="tiết_kiệm" name="Tiết kiệm" fill={COLORS.saving} radius={[4, 4, 0, 0]} />
        <Bar dataKey="chi_tiêu" name="Chi tiêu" fill={COLORS.spending} radius={[4, 4, 0, 0]} />
        <Bar dataKey="chia_sẻ" name="Chia sẻ" fill={COLORS.sharing} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function JarPieChart({ data }) {
  const pieData = [
    { name: 'Tiết kiệm', value: data.saving, color: COLORS.saving },
    { name: 'Chi tiêu', value: data.spending, color: COLORS.spending },
    { name: 'Chia sẻ', value: data.sharing, color: COLORS.sharing },
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `${new Intl.NumberFormat('vi-VN').format(value)}đ`}
        />
        <Legend
          wrapperStyle={{ fontSize: '12px' }}
          formatter={(value) => <span className="text-gray-600">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default { MoneyBarChart, JarPieChart };
