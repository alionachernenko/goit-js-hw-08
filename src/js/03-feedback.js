import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name="email"]'),
  messageInput: document.querySelector('textarea[name="message"]'),
};

populateFormData();

refs.form.addEventListener('input', throttle(onFormElementsInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function populateFormData() {
  const formValues = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!formValues) return;

  refs.emailInput.value = formValues.email;
  refs.messageInput.value = formValues.message;
}

function onFormElementsInput() {
  formData.message = refs.messageInput.value;
  formData.email = refs.emailInput.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  refs.form.reset();
  localStorage.removeItem(STORAGE_KEY);
}
