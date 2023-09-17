import { create } from 'zustand'

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'dark',
    setTheme: (theme: string) => set({ theme: theme })
}));