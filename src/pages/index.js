import Head from "next/head";
import Image from "next/image";
import { Outfit } from "next/font/google";

import Hero from "@/ui/Hero";
import About from "@/ui/About";
import Exp from "@/ui/Exp";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={outfit.className}>
        <Hero/>
        <About/>
        <Exp/>
      </main>
    </>
  );
}
