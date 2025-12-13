import { Circle, CircleAlertIcon, Coffee } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'
import { BsCircleFill } from 'react-icons/bs'

const Work = () => {
  return (
    <div className='h-[25px] max-w-[130px] py-2.5   gap-2 flex justify-center items-center rounded-full bg-green-200 shadow-[0px_0px_1px_black] dark:bg-green-950'>
      <p className='text-green-950 dark:text-green-400 text-[12px]'>OPEN TO WORK</p>
    <motion.p animate={{opacity:[0,1,0]}} whileHover={{x:[-4,0,4]}} transition={{duration:2,repeat:Infinity,repeatType:"mirror"}}>  <BsCircleFill className=' text-[8px] text-green-600 dark:text-green-200'/></motion.p>
      
    </div>
  )
}

export default Work
