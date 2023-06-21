import React, { useRef, useEffect, useState, lazy } from 'react'
import { motion } from 'framer-motion'

// import styles from '../styles/styles.module.css'

import './stylescarousel.css'

import images from '../../imagesmock'

export function SlideShow() {
  const [width, setWidth] = useState(0)
  const carousel = useRef()

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [])

  return (
    <motion.div ref={carousel} className='carousel' whileTap={{ cursor: 'grabbing' }}>
      <motion.div drag='x' dragConstraints={{ right: 0, left: -width }} className='carousel-inner'>
        {images.map((image) => {
          return (
            <motion.div className='carousel-item' key={image}>
              <img src={image} loading={lazy} alt='' />
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default SlideShow
