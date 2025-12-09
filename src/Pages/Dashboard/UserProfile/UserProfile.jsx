import UserProfileHeader from "./UserProfileHeader";
import UserProfilePaymentHistory from "./UserProfilePaymentHistory";
import UserProfileRecentActivity from "./UserProfileRecentActivity";

const UserProfile = () => {
	return (
		<div>
			<section>
				<UserProfileHeader />
			</section>
			<section className="my-10">
				<UserProfilePaymentHistory />
			</section>
			<section>
				<UserProfileRecentActivity />
			</section>
		</div>
	);
};

export default UserProfile;
