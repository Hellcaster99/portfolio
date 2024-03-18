'use client';

import styles from '@/styles/Nav.module.css';
import Link from 'next/link';

import {motion as m, useMotionValueEvent, useScroll} from 'framer-motion';
import { Dancing_Script } from 'next/font/google';
import { useState } from 'react';
import Mobilenav from './Mobilenav';

const dancing_script = Dancing_Script({subsets:['latin'],weight:['700']})

const links = [
    {
        title:'About',
        href:"#about"
    },
    {
        title:'Work',
        href:"#exp"
    },
    {
        title:"Skills",
        href:"#skills"
    },
    {
        title:"Contact",
        href:"#contact"
    }
]

export default function Navbar(){

    const {scrollY} = useScroll()
    const [hidden,setHidden] = useState(false);
    
    
    useMotionValueEvent(scrollY, "change", (latest)=>{
        const previous  = scrollY.getPrevious();
        if(latest > 150){
            setHidden(true);
        }else{
            setHidden(false)
        }
    })

    return(
        <>
        <m.div className={styles.navContainer}
            variants={{
                visible: {y:0,
                    transition:{type:"spring",damping:15,stiffness:500},
                },
                hidden: {y:"-100%",
                    transition:{duration:0.25}
                },
            }}
            animate={hidden ? "hidden":"visible"}
        >
            <div className={styles.navbar}>
                <div className={`${styles.name} ${dancing_script.className}`}>Chinmay Pandya</div>
                
                    <ul className={styles.links}>
                        {links.map((link,index)=>{
                            return(
                                <Link href={link.href} key={index} className={styles.link}>{link.title}</Link>
                            )
                        })}
                    </ul>
                
            </div>
        </m.div>
        <Mobilenav/>
        </>
    )
}