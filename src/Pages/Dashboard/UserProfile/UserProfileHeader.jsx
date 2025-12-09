import { ArrowLeft, Calendar, MoreHorizontal } from "lucide-react";

const SAMPLE_USER = {
	name: "Olivia Martinez",
	email: "olivia.martinez@example.com",
	joined: "Apr 17, 2022",
	plan: "Plus Plan",
	avatar: "https://i.pravatar.cc/96?img=47",
	closetItems: 128,
	purchasedItems: "N/A",
	subscription: "Monthly",
	accountStatus: "Active",
};

export default function UserProfileHeader() {
	const u = SAMPLE_USER;

	return (
		<div className="space-y-6">
			<div className="flex items-center">
				<button className="inline-flex items-center gap-2 bg-white/90 text-[#33402d] px-3 py-1 rounded-md shadow-sm">
					<ArrowLeft size={14} />
					<span className="text-sm">Back</span>
				</button>
			</div>

			<div className="bg-[#6A6D57] rounded-xl p-6 text-white relative overflow-hidden">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					<div className="flex items-center gap-4">
						<img
							src={u.avatar}
							alt="avatar"
							className="w-20 h-20 rounded-full ring-4 ring-white shadow-md"
						/>

						<div>
							<h2 className="text-xl md:text-2xl font-semibold">
								{u.name}
							</h2>
							<div className="flex items-center gap-3 text-sm md:text-base mt-2 text-white/90">
								<div className="flex items-center gap-2">
									<svg
										className="w-4 h-4 text-white/80"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path d="M4 4h16v16H4z" fill="none" />
									</svg>
									<span className="text-sm">{u.email}</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar size={14} />
									<span className="text-sm">
										Joined {u.joined}
									</span>
								</div>
							</div>

							<div className="mt-4">
								<button className="bg-white text-[#6A6D57] rounded-md px-5 py-2 font-medium shadow">
									{u.plan}
								</button>
							</div>
						</div>
					</div>

					<div className="flex items-start md:items-center md:justify-end">
						<button className="ml-auto bg-white/90 text-[#6A6D57] p-2 rounded-md shadow-sm">
							<MoreHorizontal size={18} />
						</button>
					</div>
				</div>
			</div>

			{/* Stats cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				<div className="bg-white rounded-lg p-4 shadow border border-[#eee]">
					<div className="text-sm text-[#6A6D57]/80">
						Closet Items
					</div>
					<div className="text-2xl font-bold mt-2">
						{u.closetItems}
					</div>
				</div>

				<div className="bg-white rounded-lg p-4 shadow border border-[#eee]">
					<div className="text-sm text-[#6A6D57]/80">
						Purchased Items
					</div>
					<div className="text-2xl font-bold mt-2">
						{u.purchasedItems}
					</div>
				</div>

				<div className="bg-white rounded-lg p-4 shadow border border-[#eee]">
					<div className="text-sm text-[#6A6D57]/80">
						Subscription Status
					</div>
					<div className="text-2xl font-bold mt-2">
						{u.subscription}
					</div>
				</div>

				<div className="bg-white rounded-lg p-4 shadow border border-[#eee]">
					<div className="text-sm text-[#6A6D57]/80">
						Account Status
					</div>
					<div className="text-2xl font-bold mt-2">
						{u.accountStatus}
					</div>
				</div>
			</div>
		</div>
	);
}
