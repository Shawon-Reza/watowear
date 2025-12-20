import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoints";

const useUserStore = create((set) => ({
	users: [],
	count: 0,
	next: null,
	previous: null,
	loading: false,
	error: null,
	currentUser: null,
	currentUserStats: null,

	fetchUsers: async (page = 1, search = "") => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.get(endpoints.USERS, {
				params: { page, search },
			});
			const { results, count, next, previous } = response.data;
			set({
				users: results,
				count,
				next,
				previous,
				loading: false,
			});
		} catch (error) {
			console.error("Error fetching users:", error);
			set({
				error: error.response?.data?.message || "Failed to fetch users",
				loading: false,
			});
		}
	},

	updateUserStatus: async (id, statusAction) => {
		set({ error: null }); // Don't set global loading to true
		try {
			const response = await axiosClient.post(
				`${endpoints.USERS}${id}/status/`,
				{
					status_action: statusAction,
				}
			);

			const updatedUser = response.data;

			set((state) => ({
				users: state.users.map((user) =>
					user.id == id ? updatedUser : user
				),
				// Also update currentUser if it's the same user
				currentUser:
					state.currentUser?.id == id
						? updatedUser
						: state.currentUser,
			}));
			return true;
		} catch (error) {
			console.error("Error updating user status:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to update user status",
			});
			return false;
		}
	},

	fetchUserDetails: async (id) => {
		set({ loading: true, error: null, currentUser: null });
		try {
			const response = await axiosClient.get(`${endpoints.USERS}${id}/`);
			set({ currentUser: response.data, loading: false });
		} catch (error) {
			console.error("Error fetching user details:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to fetch user details",
				loading: false,
			});
		}
	},

	fetchUserStats: async (id) => {
		set({ error: null, currentUserStats: null });
		try {
			const response = await axiosClient.get(endpoints.USER_STATS(id));
			set({ currentUserStats: response.data });
		} catch (error) {
			console.error("Error fetching user stats:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to fetch user stats",
			});
		}
	},
}));

export default useUserStore;
