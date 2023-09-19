"use client"

import Navbar from '@/components/Navbar';
import DrawCanvas from '@/components/DrawCanvas';
import Footer from '@/components/Footer';
import { useThemeStore, useToolbarStore } from '@/store';
import SaveImage from '@/components/SaveImage';

const Home = () => {
  const { theme } = useThemeStore();
  const { downloadSelect } = useToolbarStore();

  return (
    <div className={`relative w-screen h-screen flex flex-col md:flex-row gap-5 items-center justify-center ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <Navbar />
      <DrawCanvas />
      <Footer />
    </div>
  )
};

export default Home