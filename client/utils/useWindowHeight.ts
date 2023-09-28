import { useEffect, useState } from 'react';

const useWindowHeight = () => {
    const [height, setHeight] = useState<Number>(0);
    const [canvasHeight, setCanvasHeight] = useState<Number>(0);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight);
            setCanvasHeight(window.innerHeight-100);
            setIsReady(true);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { height, canvasHeight, isReady };
};

export default useWindowHeight;