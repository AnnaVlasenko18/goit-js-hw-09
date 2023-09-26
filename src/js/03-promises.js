import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

document.body.style.backgroundColor = '#7005';

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
};

function onSubmit(evt) {
  evt.preventDefault();
  let userDelay = Number(evt.currentTarget.delay.value);
  let userStep = Number(evt.currentTarget.step.value);
  let userAmount = Number(evt.currentTarget.amount.value);
  if (userDelay < 0 || userStep < 0 || userAmount <= 0) {
    Notify.warning('incorrect values!!!', {timeout:6000});
    evt.currentTarget.reset();
    return;
  }

  for (let i = 1; i <= userAmount; i += 1) {
    createPromise(i, userDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,{timeout:userDelay});
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,{timeout:userDelay});
      });
    userDelay += userStep;
  };
  evt.currentTarget.reset();
};
  