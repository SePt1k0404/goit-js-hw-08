import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const inputFormEl = document.querySelector('.feedback-form');

inputFormEl.addEventListener('input', throttle(handlerInput, 500));
inputFormEl.addEventListener('submit', handlerSubmit);

let feedbackFormState = {};

function handlerInput(evt) {
  feedbackFormState[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackFormState));
}

function handlerSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.target.reset();
  console.log(feedbackFormState);
  feedbackFormState = {};
}

const onLoad = () => {
  try {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!data) {
      return;
    }
    feedbackFormState = JSON.parse(data);
    Object.entries(feedbackFormState).forEach(([key, val]) => {
      inputFormEl.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
};

window.addEventListener('load', onLoad);
