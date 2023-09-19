type Draw = {
    ctx: CanvasRenderingContext2D
    currPoint: Point
    prevPoint: Point | null
};

type Point = { x: number, y: number };

type ThemeState = {
    theme: string,
    setTheme: (theme: string) => void
}

type ToolbarState = {
    colorPicker: boolean, 
    setColorPicker: Dispatch<SetStateAction<boolean>>,
    color: string,
    setColor: Dispatch<SetStateAction<string>>, 
    brushEdit: boolean, 
    setBrushEdit: Dispatch<SetStateAction<boolean>>, 
    brushThickness: number, 
    setBrushThickness: Dispatch<SetStateAction<number>>
}