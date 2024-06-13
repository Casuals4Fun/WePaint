"use client"

import Navbar from '@/components/Navbar';
import DrawCanvas from '@/components/DrawCanvas';
import { useThemeStore } from '@/store';
import useWindowHeight from '@/utils/useWindowHeight';
import { Toaster } from 'sonner';

const Home = () => {
  const { theme } = useThemeStore();
  const { height, canvasHeight, isReady } = useWindowHeight();

  return (
    <>
      <Toaster
        position='top-center'
        duration={5000}
        richColors
      />
      <div className={`overflow-y-hidden relative w-screen flex flex-col items-center justify-between ${theme === "light" ? "bg-white" : "bg-black"}`}
        style={{
          height: `${height}px`,
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.5s linear'
        }}
      >
        <Navbar />
        <DrawCanvas canvasHeight={canvasHeight} />
      </div>
    </>
  )
};

export default Home