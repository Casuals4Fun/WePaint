"use client"

import ThemeSelector from '@/components/ThemeSelector';
import DrawCanvas from '@/components/DrawCanvas';
import { useThemeStore } from '@/store';

const page = () => {
  const { theme } = useThemeStore();

  return (
    <div className={`relative w-screen h-screen flex flex-col md:flex-row gap-5 items-center justify-center ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <ThemeSelector />
      <DrawCanvas />
    </div>
  )
};

export default page