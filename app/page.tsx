"use client"

import { useState } from 'react'
import ThemeSelector from '@/components/ThemeSelector';
import DrawCanvas from '@/components/DrawCanvas';

const Page = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <div className={`relative w-screen h-screen flex flex-col md:flex-row gap-5 items-center justify-center ${theme === "light" ? "bg-white" : "bg-black"}`}>
      <ThemeSelector
        theme={theme}
        setTheme={setTheme}
      />

      <DrawCanvas
        theme={theme}
      />
    </div>
  )
};

export default Page