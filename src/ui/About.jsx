import { useRef } from 'react';
import {motion as m, useScroll, useTransform,AnimatePresence} from 'framer-motion';
import styles from '@/styles/About.module.css';
import { DM_Serif_Display, Marcellus } from 'next/font/google';

const font = Marcellus({subsets:['latin'],weight:['400']});

export default function About(){
    return(
        <div className={styles.aboutContainer} id="about">
            <div className={styles.box}>
                <AnimatePresence mode='wait'>
                <m.h1 className={styles.heading} initial={{opacity:0,y:"40%"}} whileInView={{opacity:1,y:0,transition:{duration:1.5,type:"spring",delay:2}}}>About me</m.h1>
                </AnimatePresence>
                <Paragraph>I am 20 and I currently stay in Gandhinagar. Proficient in Python, Java, and C++. I participated in various hackathons like SSIP, Dotslash and SIH.</Paragraph>
            </div>
        </div>
    )

}

function Paragraph({children}){
    const element = useRef(null);
    const {scrollYProgress} = useScroll({
        target: element,
        offset: ['start 0.9','start 0.25']
    })
    const words = children.split(" ");
    return(
        <m.p
            className={`${styles.para} ${font.className}`}
            ref={element}
            initial={{opacity:0,y:"40%"}} whileInView={{opacity:1,y:0,transition:{duration:1.5,type:"spring",delay:2}}}
        >
            {words.map((word,i)=>{
                const start = i/words.length;
                const end = start + (1/words.length);
                return <Word key={i} range={[start,end]} progress={scrollYProgress}>{word}</Word>
            })}
        </m.p>
    )
}

function Word({children,range,progress}){

    const characters = children.split("");
    const amount = range[1] - range[0];
    const step = amount/children.length;
    return (
        <span className={styles.word}>
            {characters.map((character,i)=>{
                const start = range[0] + (step*i);
                const end = range[0] + (step*(i+1));
                return(
                    <Character key={i} range={[start,end]} progress={progress}>{character}</Character>
                )
            })}
        </span>
    )
}

function Character({children,range,progress}){
    const opacity = useTransform(progress,range,[0,1]);
    return(
        <span>
            <span className={styles.shadow}>{children}</span>
            <m.span
            className={styles.character}
            style={{opacity}}
            
            >
                {children}
            </m.span>
        </span>
    )
}