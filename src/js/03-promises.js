import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.body.style.backgroundColor = '#7005';

const form = document.querySelector('form.form');

form.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay })
    } else {
      reject({ position, delay })
    }
  }, delay);
}

function onPromiseCreate(evt) {
   evt.preventDefault();
   const { delay, step, amount } = evt.currentTarget.elements;
   let inputDelay = Number(delay.value);
   let inputStep = Number(step.value);
   let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
     inputDelay += inputStep;

     createPromise(i, inputDelay)
      .then(({ position, delay }) => {
         Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    evt.currentTarget.reset();
  }
}; 
