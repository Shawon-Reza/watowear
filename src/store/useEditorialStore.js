import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoints";

const useEditorialStore = create((set, get) => ({
	editorials: [],
	carouselImages: [],
	loading: false,
	error: null,

	fetchEditorials: async () => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.get(endpoints.EDITORIAL);
			// Handle both direct array responses and paginated { results: [...] } responses
			const data = Array.isArray(response.data)
				? response.data
				: response.data?.results || [];
			set({ editorials: data, loading: false });
		} catch (error) {
			console.error("Error fetching editorials:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to fetch editorials",
				loading: false,
			});
		}
	},

	fetchCarouselImages: async () => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.get(endpoints.CAROUSEL);
			set({ carouselImages: response.data, loading: false });
		} catch (error) {
			console.error("Error fetching carousel images:", error);
			set({
				error:
					error.response?.data?.message ||
					"Failed to fetch carousel images",
				loading: false,
			});
		}
	},

	createEditorial: async (formData) => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.post(
				endpoints.EDITORIAL,
				formData
			);
			set((state) => ({
				editorials: [response.data, ...state.editorials],
				loading: false,
			}));
			return { success: true, data: response.data };
		} catch (error) {
			console.error("Error creating editorial:", error);
			let errorMsg = "Failed to create editorial";
			if (error.response?.data) {
				const data = error.response.data;
				errorMsg =
					data.message ||
					data.detail ||
					(typeof data === "object" ? JSON.stringify(data) : data);
			}
			set({
				error: errorMsg,
				loading: false,
			});
			return { success: false, error: errorMsg };
		}
	},

	updateEditorial: async (id, formData) => {
		set({ loading: true, error: null });
		try {
			const response = await axiosClient.patch(
				`${endpoints.EDITORIAL}${id}/`,
				formData
			);
			set((state) => ({
				editorials: state.editorials.map((e) =>
					e.id === id ? response.data : e
				),
				loading: false,
			}));
			return { success: true, data: response.data };
		} catch (error) {
			console.error("Error updating editorial:", error);
			let errorMsg = "Failed to update editorial";
			if (error.response?.data) {
				const data = error.response.data;
				errorMsg =
					data.message ||
					data.detail ||
					(typeof data === "object" ? JSON.stringify(data) : data);
			}
			set({
				error: errorMsg,
				loading: false,
			});
			return { success: false, error: errorMsg };
		}
	},

	deleteEditorial: async (id) => {
		set({ loading: true, error: null });
		try {
			await axiosClient.delete(`${endpoints.EDITORIAL}${id}/`);
			set((state) => ({
				editorials: state.editorials.filter((e) => e.id !== id),
				loading: false,
			}));
			return { success: true };
		} catch (error) {
			console.error("Error deleting editorial:", error);
			let errorMsg = "Failed to delete editorial";
			if (error.response?.data) {
				const data = error.response.data;
				errorMsg =
					data.message ||
					data.detail ||
					(typeof data === "object" ? JSON.stringify(data) : data);
			}
			set({
				error: errorMsg,
				loading: false,
			});
			return { success: false, error: errorMsg };
		}
	},

	addCarouselImage: async (imageFile) => {
		set({ loading: true, error: null });
		try {
			const formData = new FormData();
			formData.append("image", imageFile);
			formData.append("order", 3);

			await axiosClient.post(endpoints.CAROUSEL_ADD, formData);

			// Refresh carousel images
			await get().fetchCarouselImages();

			return { success: true };
		} catch (error) {
			console.error("Error adding carousel image:", error);
			let errorMsg = "Failed to add carousel image";
			if (error.response?.data) {
				const data = error.response.data;
				errorMsg =
					data.message ||
					data.detail ||
					(typeof data === "object" ? JSON.stringify(data) : data);
			}
			set({
				error: errorMsg,
				loading: false,
			});
			return { success: false, error: errorMsg };
		}
	},

	deleteCarouselImage: async (id) => {
		set({ loading: true, error: null });
		try {
			await axiosClient.delete(endpoints.CAROUSEL_DELETE(id));

			// Refresh carousel images
			await get().fetchCarouselImages();

			return { success: true };
		} catch (error) {
			console.error("Error deleting carousel image:", error);
			let errorMsg = "Failed to delete carousel image";
			if (error.response?.data) {
				const data = error.response.data;
				errorMsg =
					data.message ||
					data.detail ||
					(typeof data === "object" ? JSON.stringify(data) : data);
			}
			set({
				error: errorMsg,
				loading: false,
			});
			return { success: false, error: errorMsg };
		}
	},
}));

export default useEditorialStore;
