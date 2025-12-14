import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoints";

const useAuthStore = create((set, get) => ({
	user: JSON.parse(localStorage.getItem("user")) || null,
	isAuthenticated: !!localStorage.getItem("access_token"),
	token: localStorage.getItem("access_token") || null,
	loading: false,
	error: null,

	// Actions
	login: async (email, password) => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.post(endpoints.LOGIN, {
				email,
				password,
			});
			const { user, access, refresh } = response.data;

			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("access_token", access);
			localStorage.setItem("refresh_token", refresh);

			set({ user, isAuthenticated: true, token: access, loading: false });
			return true; // Success
		} catch (error) {
			console.error("Login error:", error);
			set({
				error: error.response?.data?.message || "Login failed",
				loading: false,
			});
			return false; // Failure
		}
	},

	logout: () => {
		localStorage.removeItem("user");
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		set({ user: null, isAuthenticated: false, token: null });
	},

	checkAuth: () => {
		const token = localStorage.getItem("access_token");
		const user = JSON.parse(localStorage.getItem("user"));
		if (token && user) {
			set({ isAuthenticated: true, token, user });
		} else {
			set({ isAuthenticated: false, token: null, user: null });
		}
	},
}));

export default useAuthStore;
