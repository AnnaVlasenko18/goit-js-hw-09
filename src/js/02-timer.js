import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
    content: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    outDays: document.querySelector('[data-days]'),
    outHours: document.querySelector('[data-hours]'),
    outMinutes: document.querySelector('[data-minutes]'),
    outSeconds: document.querySelector('[data-seconds]'),
};

document.body.style.backgroundColor = '#7004';

refs.startBtn.desabled = true;

const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
    onCloseDate(selectedDates);
  },
};

function onCloseDate(selectedDates) {
   const selectDate = selectedDates[0];
   const currentDate = options.defaultDate;
  if (selectDate <= currentDate) {
    Report.failure("Please choose a date in the future");
    return;
  }
  
refs.startBtn.desabled = false;

refs.startBtn.addEventListener('click', () => {
    refs.startBtn.disabled = true;
    refs.content.disabled = true;
    timerOn(selectDate);
  })
};

flatpickr(refs.content, options);

function timerOn(selectDate) {
  const timerID = setInterval(() => {
    let currentDate = new Date();
    let resData = selectDate - currentDate;
    if (resData <= 0) {
      clearInterval(timerID);
      refs.content.disabled = false;
      Report.success('Congratulation! Timer stopped!',
        'Please, if you want to start timer, choose a date and click on start or reload this page',
        'Okay');
      return;
    };
    updateTimer(convertMs(resData));
  }, 1000);
};

function convertMs(ms) {
   const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

    const days = Math.floor(ms / day);
 
  const hours = Math.floor((ms % day) / hour);
 
  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(convertData) {
    const { days, hours, minutes, seconds } = convertData;
    refs.outDays.textContent = addLeadingZero(days);
    refs.outHours.textContent = addLeadingZero(hours);
    refs.outMinutes.textContent = addLeadingZero(minutes);
    refs.outSeconds.textContent = addLeadingZero(seconds);
    
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
};
