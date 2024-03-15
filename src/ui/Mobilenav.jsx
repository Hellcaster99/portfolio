'use client';

import { useState,useEffect,useRef } from "react";
import gsap from "gsap";
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
      href: "exp",
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

    const aboutRef = useRef(null);

    useEffect(()=>{
        const mouseMove = (e) => {
            const {clientX, clientY} = e;
            const {width,height,left,top} = aboutRef.current.getBoundingClientRect();
            const x = clientX - (left + width/2);
            const y = clientY - (top + height/2);
            gsap.to(aboutRef.current,{x:x,duration:0.3,ease:"power3"});
            gsap.to(aboutRef.current,{y:y,duration:0.3,ease:"power3"});
        }

        const mouseLeave = (e) => {
            gsap.to(aboutRef.current, {x:0,duration:0.3,ease:"power3"});
            gsap.to(aboutRef.current, {y:0,duration:0.3,ease:"power3"});
        }


        aboutRef.current.addEventListener("mousemove",mouseMove);
        aboutRef.current.addEventListener("mouseleave",mouseLeave);

        return () => {
            aboutRef.current.removeEventListener("mousemove",mouseMove);
            aboutRef.current.removeEventListener("mouseleave",mouseLeave);
        }
    },[])

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
                ref={aboutRef}
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