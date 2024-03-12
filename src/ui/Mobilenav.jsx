'use client';

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion as m, useMotionValueEvent, useScroll } from "framer-motion";
import { menuSlide, slide, scale } from "@/lib/anim";
import Curve from './Curve';
import styles from '@/styles/Mobile.module.css';

const navItems = [
    {
      title: "Home",
      href: "",
    },
    {
        title: "About",
        href: "about"
    },
    {
      title: "Work",
      href: "work",
    },
    {
        title: "Skills",
        href: "skills"
    },
    {
      title: "Contact",
      href: "contact",
    },
  ]

export default function Mobilenav(){
    const {scrollY} = useScroll();
    const [isActive,setIsActive] = useState(false);
    const [mobile,setMobile] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest)=>{
        if(latest > 150){
            setMobile(true);
        }else{
            setIsActive(false);
            setMobile(false);
        }
    });

    return(
        <>
            <AnimatePresence mode="wait">
            <m.div
                onClick={() => {setIsActive(!isActive)}} className={styles.button}
                variants={{
                    hidden:{scale:0},
                    visible:{scale:1,
                        transition:{type:"spring",damping:15,stiffness:300}
                    }
                }}
                animate={mobile ? "visible":"hidden"}
            >
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
            </m.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {isActive &&
                <m.div
                    variants={menuSlide} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit" 
                    className={styles.menu}
                >
                    <div className={styles.body}>
                        <div className={styles.nav}>
                                <div className={styles.header}>
                                    <p>Navigation</p>
                                </div>
                                {navItems.map((data,index)=>{
                                    return(
                                        <m.div 
                                        key={index}
                                        custom={index}  
                                        variants={slide} 
                                        initial="initial" 
                                        animate="enter" 
                                        exit="exit"
                                        >
                                            <m.div 
                                                variants={scale}
                                                animate={isActive ? "open" : "closed"} 
                                                className={styles.indicator}
                                            />
                                            <Link href={`#${data.href}`} className={styles.link} onClick={()=>setIsActive(false)}>{data.title}</Link>
                                        </m.div>
                                    )
                                })}
                    
                        </div>
                        <div className={styles.footer}>
                            <Link href='/' className={styles.link}>Instagram</Link>
                            <Link href='/' className={styles.link}>LinkedIn</Link>
                        </div>
                    </div>
                    <Curve/>
                </m.div>}
            </AnimatePresence>
        </>
    )
}