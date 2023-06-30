import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const inputFormEl = document.querySelector('.feedback-form');

inputFormEl.addEventListener('input', throttle(handlerInput, 500));
inputFormEl.addEventListener('submit', handlerSubmit);

const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ?? {};

if (Object.keys(data).length) {
  inputFormEl.querySelector('input[name=email]').value = data.email;
  inputFormEl.querySelector('textarea[name=message]').textContent =
    data.message;
}

function handlerInput(evt) {
  data[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

function handlerSubmit(evt) {
  evt.preventDefault();
  if (Object.keys(data).length) {
    console.log(data);
  }
  dataCleaner(evt, data);
}

function dataCleaner(evt, data) {
  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.target.reset();
  evt.target.querySelector('textarea[name=message]').textContent = '';
  Object.keys(data).forEach(key => delete data[key]);
}
