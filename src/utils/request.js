import axios from "axios";

const API_URL = import.meta.env.VITE_BE_API_URL;
const TOKEN_KEY = "userAppToken";

let unauthorizedHandler = null;

export const setUnauthorizedHandler = (fn) => {
    unauthorizedHandler = fn;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

const apiInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    removeToken();
                    if (unauthorizedHandler) {
                        unauthorizedHandler();
                    }
                    break;
                case 403:
                    console.error("Akses tidak dizinkan:", data?.message || data?.error?.message);
                    break;
                case 404:
                    console.error("Resource tidak ditemukan:", data?.message || data?.error?.message);
                    break;
                case 422:
                    console.error("Validasi gagal:", data?.error || data?.errors);
                    break;
                case 500:
                case 502:
                case 503:
                    console.error("Terjadi kesalahan pada server");
                    break;
                default:
                    console.error(`Error ${status}:`, data?.message || data?.error?.message);
            }
        } else if (error.request) {
            console.error("Tidak dapat terhubung ke server. Periksa koneksi internet");
        } else {
            console.error("Terjadi kesalahan saat menyiapkan request:", error.message);
        }

        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (credentials) => apiInstance.post("/login", credentials),
    register: (userData) => apiInstance.post("/register", userData),
    googleRedirectUrl: () => `${API_URL}/auth/google/redirect`,
    googleCallback: (searchParams) => apiInstance.get(`/auth/google/callback?${searchParams}`),
    logout: () => apiInstance.post("/logout"),
    getUser: () => apiInstance.get("/user"),
    forgotPassword: (email) => apiInstance.post("/forgot-password", { email }),
    resetPassword: (data) => apiInstance.post("/reset-password", data),
    googleRedirect: () => `${API_URL}/auth/google/redirect`,
};

export const blogAPI = {
    getBlogs: (params) => apiInstance.get("/blogs", { params }),
    getBlog: (id) => apiInstance.get(`/blogs/${id}`),
    createBlog: (data) => apiInstance.post("/blogs", data),
    updateBlog: (id, data) => apiInstance.put(`/blogs/${id}`, data),
    deleteBlog: (id) => apiInstance.delete(`/blogs/${id}`),
};

export default apiInstance;