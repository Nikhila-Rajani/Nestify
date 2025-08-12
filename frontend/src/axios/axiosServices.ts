import { toast } from "react-hot-toast";
import { store } from "../Redux/Store/Store";
import { logoutUser } from "../Redux/User/userSlice";
import axios from "axios";

interface TokenResponse {
    tokens: {
        accessToken: string;
        refreshToken: string
    }
}

type Role = "user" | "admin" | "host";

// Get base URL based on role
const getBaseUrl = (role: Role): string => {
    switch (role) {
        case "user":
            return import.meta.env.VITE_Base_Url_User;
        case "host":
            return import.meta.env.VITE_Base_Url_Host;
        case "admin":
            return import.meta.env.VITE_Base_Url_Admin;
        default:
            throw new Error("Invalid role type");
    }
};

// Logout logic based on role
const logout = (role: Role): void => {
    const dispatch = store.dispatch;
    console.log(`Logging out ${role}...`);

    switch (role) {
        case "user":
            dispatch(logoutUser());
            window.location.href = "/login";
            break;

        // case "host":
        //   dispatch(logoutHost());
        //   window.location.href = "/doctor/login";
        //   break;
        // case "admin":
        //   dispatch(adminLogout());
        //   window.location.href = "/admin/login";
        //   break;
    }

    toast.error("Your session has expired. Please log in again.", { duration: 5000 });
};

export const createApiInstances = (role: Role) => {
    const baseUrl = getBaseUrl(role)

    const instanse = axios.create({
        baseURL: baseUrl,
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    })

    instanse.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config

            if (originalRequest.url === "/login") return Promise.reject(error);

            const status = error.response?.status;

            if (status === 403) {
                toast.error("You have been blocked by the admin.");
                setTimeout(() => logout(role), 5000);
                return Promise.reject(error);
            }

            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                if (
                    error.response?.data?.message ===
                    "Login failed. Please check your credentials."
                ) {
                    toast.error("Login failed. Please check your credentials.");
                    return Promise.reject(error);
                }

                const refreshTokenUrl = `${ baseUrl }/refresh-token`;

                try {
                    const refreshResponse = await axios.post<TokenResponse>(
                        refreshTokenUrl,
                        {},
                        { withCredentials: true }
                    );

                    const { accessToken } = refreshResponse.data.tokens;

                    originalRequest.headers["Authorization"] = `Bearer ${ accessToken }`;
                    return instanse(originalRequest);
                } catch (refreshError) {
                    console.error("Failed to refresh token:", refreshError);
                    toast.error("Session expired. Please log in again.");
                    setTimeout(() => logout(role), 5000);
                    return Promise.reject(refreshError);
                }
            }

            toast.error("An unexpected error occurred. Please try again.");
            return Promise.reject(error);
        }
    )
    return instanse
}
