import Lenis from "@studio-freight/lenis";

export const hero = () => {
    const lenis = new Lenis({
        easing: (x) => Math.sin((x * Math.PI) / 2),
        duration: 0.7,
    });
    lenis.scrollTo('#',{duration:1})
}