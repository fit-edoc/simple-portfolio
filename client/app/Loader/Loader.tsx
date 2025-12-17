
"use client"
import React from 'react'
import {motion} from "motion/react"
const Loader = () => {
  return (
    <motion.div className='absolute  z-50'  animate={{display:"hidden"}}>
        <motion.div className="" initial={{height:"100vh",width:"100vw",backdropFilter:"blur(10px)"}}  animate={{height:"0vh",display:"hidden",backdropFilter:"blur(0px)"}} transition={{duration:2}}>
           
        </motion.div>
      
    </motion.div>
  )
}

export default Loader
