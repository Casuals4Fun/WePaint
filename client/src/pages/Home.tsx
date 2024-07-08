import { useEffect } from 'react'
import DrawCanvas from '../components/DrawCanvas'
import useWindowSize from '../utils/useWindowSize'
import { useInviteStore, useSocketStore } from '../store'

const Home = () => {
  const { width, canvasHeight } = useWindowSize();
  const { setRoomID } = useSocketStore();
  const { setPreference } = useInviteStore();

  useEffect(() => {
    setRoomID("");
    setPreference("");
  }, []);

  return <DrawCanvas width={width} canvasHeight={canvasHeight} />
}

export default Home