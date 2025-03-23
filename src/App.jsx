import React, { useEffect, useState } from 'react'
import Goku from './assets/Goku.webp'
import Vegeta from './assets/Vegeta.webp'
import useSound from 'use-sound';
import punchSound from './assets/punch.wav'
import kickSound from './assets/kick.wav'
import healSound from './assets/heal.wav'
import victorySound from './assets/victory.mp3'
const App = () => {
  const [p1Health,setP1Health]=useState(100);
  const [p2Health,setP2Health]=useState(100);
  const [winner,setWinner]=useState(null);   // Track Winner

  // Sounds
  const [playPunch] = useSound(punchSound);
  const [playKick] = useSound(kickSound);
  const [playHeal] = useSound(healSound);
  const [playVictory] = useSound(victorySound);

  // punch,kick and heal functions
  const punchP1 = ()=>{
        if(p1Health>0 && p2Health>0){
            playPunch();
        setP1Health((prev)=>

          Math.max(prev-10,0)
        );
      }
  };

  const healP1 =()=>{
    if(p1Health<100 && p1Health>0){
          playHeal();
    setP1Health((prev)=>Math.min(prev+5,100));
    }
  };

  const kickP1 = ()=>{
    if(p1Health>0 && p2Health>0){
          playKick();
    setP1Health((prev)=>Math.max(prev-20,0));
    }
  };

  const punchP2 =()=>{
    if(p1Health>0 && p2Health>0){
        playPunch();
    setP2Health((prev)=>Math.max(prev-10,0));
    }
  };

  const healP2 = ()=>{
    if(p2Health<100 && p2Health>0){
        playHeal();
    setP2Health((prev)=>Math.min(prev+5,100));
    }
  };

  const kickP2 = ()=>{
    if(p2Health>0 && p1Health>0){
        playKick();
    setP2Health((prev)=>Math.max(prev-20,0));
    }
  };

  // Handle Keyboard Controls
  useEffect(()=>{
    
      const handleKeyDown=(e)=>{
        if (winner) return; // Stop inputs if game is over
        switch(e.key){
        case 'q': punchP2(); break;  // P1 Punches P2
        case 'p': punchP1(); break;  // P2 Punches P1
        case 's': kickP2();  break;   // P1 Kicks P2
        case 'k': kickP1();  break;   // P2 Kicks P1
        case 'a': healP1();  break;   // p1 heals
        case 'l': healP2();  break;    // p2 heals
        default : break;  
        }
      };
      window.addEventListener('keydown',handleKeyDown);
      return ()=>window.removeEventListener('keydown',handleKeyDown);   // Cleanup Function
  },[p1Health,p2Health,winner]);  // dependencies to ensure the latest state is used

  // Check for Winner
  useEffect(()=>{
    if (p1Health <=0){
      setWinner("Player 2 Wins!! Congratulations🎉🎊");
      playVictory();
    }
    else if(p2Health<=0){
      setWinner("Player 1 Wins!! Congratulations🎉🎊");
      playVictory();
    }
  },[p1Health,p2Health,playVictory]);

  return (
    <div
    className='text-white flex flex-col items-center justify-center min-h-screen bg-gradient-to-bl from-zinc-700 to-zinc-900 space-y-5'>
      <h1 className='text-2xl mt-5'>Fighting Game🥷</h1>
      {winner && (
            <button 
           onClick={
            ()=>{
              setP1Health(100);
              setP2Health(100);
              setWinner(null);
            }
           } 
            className='bg-pink-600 rounded-lg  text-center p-2 hover:bg-pink-700 cursor-pointer'>New Game</button>
           )}
      <div className='flex flex-col items-center md:flex-row md:space-x-45 space-y-5'>
        {/* Player 1 */}
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
        {/* Player 2 */}
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

      {/* Display Winner */}
        <p className='mb-5 md:text-xl text-center'>{winner}</p>
           <p className='text-3xl text-red-500 mb-5'>{(winner) && "K.O. Play Again !!"}</p>
           {(p1Health<=0 || p2Health<=0) && playVictory()}
       
    </div>
  )
}

export default App
