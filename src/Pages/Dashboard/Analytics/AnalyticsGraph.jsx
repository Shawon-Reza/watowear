import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

const AnalyticsGraph = () => {
  // Sample data for User Growth (monthly)
  const mockUserData = [
    { month: "Jan", users: 5000 },
    { month: "Feb", users: 6000 },
    { month: "Mar", users: 4500 },
    { month: "Apr", users: 7000 },
    { month: "May", users: 5500 },
    { month: "Jun", users: 9000 },
    { month: "Jul", users: 6500 },
    { month: "Aug", users: 8000 },
    { month: "Sep", users: 10000 },
    { month: "Oct", users: 7500 },
    { month: "Nov", users: 8500 },
    { month: "Dec", users: 6000 },
  ];

  // State for time range selection
  const [timeRange, setTimeRange] = useState("Monthly");

  // User Activity Data
  const userActivity = [
    { label: "Daily Active Users", value: 1750, color: "#3B82F6" },
    { label: "New Users", value: 190, color: "#10B981" },
  ];

  // Device Breakdown Data
  const deviceBreakdown = [
    { label: "iOS", value: 64, color: "#8B5CF6" },
    { label: "Android", value: 35, color: "#34D399" },
  ];

  // Version Data
  const versionData = [
    { label: "iOS v16.2", value: 7.8, color: "#8B5CF6" },
    { label: "Android v13.4", value: 6.4, color: "#34D399" },
  ];

  return (
    <div className="  rounded-lg ">
      <div className="flex  justify-between gap-6">
        {/* User Growth Section */}
        <div className="bg-white basis-7/12 rounded-xl shadow drop-shadow-lg border border-gray-100 ">
          <div className="mb-6">
            <div className="border-b p-6">
              <h3
                className="text-2xl font-extrabold"
                style={{ color: "#6A6D57" }}
              >
                User Growth
              </h3>
            </div>
            <div className="flex space-x-2 mt-2 p-6">
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  timeRange === "Monthly"
                    ? "bg-[#bfc986] text-gray-800"
                    : "text-gray-500"
                }`}
                onClick={() => setTimeRange("Monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  timeRange === "Weekly"
                    ? "bg-[#bfc986] text-gray-800"
                    : "text-gray-500"
                }`}
                onClick={() => setTimeRange("Weekly")}
              >
                Weekly
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  timeRange === "Daily"
                    ? "bg-[#bfc986] text-gray-800"
                    : "text-gray-500"
                }`}
                onClick={() => setTimeRange("Daily")}
              >
                Daily
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mockUserData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6A6D57" fontSize={12} />
              <YAxis stroke="#6A6D57" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [
                  `${value.toLocaleString()} Users`,
                  "Users",
                ]}
              />
              <Bar dataKey="users" fill="#6A6D57" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-base font-extrabold text-gray-500 mt-2 p-6 flex items-center gap-3">
            <div className="h-[18px] w-[18px] rounded-full bg-[#6A6D57]"></div>
            <div className="flex items-center justify-between w-full">
              <h1>Total Users:</h1>
              <span>14,500</span>
            </div>
          </div>
        </div>

        {/* User Activity & Device Breakdown Section */}
        <div className="bg-white basis-5/12 rounded-xl shadow drop-shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold" style={{ color: "#6A6D57" }}>
            User Activity (Last 7 Days)
          </h3>
          <div className="mt-6 space-y-4">
            {userActivity.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-24 h-4 rounded-full"
                    style={{
                      backgroundColor: item.color,
                      width: `${(item.value / 1750) * 100}%`,
                    }}
                  ></div>
                  <span className="font-medium">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <h4
              className="text-lg font-semibold mt-6"
              style={{ color: "#6A6D57" }}
            >
              Device Breakdown
            </h4>
            <div className="space-y-2">
              {deviceBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 flex items-center gap-2">
                    {item.label === "iOS" ? "📱" : "📱"}
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-24 h-4 rounded-full"
                      style={{
                        backgroundColor: item.color,
                        width: `${item.value}%`,
                      }}
                    ></div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              {versionData.map((item, index) => (
                <div key={index}>
                  {item.label}: {item.value}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGraph;
