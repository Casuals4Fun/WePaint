import { useEffect, useState } from 'react';

const useWindowSize = () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [canvasHeight, setCanvasHeight] = useState<number>(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setCanvasHeight(window.innerHeight-104);
            setIsReady(true);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { width, height, canvasHeight, isReady };
};

export default useWindowSize;