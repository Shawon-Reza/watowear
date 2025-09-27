import {
  BrainCircuit,
  CircleCheckBig,
  Clock4,
  Smartphone,
  Users,
} from "lucide-react";
import AnalyticsGraph from "./AnalyticsGraph";

const Analytics = () => {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Analytics overview</h2>
      </div>
      <div className="grid grid-cols-3 gap-20 ">
        {/* Daily Active Users */}
        <div className="p-5 rounded-2xl border-l-8 border-l-[#6A6D57] bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Daily Active Users</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">12,450</h1>
            <Users size={32} className="text-[#3B82F6]" />
          </div>
          <p className="text-[#6B7280]">
            <span className="text-green-500">+8.2%</span> vs last month
          </p>
        </div>

        {/* Avg. Session Duration */}
        <div className="p-5 border-l-8 border-l-[#6A6D57]  rounded-2xl bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Avg. Session Duration</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">12m 45s</h1>
            <Clock4 size={32} className="text-[#3B82F6]" />
          </div>
          <p className="text-[#6B7280]">
            <span className="text-green-500">+1.5%</span> vs last month
          </p>
        </div>

        {/* Avg. Session Duration ( Daily ) */}
        <div className="p-5 border-l-8 border-l-[#6A6D57]  rounded-2xl bg-white shadow drop-shadow-lg">
          <h3 className="text-[#6B7280]">Avg. Session Duration ( Daily )</h3>
          <div className="text-black flex items-center justify-between py-4">
            <h1 className="font-extrabold text-3xl">2h 45m</h1>
            <Smartphone size={32} className="text-[#A855F7]" />
          </div>
          <p className="text-[#6B7280]">
            <span className="text-green-500">+0.5%</span> vs last month
          </p>
        </div>
      </div>

      <div>
        <AnalyticsGraph />
      </div>
    </section>
  );
};

export default Analytics;
