"use client"

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DrawCanvas from '@/components/DrawCanvas';
import Footer from '@/components/Footer';
import { useThemeStore, useVistitorStore } from '@/store';
import useWindowHeight from '@/utils/useWindowHeight';
import { Toaster } from 'sonner';

const Home = () => {
  const { fetchVisitors } = useVistitorStore();
  const { theme } = useThemeStore();
  const { height, canvasHeight, isReady } = useWindowHeight();

  useEffect(() => {
    fetchVisitors()
  }, [fetchVisitors]);

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
        <Footer />
      </div>
    </>
  )
};

export default Home