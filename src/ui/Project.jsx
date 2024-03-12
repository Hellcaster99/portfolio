'use client';
import React from 'react'
import {motion as m} from 'framer-motion';
import styles from '@/styles/Project.module.css';

export default function index({index, title,category, setModal}) {

    return (
        <m.div initial={{opacity:0,y:"40%"}} whileInView={{opacity:1,y:0,transition:{duration:1.5,type:"spring",delay:0.1}}} onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className={styles.project}>
            <h2>{title}</h2>
            <p>{category}</p>
        </m.div>
    )
}