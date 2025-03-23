import React, { useEffect, useState } from 'react'
import Goku from './assets/Goku.webp'
import Vegeta from './assets/Vegeta.webp'
const App = () => {
  const [p1Health,setP1Health]=useState(100);
  const [p2Health,setP2Health]=useState(100);
  const punchP1 = ()=>{

      
        setP1Health((prev)=>

          prev>0 && p2Health>0?Math.max(prev-10,0):prev
        );
      
     
  }
  const healP1 =()=>{
    setP1Health((prev)=>prev>0?Math.min(prev+5,100):prev);
  }
  const kickP1 = ()=>{
    setP1Health((prev)=>prev>0 && p2Health>0?Math.max(prev-20,0):prev);
  }
  const punchP2 =()=>{
    setP2Health((prev)=>prev>0 && p1Health>0?Math.max(prev-10,0):prev);
  }
  const healP2 = ()=>{
    setP2Health((prev)=>prev>0?Math.min(prev+5,100):prev);
  }
  const kickP2 = ()=>{
    setP2Health((prev)=>prev>0 && p1Health>0?Math.max(prev-20,0):prev);
  }
  useEffect(()=>{
      const handleKeyDown=(e)=>{

        if(e.key==='q') punchP2();  // P1 Punches P2
        if(e.key==='p') punchP1();  // P2 Punches P1
        if(e.key==='s') kickP2();   // P1 Kicks P2
        if(e.key==='k') kickP1();   // P2 Kicks P1
        if(e.key==='a') healP1();   // p1 heals
        if(e.key==='l') healP2();   // p2 heals
        
      }
      window.addEventListener('keydown',handleKeyDown);
      return ()=>{          // Cleanup Function
        window.removeEventListener('keydown',handleKeyDown);
      };
  },[p1Health,p2Health]);  // dependencies to ensure the latest state is used
  return (
    <div
    className='text-white flex flex-col items-center justify-center min-h-screen bg-gradient-to-bl from-zinc-700 to-zinc-900 space-y-5'>
      <h1 className='text-2xl mt-5'>Fighting Game🥷</h1>
      {(p1Health<=0 || p2Health<=0) && (
            <button 
           onClick={
            ()=>{
              setP1Health(100);
              setP2Health(100);
            }
           } 
            className='bg-pink-600 rounded-lg  text-center p-2 hover:bg-pink-700 cursor-pointer'>New Game</button>
           )}
      <div className='flex flex-col items-center md:flex-row md:space-x-45 space-y-5'>
      <div className='flex flex-col space-y-3 items-center'>
            <h1 className='md:text-xl'>Player 1</h1>
            <img src={Goku} alt="Goku Image" className='w-50 h-50 rounded-lg animate-pulse' />
            <p className='bg-blue-600 p-2 rounded-md text-center'>Q: Punch</p>
            <p className='bg-red-700 p-2 rounded-b-md text-center'>S: Kick</p>
            <p className='bg-green-600 p-2 rounded-lg text-center'>A: Heal</p>
            <p className={`${p1Health<=10 && 'bg-red-700 p-2 rounded-e-md' ||
               p1Health<=40 && 'bg-yellow-600 p-2 rounded-e-md' ||
                p1Health>40 && 'bg-green-600 p-2 rounded-e-md'}`}>{`Health: ${p1Health}`}</p>
        </div>
        <div className='flex flex-col space-y-3 items-center'>
            <h1 className='md:text-xl'>Player 2</h1>
            <img src={Vegeta} alt="Vegeta Image" className='w-50 h-50  rounded-lg animate-pulse' />
            <p className='bg-yellow-600 p-2 rounded-md text-center'>P: Punch</p>
            <p className='bg-pink-600 p-2 rounded-b-md'>K: Kick</p>
            <p className='bg-violet-600 p-2 rounded-lg text-center'>L: Heal</p>
             <p className={`${p2Health<=10 && 'bg-red-700 p-2 rounded-e-md' ||
               p2Health<=40 && 'bg-yellow-600 p-2 rounded-e-md' || 
               p2Health>40 && 'bg-green-600 p-2 rounded-e-md'}`}>{`Health: ${p2Health}`}</p>
        </div>
      </div>
        <p className='mb-5 md:text-xl text-center'>
          {(p1Health<=0 && "Player 2 Wins!! Congratulations🎉🎊") ||
           (p2Health<=0 && "Player 1 Wins!! Congratulations🎉🎊")}</p>
           <p className='text-3xl text-red-500 mb-5'>{(p1Health<=0 || p2Health<=0) && "K.O. Play Again !!"}</p>
       
    </div>
  )
}

export default App
