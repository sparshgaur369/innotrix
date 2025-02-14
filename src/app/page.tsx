'use client'; // Ensures that this component is a Client Component

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

export default function Home() {
  const router = useRouter();

  const handle = () => {
    router.push('/create');
  };

  return (
    <>
    <div className="p-4 flex items-center justify-between relative bg-gray-950 ">
            <aside className="flex items-center gap-2 ">
            <span className="text-xl font-bold text-white">Innotrix</span>
            </aside>
            <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[50%]">
                <ul className="flex items-center justify-center gap-8">
    
    
                </ul>
            </nav>
            <aside className="flex gap-2 items-center">
            <Button className=" z-20 bg-blue-800" onClick={handle}>
              Create Project
            </Button>
                
            </aside>
            
            
            
        </div>
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col bg-gray-950">
        <div className="  absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] "/>
        
        <h1 className="text-center text-white mt-16">An AI powered GITHUB Collaborator</h1>
        
        <div className="bg-gradient-to-r from-blue-700 to-gray-200 bg-clip-text text-transparent relative">
  <h1 className="text-9xl font-bold text-center md:text-[180px] ">INNOTRIX</h1>
</div>

        
        <div className='flex justify-center items-center relative md:mt-[-40px] z-100'> 
          <Image
            src={'/preview.png'}
            alt='banner-img'
            height={1000}
            width={1000}
            className='rounded-tl-2xl rounded-tr-2xl border-2 border-muted z-100'
          />
          <div className='bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10 '></div>
        </div>

        {/* Button with click handler to navigate */}
        <Button className="mt-10 mb-10 z-20 bg-blue-800" onClick={handle}>
          Create Project
        </Button>
      </section>
    </>
  );
}








