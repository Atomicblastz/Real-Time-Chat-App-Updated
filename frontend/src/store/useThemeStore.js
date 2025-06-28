import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    selectedTheme: localStorage.getItem("theme") || "light",
    setSelectedTheme: (theme) => {
        localStorage.setItem("theme", theme),
        set({ selectedTheme: theme });
    },
}));