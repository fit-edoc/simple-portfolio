import { motion } from 'motion/react'
import React from 'react'
import { BsCircleFill } from 'react-icons/bs'

const Work = () => {
  return (
    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 mb-6'>
      <span className='relative flex h-2 w-2'>
        <motion.span 
          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <p className='text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wider font-heading uppercase'>
        OPEN TO WORK
      </p>
    </div>
  )
}

export default Work
