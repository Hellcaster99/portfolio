import {motion as m, useMotionValueEvent, useScroll, useTransform} from 'framer-motion';
import { useRef } from 'react';
import styles from '@/styles/Exp2.module.css';

export default function Exp(){
    const {scrollY} = useScroll()

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress,[0,1], [1000,1000]);

    return(
        <div className={styles.container}>
            {[1,2,3,4].map((item)=>{
                return(
                    <div className={styles.projectBox} ref={ref} key={item} id={item} style={{y}}>
                        {item}
                    </div>
                )
            })}
        </div>
    )
}