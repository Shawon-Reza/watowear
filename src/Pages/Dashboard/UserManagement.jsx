import { useState } from "react";
import {
  Plus,
  Search,
  User,
  Ban,
  CheckCircle,
  ShieldCheck,
  Trash2,
  Crown,
  Mail,
} from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      plan: "Pro",
      status: "Active",
      role: "User",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      plan: "Free",
      status: "Inactive",
      role: "User",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      plan: "Enterprise",
      status: "Active",
      role: "Admin",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      plan: "Pro",
      status: "Active",
      role: "User",
      avatar: "EB",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      plan: "Free",
      status: "Inactive",
      role: "User",
      avatar: "DW",
    },
  ]);

  // Toggle status
  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  // Make Admin
  const makeAdmin = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: "Admin" } : user))
    );
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className=" mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6A6D57] via-[#5A5D4A] to-[#4A4D3A] bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-[#6A6D57]/80 pt-3">
              Manage and monitor your application users with ease
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 pb-5">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#6A6D57]/10 shadow-md">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#6A6D57]/10 rounded-xl">
                <User className="text-[#6A6D57]" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#6A6D57]">
                  {users.length}
                </p>
                <p className="text-[#6A6D57]/70 text-sm">Total Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#6A6D57]/10 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#6A6D57]">
                  {users.filter((u) => u.status === "Active").length}
                </p>
                <p className="text-[#6A6D57]/70 text-sm">Active Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#6A6D57]/10 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Crown className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#6A6D57]">
                  {users.filter((u) => u.role === "Admin").length}
                </p>
                <p className="text-[#6A6D57]/70 text-sm">Administrators</p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#6A6D57]/10 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <ShieldCheck className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#6A6D57]">
                  {
                    users.filter(
                      (u) => u.plan === "Pro" || u.plan === "Enterprise"
                    ).length
                  }
                </p>
                <p className="text-[#6A6D57]/70 text-sm">Premium Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-[#6A6D57]/10 shadow-md overflow-hidden">
          {/* Search Header */}
          <div className="p-8 bg-gradient-to-r from-white/40 to-[#6A6D57]/5 border-b border-[#6A6D57]/10">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6A6D57]/60"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="w-full pl-12 pr-4 py-4 bg-white/60 border border-[#6A6D57]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/50 focus:border-[#6A6D57]/50 transition-all duration-300 text-[#6A6D57] placeholder-[#6A6D57]/50"
                />
              </div>
              <div className="flex items-center gap-3 ml-">
                <select className="px-3 py-3 bg-white/60 border border-[#6A6D57]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/50 text-[#6A6D57] ">
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>User</option>
                </select>
                <select className="px-4 py-3 bg-white/60 border border-[#6A6D57]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/50 text-[#6A6D57]">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="overflow-x-auto cursor-pointer">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#F4F1EB] to-[#6A6D57]/5 border-b border-[#6A6D57]/10">
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    User Information
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Subscription
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-8 py-6 text-center font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6A6D57]/10">
                {users.map((user, idx) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-gradient-to-r hover:from-[#6A6D57]/5 hover:to-[#6A6D57]/10 transition-all duration-300 hover:shadow-md"
                  >
                    {/* User Info */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6A6D57] to-[#5A5D4A] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {user.avatar}
                          </div>
                          {user.status === "Active" && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-[#6A6D57] text-base group-hover:text-[#5A5D4A] transition-colors">
                            {user.name}
                          </p>
                          <div className="flex items-center gap-2 text-[#6A6D57]/70">
                            <Mail size={14} />
                            <p className="text-sm">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                          user.plan === "Free"
                            ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
                            : user.plan === "Pro"
                            ? "bg-gradient-to-r from-[#6A6D57]/10 to-[#6A6D57]/20 text-[#6A6D57]"
                            : "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700"
                        }`}
                      >
                        {user.plan === "Enterprise" && (
                          <Crown size={16} className="mr-2" />
                        )}
                        {user.plan}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                          user.status === "Active"
                            ? "bg-gradient-to-r from-green-100 to-emerald-200 text-green-700"
                            : "bg-gradient-to-r from-red-100 to-red-200 text-red-700"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            user.status === "Active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        {user.status}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {user.role === "Admin" && (
                          <Crown size={16} className="text-yellow-600" />
                        )}
                        <span
                          className={`font-semibold text-base ${
                            user.role === "Admin"
                              ? "text-yellow-700"
                              : "text-[#6A6D57]"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Block / Unblock */}
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className={`group/btn p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                            user.status === "Active"
                              ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                              : "bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700"
                          }`}
                          title={
                            user.status === "Active"
                              ? "Block User"
                              : "Unblock User"
                          }
                        >
                          {user.status === "Active" ? (
                            <Ban
                              size={18}
                              className="group-hover/btn:scale-110 transition-transform"
                            />
                          ) : (
                            <CheckCircle
                              size={18}
                              className="group-hover/btn:scale-110 transition-transform"
                            />
                          )}
                        </button>

                        {/* Make Admin */}
                        {user.role !== "Admin" && (
                          <button
                            onClick={() => makeAdmin(user.id)}
                            className="group/btn p-3 rounded-xl bg-[#6A6D57]/10 text-[#6A6D57] hover:bg-[#6A6D57]/20 hover:text-[#5A5D4A] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                            title="Make Admin"
                          >
                            <ShieldCheck
                              size={18}
                              className="group-hover/btn:scale-110 transition-transform"
                            />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="group/btn p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                          title="Delete User"
                        >
                          <Trash2
                            size={18}
                            className="group-hover/btn:scale-110 transition-transform"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
