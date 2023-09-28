"use client"

import Navbar from '@/components/Navbar';
import DrawCanvas from '@/components/DrawCanvas';
import Footer from '@/components/Footer';
import { useThemeStore } from '@/store';
import useWindowHeight from '@/utils/useWindowHeight';

const Home = () => {
  const { theme } = useThemeStore();
  const { height, isReady } = useWindowHeight();

  return (
    <div className={`relative w-screen flex flex-col items-center justify-between ${theme === "light" ? "bg-white" : "bg-black"}`}
      style={{
        minHeight: `${height}px`,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.5s linear'
      }}
    >
      <Navbar />
      <DrawCanvas />
      <Footer />
    </div>
  )
};

export default Home