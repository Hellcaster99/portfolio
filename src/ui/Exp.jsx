'use client';
import styles from '@/styles/Exp.module.css'
import {motion as m} from 'framer-motion'
import { useState } from 'react';
import Project from './Project';
import Modal from './Modal';


const projects = [
  {
    title: "SSIP Hackathon",
    src: "plant.jpg",
    color: "#1E1C1C",
    category: "Predictive Analysis"
  },
  {
    title: "Step In global",
    src: "client.jpg",
    color: "#ababab",
    category: "Software & Back-end"
  },
  {
    title: "Next.js",
    src: "dashboard.jpg",
    color: "#1E1C1C",
    category: "Admin Dashboard"
  },
  {
    title: "Hi-Power",
    src: "hipower.jpg",
    color: "#ababab",
    category: "E-commerce website"
  }
]

export default function Exp() {

  const [modal, setModal] = useState({active: false, index: 0})

  return (
    <>
    <div id="exp" className={styles.container}>
        <m.h1 className={styles.h1} initial={{opacity:0,y:"40%"}} whileInView={{opacity:1,y:0,transition:{duration:1.5,type:"spring",delay:0.1}}}>Recent Work and Projects</m.h1>
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
