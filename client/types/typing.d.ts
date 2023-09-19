type Draw = {
    ctx: CanvasRenderingContext2D,
    currPoint: Point,
    prevPoint: Point | null
};

type Point = { x: number, y: number };

type ThemeState = {
    theme: string,
    setTheme: (theme: string) => void
};

type ToolbarState = {
    bgSelect: boolean,
    setBgSelect: Dispatch<SetStateAction<boolean>>,
    canvasBg: string,
    setCanvasBg: Dispatch<SetStateAction<string>>,
    colorPicker: boolean,
    setColorPicker: Dispatch<SetStateAction<boolean>>,
    color: string,
    setColor: Dispatch<SetStateAction<string>>,
    brushEdit: boolean,
    setBrushEdit: Dispatch<SetStateAction<boolean>>,
    brushThickness: number,
    setBrushThickness: Dispatch<SetStateAction<number>>
    downloadSelect: boolean,
    setDownloadSelect: Dispatch<SetStateAction<boolean>>,
    downloadCanvasWidth: number,
    setDownloadCanvasWidth: Dispatch<SetStateAction<number>>,
    downloadCanvasHeight: number,
    setDownloadCanvasHeight: Dispatch<SetStateAction<number>>,
    openCanvasBg: boolean,
    setOpenCanvasBg: Dispatch<SetStateAction<boolean>>,
    downloadCanvasBg: string,
    setDownloadCanvasBg: Dispatch<SetStateAction<string>>
};