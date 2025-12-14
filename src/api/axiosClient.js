import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://10.10.13.75:8000",
	// baseURL: "https://endlessly-unified-guppy.ngrok-free.app",
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosClient;
