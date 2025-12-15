import {
	X,
	Eye,
	EyeOff,
	User,
	Mail,
	Phone,
	Lock,
	Briefcase,
} from "lucide-react";
import { useState } from "react";

export default function AddRoleUserModal({ isOpen, onClose }) {
	const [showPassword, setShowPassword] = useState(false);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
			<div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
				{/* Header */}
				<div className="p-6 border-b border-gray-100">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold text-gray-800">
							Add Role User
						</h2>
						{/* No close button in design header, but good UX usually has one. Design shows just title and divider. keeping clean. */}
					</div>
				</div>

				{/* Body */}
				<div className="p-8 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* First Name */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600 flex items-center gap-2">
								<User size={16} /> First Name
							</label>
							<input
								type="text"
								placeholder="Enter first name"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all placeholder:text-gray-300"
							/>
						</div>

						{/* Last Name */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600 flex items-center gap-2">
								<User size={16} /> Last Name
							</label>
							<input
								type="text"
								placeholder="Enter last name"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all placeholder:text-gray-300"
							/>
						</div>

						{/* Email Address */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600 flex items-center gap-2">
								<Mail size={16} /> Email Address
							</label>
							<input
								type="email"
								placeholder="Enter email address"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all placeholder:text-gray-300"
							/>
						</div>

						{/* Phone Number */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600 flex items-center gap-2">
								<Phone size={16} /> Phone Number
							</label>
							<input
								type="tel"
								placeholder="Enter phone number"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all placeholder:text-gray-300"
							/>
						</div>

						{/* Set Password */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600 flex items-center gap-2">
								<Lock size={16} /> Set Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Set a password"
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all placeholder:text-gray-300 pr-10"
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								>
									{showPassword ? (
										<EyeOff size={20} />
									) : (
										<Eye size={20} />
									)}
								</button>
							</div>
						</div>

						{/* Role dropdown */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600 flex items-center gap-2">
								<Briefcase size={16} /> Role
							</label>
							<div className="relative">
								<select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6A6D57]/20 focus:border-[#6A6D57] transition-all text-gray-500 appearance-none bg-white">
									<option value="" disabled selected>
										Select a role
									</option>
									<option value="admin">Admin</option>
									<option value="editor">Editor</option>
									<option value="analyst">Analyst</option>
									<option value="support">Support</option>
								</select>
								{/* Custom arrow if needed, but browser default is okay for now or minimal svg */}
								<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="m6 9 6 6 6-6" />
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="p-6 flex justify-end gap-3">
					<button
						onClick={onClose}
						className="px-8 py-2.5 rounded-lg border border-red-200 text-red-500 font-medium hover:bg-red-50 transition-colors"
					>
						Cancel
					</button>
					<button className="px-8 py-2.5 rounded-lg bg-[#6A6D57] text-white font-medium hover:bg-[#5a5d4a] transition-colors shadow-sm">
						Add User
					</button>
				</div>
			</div>
		</div>
	);
}
