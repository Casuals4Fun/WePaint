import { create } from 'zustand'

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'dark',
    setTheme: (theme: string) => set({ theme: theme })
}));

export const useToolbarStore = create<ToolbarState>((set) => ({
    bgSelect: false,
    setBgSelect: (bgSelect: boolean) => set({ bgSelect: bgSelect }),
    canvasBg: '#fff',
    setCanvasBg: (canvasBg: string) => set({ canvasBg: canvasBg }),
    colorPicker: false,
    setColorPicker: (colorPicker: boolean) => set({ colorPicker: colorPicker }),
    color: '#000',
    setColor: (color: string) => set({ color: color }),
    brushEdit: false,
    setBrushEdit: (brushEdit: boolean) => set({ brushEdit: brushEdit }),
    brushThickness: 5,
    setBrushThickness: (brushThickness: number) => set({ brushThickness: brushThickness }),
    downloadSelect: false,
    setDownloadSelect: (downloadSelect: boolean) => set({ downloadSelect: downloadSelect }),
    downloadCanvasWidth: 750,
    setDownloadCanvasWidth: (downloadCanvasWidth: number) => set({ downloadCanvasWidth: downloadCanvasWidth }),
    downloadCanvasHeight: 750,
    setDownloadCanvasHeight: (downloadCanvasHeight: number) => set({ downloadCanvasHeight: downloadCanvasHeight }),
    openCanvasBg: false,
    setOpenCanvasBg: (openCanvasBg: boolean) => set({ openCanvasBg: openCanvasBg }),
    downloadCanvasBg: '#fff',
    setDownloadCanvasBg: (downloadCanvasBg: string) => set({ downloadCanvasBg: downloadCanvasBg }),
}));

export const useSocketStore = create<SocketState>((set) => ({
    connected: false,
    setConnected: (connected: boolean) => set({ connected: connected })
}));