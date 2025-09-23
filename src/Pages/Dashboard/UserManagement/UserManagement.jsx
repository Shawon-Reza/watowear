import { useState } from "react";
import {
  Search,
  User,
  Ban,
  CheckCircle,
  ShieldCheck,
  Trash2,
  Crown,
  Mail,
} from "lucide-react";
import { TfiStatsUp } from "react-icons/tfi";
import { IoStatsChart } from "react-icons/io5";

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-young-man_1268-21877.jpg?semt=ais_incoming&w=740&q=80",
      name: "John Doe",
      email: "john.doe@example.com",
      signup_method: "Email",
      status: "Active",
      closet_amount: 50,
      last_active: "5h ago",
      engagement: 90,
      user_joined: "27 October, 25",
      average_session_duration: "12.45 minutes",
    },
    {
      id: 2,
      name: "Jane Smith",
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-young-man_1268-21877.jpg?semt=ais_incoming&w=740&q=80",
      email: "jane.smith@example.com",
      signup_method: "Google",
      status: "Inactive",
      closet_amount: 25,
      last_active: "1h ago",
      engagement: 80,
      user_joined: "18 February, 25",
      average_session_duration: "12.45 minutes",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-young-man_1268-21877.jpg?semt=ais_incoming&w=740&q=80",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      signup_method: "Apple",
      status: "Active",
      closet_amount: 3,
      last_active: "30 min ago",
      engagement: 53,
      user_joined: "12 July, 25",
      average_session_duration: "12.45 minutes",
    },
    {
      id: 4,
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-young-man_1268-21877.jpg?semt=ais_incoming&w=740&q=80",
      name: "Emily Brown",
      email: "emily.brown@example.com",
      signup_method: "Google",
      status: "Active",
      closet_amount: 103,
      last_active: "5h ago",
      engagement: 23,
      user_joined: "11 July, 25",
      average_session_duration: "12.45 minutes",
    },
    {
      id: 5,
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-young-man_1268-21877.jpg?semt=ais_incoming&w=740&q=80",
      name: "David Wilson",
      email: "david.wilson@example.com",
      signup_method: "Apple",
      status: "Inactive",
      closet_amount: 36,
      last_active: "18h ago",
      engagement: 89,
      user_joined: "12 August, 25",
      average_session_duration: "12.45 minutes",
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
      prev.map((user) =>
        user.id === id ? { ...user, closet_amount: "Admin" } : user
      )
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
            <p className="text-[#6A6D57]/80 ">
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
                  {users.filter((u) => u.closet_amount === "Admin").length}
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
              <thead className="bg-gradient-to-r from-[#F4F1EB] to-white">
                <tr className=" border-b border-[#6A6D57]/10">
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    User Information
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Signup Method
                  </th>
                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Closet Items
                  </th>

                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Engagement
                  </th>

                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Last Login
                  </th>

                  <th className="px-8 py-6 text-left font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-8 py-6 text-center font-bold text-[#6A6D57] text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6A6D57]/10">
                {users.map((user, id) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-gradient-to-r hover:from-[#6A6D57]/5 hover:to-[#6A6D57]/10 transition-all duration-300 hover:shadow-md"
                  >
                    <td className="px-8 py-6">
                      <button
                        className="bg-transparent hover:bg-transparent border-none shadow-none p-0"
                        onClick={() =>
                          document.getElementById(user?.id).showModal()
                        }
                      >
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-[50px] rounded-full">
                              <img src={user?.image} className="rounded-full" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-[#6A6D57] text-start text-base group-hover:text-[#5A5D4A] transition-colors">
                              {user.name}
                            </p>
                            <div className="flex items-center gap-2 text-[#6A6D57]/70">
                              <Mail size={14} />
                              <p className="text-sm">{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </button>

                      <dialog id={user?.id} className="modal ">
                        <div className="modal-box dark:bg-white text-gray-900">
                          <div className="border-b-2 pb-2">
                            <h3 className="font-bold flex items-start gap-2 text-lg">
                              <IoStatsChart size={24} />
                              User Statistics
                            </h3>
                          </div>
                          {/* info of user */}
                          <div className="py-5 space-y-6">
                            <h1 className="flex items-center justify-between">
                              User Joined :
                              <span className="font-bold">
                                {user?.user_joined}
                              </span>
                            </h1>

                            <h1 className="flex items-center justify-between">
                              User Status :
                              <span className="font-bold">{user?.status}</span>
                            </h1>

                            <h1 className="flex items-center justify-between">
                              Closet Items :
                              <span className="font-bold">
                                {user?.closet_amount} Items
                              </span>
                            </h1>

                            <h1 className="flex items-center justify-between">
                              Average Session Duration :
                              <span className="font-bold">
                                {user?.average_session_duration}
                              </span>
                            </h1>
                          </div>
                          <div>
                            <h1></h1>
                          </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    </td>

                    {/* method */}
                    <td className="px-8 py-6 text-[#6A6D57] text-base font-semibold">
                      {user.signup_method}
                    </td>

                    {/* Status */}

                    <td className="px-8 py-6 text-gray-900">
                      {user?.closet_amount}
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-44 h-[10px] rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            user?.engagement < 30
                              ? "bg-red-500"
                              : user?.engagement < 80
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${user?.engagement || 0}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {user?.engagement}%
                      </span>
                    </td>

                    <td className="px-8 py-6 text-gray-900">
                      {user?.last_active}
                    </td>
                    {/* closet_amount */}

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

                    {/* Actions */}
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
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
