'use client';
import styles from '@/styles/Work.module.css'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'

import { useEffect, useRef, useState } from 'react';
import { useTransform, useScroll, motion as m } from 'framer-motion';

const images = [
  {src:"client.jpg",class:"client",desc:"User verification, forgot password and reset password through email, JSON API data flow structure management."},
  {src:"dashboard.jpg",class:"dashboard",desc:"Responsive dashboard for secure actions and CRUD operations."},
  {src:"hipower.jpg",class:"hipower",desc:"An e-commerce website leveraging cart functionalities, individual product pages and product features."},
  {src:"bank.jpg",class:"bank",desc:"Local bank system for managing user account using OOPs principle"},
  {src:"todolist.jpg",class:"todolist",desc:"To-do list application for task management"},
  {src:"webapi.jpg",class:"webapi",desc:"Web API handling and pagination."},
  {src:"plant.jpg",class:"plant",desc:"Plant identification system using Deep Learning"},
  {src:"mernauth.jpg",class:"mernauth",desc:"MERN powered user authorization with custom login and signup pages."},
]

export default function Home() {

    const gallery = useRef(null);
    const [dimension, setDimension] = useState({width:0, height:0});
    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ['start end', 'end start']
    })
    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height*1.8])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height*2.7 ])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height*1.5])
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height*3.1])

    useEffect( () => {
        const lenis = new Lenis()

        const raf = (time) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
        }

        const resize = () => {
            setDimension({width: window.innerWidth, height: window.innerHeight})
        }
        window.addEventListener("resize", resize)
        resize();
        requestAnimationFrame(raf)
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [])

  return (
    <>
        <div className={styles.spacer}>
            <m.h1 className={styles.spacertext}>
                Recent Work and Projects
            </m.h1>
        </div>
      <div className={styles.gallery}>
        <div className={styles.galleryWrapper}>
          <Column y={y} images={[images[0], images[1]]}/>
          <Column y={y2} images={[images[2], images[3]]}/>
          <Column y={y3} images={[images[4], images[5]]}/>
          <Column y={y4} images={[images[6], images[7]]}/>
        </div>
      </div>
      <div className={styles.spacer2}/>
      </>
  )
}

const Column = ({images,y}) => {
  return (
    <m.div 
      className={styles.column}
      style={{y}}
      >
      {
        images.map( (item, i) => {
          return <div key={i} className={styles.imageContainer}>
            <div className={styles.imgBox}>
                {/* <img src={`/images/${item.src}`} alt="project" className={styles.img}/> */}
                <Image 
              src={`/images/${item.src}`}
              alt='image'
              fill
              className={styles.img}
              sizes='100%'
            />
            </div>
            <div className={styles.imgDesc}>
                <p className={styles.desc}>{item.desc}</p>
            </div>
            

          </div>
        })
      }
    </m.div>
  )
}