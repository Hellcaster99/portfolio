import styles from '@/styles/Skills.module.css';
import Image from 'next/image';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const languages = [
    {
        src:"/images/python.svg",
        name:"Python"
    },
    {
        src:"/images/cpp.svg",
        name:"C++"
    },
    {
        src:"/images/java.svg",
        name:"Java"
    },
    {
        src:"/images/js.svg",
        name:"JavaScript"
    }
]

const tech = [
    {
        src:"/images/tensorflow.svg",
        name:"Tensorflow"
    },
    {
        src:"/images/spark.svg",
        name:"Spark"
    },
    {
        src:"/images/powerbi.svg",
        name:"Power BI"
    },
    {
        src:"/images/pandas.svg",
        name:"Pandas"
    }
]

export default function Skills() {



    const container = useRef(null);

    const { scrollYProgress } = useScroll({

        target: container,

        offset: ["start end", "end start"]

    })



    const x1 = useTransform(scrollYProgress, [0, 1], [0, 350])

    const x2 = useTransform(scrollYProgress, [0, 1], [0, -350])

    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])



    return (

        <div id='skills' ref={container} className={styles.slidingImages}>
            <div className={styles.header}>
                <span className={styles.span}>
                    skills
                </span>
            </div>

            <motion.div style={{x: x1}} className={styles.slider}>

                    {

                        languages.map( (skill, index) => {

                            return <div className={styles.project} key={index}>

                                <div key={index} className={styles.imageContainer}>

                                    <Image 
                                    className={styles.img}
                                    fill={true}

                                    alt={"image"}

                                    src={skill.src}/>

                                </div>
                                <div className={styles.imgdesc}>
                                    {skill.name}
                                </div>

                            </div>

                        })

                    }

                </motion.div>

                <motion.div style={{x: x2}} className={styles.slider}>

                    {

                        tech.map( (skill, index) => {

                            return <div className={styles.project} key={index} >

                                <div key={index} className={styles.imageContainer}>

                                    <Image 
                                    className={styles.img}
                                    fill={true}

                                    alt={"image"}

                                    src={skill.src}/>

                                </div>
                                <div className={styles.imgdesc}>
                                    {skill.name}
                                </div>
                            </div>

                        })

                    }

                </motion.div>

                <motion.div style={{height}} className={styles.circleContainer}>

                    <div className={styles.circle}></div>

                </motion.div>

        </div>

    )

}