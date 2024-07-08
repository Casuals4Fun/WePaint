import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useInviteStore, useSocketStore } from '../store'
import useWindowSize from '../utils/useWindowSize'
import RoomCanvas from '../components/RoomCanvas'

const Room = () => {
  const { roomID } = useParams();

  const { setRoomID } = useSocketStore();
  const { roomType, setPreference, setInvite } = useInviteStore();
  const { width, canvasHeight } = useWindowSize();

  useEffect(() => {
    setRoomID(roomID);
    setPreference("Share");

    if (roomType === "Create") {
      toast.success("Room created!");
      setInvite(true);
    }
    else if (roomType === "Join") {
      toast.success("Room joined!");
      setInvite(false);
    }
  }, []);

  return <RoomCanvas width={width} height={canvasHeight} />
};

export default Room