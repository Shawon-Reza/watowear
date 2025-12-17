import { ArrowLeft, Box, CreditCard, Shirt, User } from "lucide-react";
import UserProfileHeader from "./UserProfileHeader";
import UserProfilePaymentHistory from "./UserProfilePaymentHistory";
import UserProfileRecentActivity from "./UserProfileRecentActivity";

const UserProfile = () => {
	// Mock stats data
	const stats = [
		{
			label: "Closet Items",
			value: "128",
			icon: <Shirt size={20} className="text-[#6A6D57]" />,
		},
		{
			label: "Purchased Items",
			value: "N/A",
			icon: <Box size={20} className="text-[#6A6D57]" />,
		},
		{
			label: "Subscription Status",
			value: "Monthly",
			icon: <CreditCard size={20} className="text-[#6A6D57]" />,
		},
		{
			label: "Account Status",
			value: "Active",
			icon: <User size={20} className="text-[#6A6D57]" />,
		},
	];

	return (
		<div className="space-y-8">
			{/* Top Bar */}
			<div>
				<button className="inline-flex items-center gap-2 bg-[#6A6D57] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-[#5a5d4a] transition-colors text-sm font-medium">
					<ArrowLeft size={16} />
					<span>Back</span>
				</button>
			</div>

			{/* Profile Header Card */}
			<section>
				<UserProfileHeader />
			</section>

			{/* Stats Grid */}
			<section>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="bg-white rounded-xl p-6 shadow-sm border border-[#e8e8e8] flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
						>
							<div className="text-sm font-medium text-[#6A6D57]/70 flex items-center gap-2 mb-3">
								{stat.icon}
								{stat.label}
							</div>
							<div className="text-2xl font-bold text-[#333]">
								{stat.value}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Payment History */}
			<section className="bg-white rounded-xl border border-[#e8e8e8] shadow-sm p-6">
				<UserProfilePaymentHistory />
			</section>

			{/* Recent Activity */}
			<section>
				<UserProfileRecentActivity />
			</section>
		</div>
	);
};

export default UserProfile;
