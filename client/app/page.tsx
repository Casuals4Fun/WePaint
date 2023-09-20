"use client"

import Navbar from '@/components/Navbar';
import DrawCanvas from '@/components/DrawCanvas';
import Footer from '@/components/Footer';
import { useThemeStore } from '@/store';

const Home = () => {
  const { theme } = useThemeStore();

  return (
    <div className={`relative w-screen min-h-screen flex flex-col items-center justify-between ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <Navbar />
      <DrawCanvas />
      <Footer />
    </div>
  )
};

export default Home