'use client';
import styles from '@/styles/Exp.module.css'
import {motion as m} from 'framer-motion'
import { useState } from 'react';
import Project from './Project';
import Modal from './Modal';


const projects = [
  {
    title: "Hi-Power",
    src: "hipower.jpg",
    color: "#cdcdcd",
    category: "E-commerce website"
  },
  {
    title: "Step-In global",
    src: "client.jpg",
    color: "#cdcdcd",
    category: "Software & Back-end"
  },
  {
    title: "SSIP",
    src: "plant.jpg",
    color: "#111",
    category: "Predictive Analysis"
  },
  {
    title: "Next.js",
    src: "dashboard.jpg",
    color: "#111",
    category: "Admin Dashboard"
  },
  
]

export default function Exp() {

  const [modal, setModal] = useState({active: false, index: 0})

  return (
    <>
    <div id="exp" className={styles.container}>
        <div className={styles.h1box} initial={{opacity:0,y:"40%"}} whileInView={{opacity:1,y:0,transition:{duration:1.5,type:"spring",delay:0.1}}}>
        <m.p className={styles.h1} >Recent Work and Projects</m.p>
        </div>
        <h2 className={styles.click}>Click on each for effect</h2>
        <div className={styles.ds}>
            <div className={styles.row}>
            {
                projects.map( (project, index) => {
                return <Project index={index} title={project.title} category={project.category} setModal={setModal} key={index}/>
                })
            }
            </div>
            <Modal modal={modal} projects={projects}/>
        </div>
    </div>
    </>
  )
}
