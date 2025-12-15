import {
	Shield,
	Users,
	Activity,
	AlertTriangle,
	Lock,
	CheckCircle2,
	Clock,
} from "lucide-react";
import { useState } from "react";
import AddRoleUserModal from "./AddRoleUserModal";
import EditPermissionsModal from "./EditPermissionsModal";

export default function RoleManagement() {
	const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
	const [editingRole, setEditingRole] = useState(null);

	const stats = [
		{
			title: "Total Admins",
			value: "30",
			icon: <Users className="text-blue-500" size={24} />,
			bg: "bg-blue-50",
		},
		{
			title: "Active Sessions",
			value: "18",
			icon: <Activity className="text-green-500" size={24} />,
			bg: "bg-green-50",
		},
		{
			title: "Failed Logins (24h)",
			value: "3",
			icon: <Lock className="text-red-500" size={24} />,
			bg: "bg-red-50",
		},
		{
			title: "Security Alerts",
			value: "0",
			icon: <Shield className="text-gray-500" size={24} />,
			bg: "bg-gray-50",
		},
	];

	const roles = [
		{
			role: "Super Admin",
			admins: 2,
			permissions: [
				"Full system access",
				"User management",
				"System configuration",
				"All moderation",
			],
			color: "bg-blue-100 text-blue-700",
		},
		{
			role: "Admin",
			admins: 5,
			permissions: [
				"User management",
				"Content moderation",
				"Analytics access",
			],
			color: "bg-purple-100 text-purple-700",
		},
		{
			role: "Editor",
			admins: 10,
			permissions: [
				"Editorial content",
				"Fashion library",
				"Community moderation",
			],
			color: "bg-pink-100 text-pink-700",
		},
		{
			role: "Analyst",
			admins: 8,
			permissions: [
				"Analytics access",
				"Report generation",
				"Read-only access",
			],
			color: "bg-indigo-100 text-indigo-700",
		},
		{
			role: "Support",
			admins: 15,
			permissions: [
				"User support",
				"Basic moderation",
				"Ticket management",
			],
			color: "bg-orange-100 text-orange-700",
		},
	];

	const activityLog = [
		{
			admin: "Sarah Admin",
			action: "Approved wardrobe item",
			role: "admin",
			timestamp: "2024-03-20 14:32",
		},
		{
			admin: "Mike Support",
			action: "Suspended user account",
			role: "admin",
			timestamp: "2024-03-20 13:15",
		},
		{
			admin: "Lisa Editor",
			action: "Published editorial content",
			role: "admin",
			timestamp: "2024-03-20 11:45",
		},
		{
			admin: "Sarah Admin",
			action: "Updated fashion catalog",
			role: "admin",
			timestamp: "2024-03-20 10:20",
		},
	];

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-[#222]">
						Role Management
					</h1>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="bg-white p-6 rounded-xl shadow-sm border border-[#6A6D57]/10 flex items-center justify-between"
					>
						<div>
							<p className="text-sm text-gray-500 mb-1">
								{stat.title}
							</p>
							<h3 className="text-3xl font-bold text-[#222]">
								{stat.value}
							</h3>
						</div>
						<div className={`p-3 rounded-xl ${stat.bg}`}>
							{stat.icon}
						</div>
					</div>
				))}
			</div>

			{/* Role Permissions Matrix */}
			<div className="bg-white rounded-xl shadow-sm border border-[#6A6D57]/10 overflow-hidden">
				<div className="p-6 border-b border-[#6A6D57]/10 flex justify-between items-center">
					<h2 className="text-lg font-semibold text-[#222]">
						Role Permissions Matrix
					</h2>
					<button
						onClick={() => setIsAddUserModalOpen(true)}
						className="bg-[#6A6D57] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5a5d4a] transition-colors"
					>
						Add New Role
					</button>
				</div>
				<div className="p-6 space-y-6">
					{roles.map((item, index) => (
						<div
							key={index}
							className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
						>
							<div className="flex justify-between items-start mb-3">
								<div className="flex items-center gap-3">
									<h3 className="font-semibold text-gray-800">
										{item.role}
									</h3>
									<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
										{item.admins} admins
									</span>
								</div>
								<button
									onClick={() => setEditingRole(item.role)}
									className="text-gray-500 text-sm hover:text-[#6A6D57]"
								>
									Edit Permissions
								</button>
							</div>
							<div className="flex flex-wrap gap-2">
								{item.permissions.map((perm, idx) => (
									<span
										key={idx}
										className={`px-3 py-1 rounded-full text-xs font-medium ${item.color.replace(
											"text-",
											"bg-"
										)} bg-opacity-10 text-opacity-100 ${
											item.role === "Super Admin" ||
											item.role === "super admin"
												? "bg-blue-100 text-blue-700"
												: item.role === "Admin" ||
												  item.role === "admin"
												? "bg-blue-100 text-blue-700"
												: item.role === "Editor" ||
												  item.role === "editor"
												? "bg-blue-100 text-blue-700"
												: item.role === "Analyst" ||
												  item.role === "analyst"
												? "bg-blue-100 text-blue-700"
												: "bg-blue-100 text-blue-600"
										}`}
									>
										{/* Just forcing blue style as per image mostly blue/purple nuances but let's stick to the color prop if needed or override to match image exactly. 
                                            The image has blueish tags for all roles nicely. Let's use blue-ish for all for consistency with image. */}
										{perm}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Admin Activity Log */}
			<div className="bg-white rounded-xl shadow-sm border border-[#6A6D57]/10 overflow-hidden">
				<div className="p-6 border-b border-[#6A6D57]/10">
					<h2 className="text-lg font-semibold text-[#222]">
						Admin Activity Log
					</h2>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50/50">
							<tr>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Admin
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Action
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Role
								</th>
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Timestamp
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{activityLog.map((log, index) => (
								<tr
									key={index}
									className="hover:bg-gray-50 transition-colors"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{log.admin}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
										{log.action}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
											{log.role}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{log.timestamp}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<AddRoleUserModal
				isOpen={isAddUserModalOpen}
				onClose={() => setIsAddUserModalOpen(false)}
			/>

			<EditPermissionsModal
				isOpen={!!editingRole}
				onClose={() => setEditingRole(null)}
				roleName={editingRole}
			/>
		</div>
	);
}
