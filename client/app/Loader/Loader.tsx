
"use client"
import React from 'react'
import {motion} from "motion/react"
const Loader = () => {
  return (
    <motion.div className='absolute  z-50'  animate={{display:"hidden"}}>
        <motion.div className="bg-amber-500 " initial={{height:"100vh",width:"100vw"}}  animate={{height:"0vh",display:"hidden"}} transition={{duration:5}}>
           
        </motion.div>
      
    </motion.div>
  )
}

export default Loader
