import axios from "axios";

const axiosClient = axios.create({
	// baseURL: "http://10.10.13.75:8000",
	baseURL: "https://endlessly-unified-guppy.ngrok-free.app",
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.set("Authorization", `Bearer ${token}`);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
