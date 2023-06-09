import React, { useState, useEffect } from 'react';
import './App.css';
// https://3d-countdown.netlify.app/
function App() {

   // * To flip all card
   const flipAllCards = (time) => {
      // * Breaking the time into sec, min, hours
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor(time / 60) % 60;
      const hours = Math.floor(time / 3600);

      flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
      flip(document.querySelector("[data-hours-ones]"), hours % 10)
      flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
      flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
      flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
      flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
   }

   // * call to flip single card 
   const flip = (flipCard, newNumber) => {
      const top = flipCard.querySelector('.top')
      const bottom = flipCard.querySelector('.bottom')
      const startNumber = flipCard.querySelector('.top').textContent;

      // ! it will check if your past value is same as newvalue it will return;
      if (newNumber == startNumber) return;

      top.textContent = startNumber;
      bottom.textContent = startNumber;
      flipCard.dataset.currentNumber = newNumber;
      flipCard.dataset.nextNumber = newNumber;

      flipCard.addEventListener('animationstart', () => {
         top.textContent = newNumber;
      })

      flipCard.addEventListener('animationend', () => {
         bottom.textContent = newNumber;
         flipCard.classList.remove('flip');
      })

      flipCard.classList.add('flip')
   }

   useEffect(() => {
      const endTime = new Date();
      endTime.setHours(16, 0, 0, 0); // 设置结束时间为今天下午4点
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const totalCountDownTime = Math.ceil((endTime - currentTime) / 1000);
        if (totalCountDownTime <= 0) clearInterval(interval);
        flipAllCards(totalCountDownTime);
      }, 250);
    
      // * Cleanup function
      return () => {
        clearInterval(interval);
      };
    }, []);
    

   return (
      <div>
         <div>
            <h1 className='main-heading'>家长会什么时候来啊</h1>
         </div>
         <div className="countdown-container">
            <div className="countdown-cards">
               <div className='card-title'>时</div>
               <div className='card-container' >
                  <div className="flip-card" data-hours-tens>
                     <div className="top">2</div>
                     <div className="bottom">2</div>
                  </div>
                  <div className="flip-card" data-hours-ones>
                     <div className="top">4</div>
                     <div className="bottom">4</div>
                  </div>
               </div>
            </div>
            <div className="countdown-cards">
               <div className='card-title'>分</div>
               <div className='card-container'>
                  <div className="flip-card" data-minutes-tens>
                     <div className="top">0</div>
                     <div className="bottom">0</div>
                  </div>
                  <div className="flip-card" data-minutes-ones>
                     <div className="top">0</div>
                     <div className="bottom">0</div>
                  </div>
               </div>
            </div>
            <div className="countdown-cards">
               <div className='card-title'>秒</div>
               <div className='card-container'>
                  <div className="flip-card" data-seconds-tens>
                     <div className="top">0</div>
                     <div className="bottom">0</div>
                  </div>
                  <div className="flip-card" data-seconds-ones>
                     <div className="top">0</div>
                     <div className="bottom">0</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default App
