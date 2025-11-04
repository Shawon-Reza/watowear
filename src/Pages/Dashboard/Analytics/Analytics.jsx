import {
  BrainCircuit,
  CircleCheckBig,
  Clock4,
  Smartphone,
  Users,
} from "lucide-react";
import AnalyticsGraph from "./AnalyticsGraph";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

const Analytics = () => {
  // Dynamic stats object - replace these values with backend values when available
  const stats = {
    dailyActive: { value: 12450, change: 8.2, percent: 95, color: "#bfc986", iconBg: "#eef5e6" },
    avgSession: { value: "12m 45s", change: 1.5, percent: 45, color: "#34d399", iconBg: "#eef5e6" },
    avgSessionDaily: { value: "2h 45m", change: 0.5, percent: 60, color: "#a855f7", iconBg: "#f3e8ff" },
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Analytics overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Daily Active Users */}
        <div className="p-4 rounded-xl bg-white shadow-md border border-gray-100 flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-sm text-gray-500">Daily Active Users</h3>
            <div className="flex items-center justify-between py-2">
              <h1 className="font-extrabold text-2xl">{stats.dailyActive.value.toLocaleString()}</h1>
              <div className="p-3 rounded-lg" style={{ background: stats.dailyActive.iconBg }}>
                <Users size={24} className="text-[#3B82F6]" />
              </div>
            </div>
            <p className={`text-sm ${stats.dailyActive.change >= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {stats.dailyActive.change >= 0 ? '+' : ''}{stats.dailyActive.change}% vs last month
            </p>
            <div className="w-full rounded-full h-3 mt-3">
              <ResponsiveContainer width="100%" height={18}>
                <BarChart data={[{ name: "p", value: stats.dailyActive.percent }]} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Bar dataKey="value" fill={stats.dailyActive.color} radius={[8, 8, 8, 8]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Avg. Session Duration */}
        <div className="p-4 rounded-xl bg-white shadow-md border border-gray-100 flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-sm text-gray-500">Avg. Session Duration</h3>
            <div className="flex items-center justify-between py-2">
              <h1 className="font-extrabold text-2xl">{stats.avgSession.value}</h1>
              <div className="p-3 rounded-lg" style={{ background: stats.avgSession.iconBg }}>
                <Clock4 size={24} className="text-[#3B82F6]" />
              </div>
            </div>
            <p className={`text-sm ${stats.avgSession.change >= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {stats.avgSession.change >= 0 ? '+' : ''}{stats.avgSession.change}% vs last month
            </p>
            <div className="w-full rounded-full h-3 mt-3">
              <ResponsiveContainer width="100%" height={18}>
                <BarChart data={[{ name: "p", value: stats.avgSession.percent }]} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Bar dataKey="value" fill={stats.avgSession.color} radius={[8, 8, 8, 8]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Avg. Session Duration ( Daily ) */}
        <div className="p-4 rounded-xl bg-white shadow-md border border-gray-100 flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-sm text-gray-500">Avg. Session Duration ( Daily )</h3>
            <div className="flex items-center justify-between py-2">
              <h1 className="font-extrabold text-2xl">{stats.avgSessionDaily.value}</h1>
              <div className="p-3 rounded-lg" style={{ background: stats.avgSessionDaily.iconBg }}>
                <Smartphone size={24} className="text-[#A855F7]" />
              </div>
            </div>
            <p className={`text-sm ${stats.avgSessionDaily.change >= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {stats.avgSessionDaily.change >= 0 ? '+' : ''}{stats.avgSessionDaily.change}% vs last month
            </p>
            <div className="w-full rounded-full h-3 mt-3">
              <ResponsiveContainer width="100%" height={18}>
                <BarChart data={[{ name: "p", value: stats.avgSessionDaily.percent }]} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Bar dataKey="value" fill={stats.avgSessionDaily.color} radius={[8, 8, 8, 8]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div>
        <AnalyticsGraph />
      </div>
    </section>
  )
};

export default Analytics;
