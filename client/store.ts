import { create } from 'zustand'

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'dark',
    setTheme: (theme: string) => set({ theme: theme })
}));

export const useToolbarStore = create<ToolbarState>((set) => ({
    colorPicker: false, 
    setColorPicker: (colorPicker: boolean) => set({ colorPicker: colorPicker }),
    color: '#000',
    setColor: (color: string) => set({ color: color }), 
    brushEdit: false, 
    setBrushEdit: (brushEdit: boolean) => set({ brushEdit: brushEdit }), 
    brushThickness: 5, 
    setBrushThickness: (brushThickness: number) => set({ brushThickness: brushThickness })
}));