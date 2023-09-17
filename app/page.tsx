import { FC } from 'react'

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <canvas
        className='w-[95%] md:w-[750px] h-[750px] border border-black rounded-md'
      />
    </div>
  )
}

export default page