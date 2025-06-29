import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set ({authUser: res.data})
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error(error.response?.data?.message || "Failed to create account");
        } finally {
            set({ isSigningUp: false });
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error(error.response?.data?.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logIn: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error(error.response?.data?.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message);
        } finally {
            set ({ isUpdatingProfile: false});
        }
        
    },
    
}));
