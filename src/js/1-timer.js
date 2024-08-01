// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input#datetime-picker');
const button = document.querySelector('button');
const daysText = document.querySelector('[data-days]');
const hoursText = document.querySelector('[data-hours]');
const minutesText = document.querySelector('[data-minutes]');
const secondsText = document.querySelector('[data-seconds]');
button.disabled = true;

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  },
};

flatpickr(input, options);

button.addEventListener('click', () => {
  button.disabled = true;
  input.disabled = true;
  intervalId = setInterval(timeCountdown, 1000);
});

function timeCountdown() {
  const currentDate = new Date();
  const dateDifference = userSelectedDate - currentDate;

  if (dateDifference <= 0) {
    clearInterval(intervalId);
    input.disabled = false;
    button.disabled = true;
    updateTextContents({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }

  const timeComponents = convertMs(dateDifference);
  updateTextContents(timeComponents);
}

function updateTextContents({ days, hours, minutes, seconds }) {
  daysText.textContent = addLeadingZero(days);
  hoursText.textContent = addLeadingZero(hours);
  minutesText.textContent = addLeadingZero(minutes);
  secondsText.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
