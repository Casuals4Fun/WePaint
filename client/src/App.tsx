import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toast from './components/Toast'
import { useThemeStore } from './store'
import useWindowSize from './utils/useWindowSize'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Room from './pages/Room'
import Footer from './components/Footer'

function App() {
  const { theme } = useThemeStore();
  const { height, isReady } = useWindowSize();

  return (
    <>
      <BrowserRouter>
        <div className={`overflow-y-hidden relative w-screen flex flex-col items-center justify-between ${theme === "light" ? "bg-white" : "bg-black"}`}
          style={{
            height: `${height}px`,
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.5s linear'
          }}
        >
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path=':roomID' element={<Room />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
      <Toast />
    </>
  )
}

export default App