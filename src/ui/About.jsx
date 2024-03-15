import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {motion as m, useScroll, useTransform} from 'framer-motion';
import styles from '@/styles/About.module.css';
import { Outfit } from 'next/font/google';

const font = Outfit({subsets:['latin'],weight:['400']});

export default function About(){
    const {scrollY}  = useScroll();
    const y = useTransform(scrollY, [0,1000], ["180%","0%"]);

    // const [scale,setScale] = useState(1);

    // const ref = useRef(null);
    const para = useRef(null);

    // useEffect(()=>{
    //     const mouseMove = (e) => {
    //         const {clientX,clientY} = e;
    //         gsap.to(ref.current,{x:clientX})
    //         gsap.to(ref.current,{y:clientY})
    //         // gsap.to(ref.current,{scale:2})
    //     }
    //     const mouseEnter = ()=>{
    //         alert("a");
    //     }

    //     // para.current.addEventListener("onmouseenter",mouseEnter)
    //     window.addEventListener("mousemove",mouseMove)

    //     return ()=>{
    //         window.removeEventListener("mousemove",mouseMove)
    //         // para.current.removeEventListener("onmouseenter",mouseEnter)
    //     }
    // },[])
    

    return(
        <div className={styles.aboutContainer} id="about">
            
            <div className={styles.box}>
            {/* <m.div ref={ref} className={styles.cursor}>
            
            </m.div> */}
                <Paragraph element={para}>I am 20 and I currently stay in Gandhinagar. Passionate and organised student currently in the pre-final year. Love to take up challenges and solve problems. I am also studying Business Intelligence from IIT Madras and am interested in data mining and business solutions. Well experienced in creating responsive and interactive web designs and applications.</Paragraph>
                <div className={styles.heading}>
                    <m.p className={styles.aboutp} initial={{opacity:0,y:"40%"}} whileInView={{opacity:1,y:0,transition:{duration:1.5,type:"spring",delay:0.1}}}>The combination of my logic, critical thinking & creativity positions me in a unique place in the computer science world.</m.p>
                    <div className={styles.abouth}>
                    <m.div className={`${styles.aboutme} ${font.className}`}
                    
                    style={{y}}
                    ><p>About Me</p>
                    </m.div>
                    </div>
                    
                </div>
            </div>
        </div>
    )

}

function Paragraph({children,element}){
    const {scrollYProgress} = useScroll({
        target: element,
        offset: ['start 0.9','start 0.25']
    })
    const words = children.split(" ");
    return(
        <m.p
            className={`${styles.para} ${font.className}`}
            ref={element}
            initial={{opacity:0,y:"40%"}} whileInView={{opacity:1,y:0,transition:{duration:1.5,type:"spring",delay:0.1}}}
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