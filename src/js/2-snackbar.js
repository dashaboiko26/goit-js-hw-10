import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delayValue = parseInt(event.target.delay.value);
  const stateValue = event.target.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  promise
    .then(delayValue => {
      iziToast.success({
        title: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
      });
    })
    .catch(delayValue => {
      iziToast.error({
        title: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
      });
    });
}
