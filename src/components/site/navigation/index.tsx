'use client'
import { ModeToggle } from '@/components/global/mode-toggle'
import React from "react";
import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

//import { UserButton } from "@clerk/nextjs";

/*type Props = {
    user?:null|User
} */

const Navigation = () => {
    const router = useRouter();
    
      const handle = () => {
        router.push('/create');
      };
    return <div className="p-4 flex items-center justify-between relative ">
        <aside className="flex items-center gap-2 ">
        {/* <Image src={'/assets/quantum-dts-logo.png'} width={40} height={40} alt="quantumDTS logo"/> */}
        <span className="text-xl font-bold">Innotrix</span>
        </aside>
        <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[50%]">
            <ul className="flex items-center justify-center gap-8">


            </ul>
        </nav>
        <aside className="flex gap-2 items-center">
        <Button className=" z-20" onClick={handle}>
          Create Project
        </Button>
            <ModeToggle/>
        </aside>
        
        
        
    </div>
}

export default Navigation
