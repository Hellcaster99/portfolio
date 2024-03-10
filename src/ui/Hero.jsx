'use client';
import {useState, useEffect, useRef} from 'react';
import Navbar from "./Navbar";
import {
    motion as m,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
  } from 'framer-motion'; 
import { wrap } from 'framer-motion';
import styles from "@/styles/Home.module.css";

  function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 100,
      stiffness: 700
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    });
  
    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  
    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
  
      /**
       * This is what changes the direction of the scroll once we
       * switch scrolling directions.
       */
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
  
      baseX.set(baseX.get() + moveBy);
    });
  
    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
      <div className={styles.parallax}>
        <m.div className={styles.scroller} style={{ x }}>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
        </m.div>
      </div>
    );
  }

export default function Hero(){
    const {scrollY} = useScroll()
    const y = useTransform(scrollY, [0,1000],["0%","20%"]);
    const sc = useTransform(scrollY, [0,1000],[1,1.1]);

    const [mousePos,setMousPos] = useState({
        x:0,
        y:0
    })

    // const [customVariant,setCustomVariant] = useState("default");

    const mouseVariants = {
        default:{
            x: mousePos.x,
            y: mousePos.y,
        }
    }

    // const [color,setColor] = useState(false);
    const mouseMove = (e) => {
        setMousPos({
            x: e.clientX,
            y: e.clientY,
        })
    }
    useEffect(()=>{
        
        // if(mousePos.x >= 180 && mousePos.x <= 550 && mousePos.y >= 180 && mousePos.y <= 900){
        //     // setColor(true);
        //     // setCustomVariant("image")
        // }else{
        //     // setCustomVariant("default")
        //     // setColor(false);
        // }
        window.addEventListener("mousemove",mouseMove)
        return () => {
            window.removeEventListener("mousemove",mouseMove)
        }
    })

    return(
        <div className={styles.container}>
            <Navbar/>
            <m.img src="/images/me.png"
                className={styles.me}
                style={{y,scale:sc}}
                variants={{
                    initial:{opacity:0},
                    enter:{opacity:1,transition:{duration:0.75,ease: "linear"}}
                }}
                initial="initial"
                animate="enter"
            />
            <m.div
                className={styles.cursor}
                variants={mouseVariants}
                animate="default"
            >
            </m.div>
            <div className={styles.box}>
                <m.div className={styles.intro}
                    variants={{
                        initial:{
                            opacity: 0,
                            y: "10%"
                        },
                        enter:{
                            opacity:1,
                            y:0,
                            transition:{duration:1,type:"spring"}
                        }
                    }}
                    initial = "initial"
                    animate="enter"
                >
                    <h3 className={styles.greet}>Hello !</h3>
                    <h1 className={styles.heading}>I am a Computer Science Student.</h1>
                    <p className={styles.para}>I am looking for freelance projects or Internships</p>
                </m.div>
            </div>
            {/* <Marquee/> */}
            <div className={styles.parallaxbox}>
            <ParallaxText baseVelocity={5}>Software Engineer</ParallaxText>
            <ParallaxText baseVelocity={-5}>Data Scientist</ParallaxText>
            </div>
        </div>
    )
}

