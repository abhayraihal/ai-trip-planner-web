import { Link } from 'react-router-dom';
import { Button } from '../button'
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';

function Hero() {
  return (
    
    <div className='flex flex-col items-center mx-40 gap-5'>
      <h1 className='font-extrabold text-[50px] text-center mt-5'
      >
        <span className='text-[#292929]'>Ready for an Adventure? </span> <br />
        <span className='text-[#292929] text-[43px]'>Let AI Curate Personalized Itineraries Just for You!</span></h1>
      <p className='text-xl text-gray-500 text-center'>Your Ultimate Travel Sidekick—Crafting Custom Trips Perfectly Tailored to Your Interests and Budget!</p>

      <Link to="/create-trip">
          <Button>Let's Go!</Button>
        </Link>


    {/* //   model here */}
    <Canvas
         camera={{ position: [2, 0, 12.25], fov: 15 }}
         style={{
            // backgroundColor: '#111a21',
            width: '100vw',
            height: '50vh',
         }}
      >
         <ambientLight intensity={1.25} />
         <ambientLight intensity={0.1} />
         <directionalLight intensity={0.4} />
         <Suspense fallback={null}>
            <Model position={[0.025, -0.35, 1]} />
         </Suspense>
         <OrbitControls />
      </Canvas>

    </div>
  )
}

export default Hero