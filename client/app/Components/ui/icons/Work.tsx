import { motion } from 'motion/react'
import React from 'react'
import { BsCircleFill } from 'react-icons/bs'

const Work = () => {
  return (
    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-700 dark:bg-white border border-black  mb-6 border-b-4 dark:border-none'>
      <span className='relative flex h-2 w-2'>
        <motion.span 
          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black  opacity-75"
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white " />
      </span>
      <p className='text-white  dark:text-black text-xs font-semibold tracking-wider font-heading uppercase'>
        OPEN TO WORK 
      </p>
    </div>
  )
}

export default Work
