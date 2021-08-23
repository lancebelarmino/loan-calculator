// Calculator
const resultElement = document.querySelector('#resultSection');
const loanElement = document.querySelector('#loanSection');
const resetBtn = document.querySelector('#resetCalculator');

function runCalculator() {
  const loanAmount = parseFloat(document.querySelector('#loanAmount').value);
  const loanTerm = parseFloat(document.querySelector('#loanTerm').value);
  const interestRate = parseFloat(document.querySelector('#interestRate').value);

  const yearlyInterestRate = (interestRate / 100) / 12;
  const totalMonths = loanTerm * 12;
  let monthlyPayment = (loanAmount * yearlyInterestRate) / (1 - ((1 + yearlyInterestRate) ** -totalMonths));
  let totalPayment = monthlyPayment * totalMonths;
  let totalInterest = totalPayment - loanAmount;

  totalPayment = totalPayment.toFixed(2);
  totalInterest = totalInterest.toFixed(2);
  monthlyPayment = monthlyPayment.toFixed(2);

  return {
    totalPayment: totalPayment,
    totalInterest: totalInterest,
    monthlyPayment: monthlyPayment,
    loanAmount: loanAmount,
    loanTerm: loanTerm,
    interestRate: interestRate,
  }
}

function displayResult() {
  const result = runCalculator();
  const resultMonthly = document.querySelector('#resultMonthly');
  const resultInterest = document.querySelector('#resultInterest');
  const resultAmount = document.querySelector('#resultAmount');
  const calcInputTerm = document.querySelector('#calcInputTerm');
  const calcInputAmount = document.querySelector('#calcInputAmount');
  const calcInputInterest = document.querySelector('#calcInputInterest');
  

  resultMonthly.textContent = `$ ${result.totalPayment}`;
  resultInterest.textContent = `$ ${result.totalInterest}`;
  resultAmount.textContent = `$ ${result.monthlyPayment}`;
  calcInputTerm.textContent = `${result.loanTerm}  Years`;
  calcInputAmount.textContent = `$ ${result.loanAmount}`;
  calcInputInterest.textContent = `% ${result.interestRate}`;

  changeVisibility(resultElement, 'show');
  changeVisibility(loanElement, 'hide');
}

resetBtn.addEventListener('click', () => {
  fields.forEach((field) => {
    field.value = '';
  });

  changeVisibility(resultElement, 'hide');
  changeVisibility(loanElement, 'show');
});



// Form Validation
class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnSubmit();
    this.validateOnBlur();
  }

  validateOnSubmit() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fieldError = document.querySelector('.input__field--error');

      this.fields.forEach((field) => {
        this.validateField(field);
      });

      if (!fieldError) {
        displayResult();
      }
    });
  }

  validateOnBlur() {
    this.fields.forEach((field) => {
      field.addEventListener('blur', () => {
        this.validateField(field);
      });
    });
  }

  validateField(field) {
    const userInput = field.value;
    if (userInput == '' || userInput <= 0 || userInput == null) {
      this.setStatus(field, 'error');
    } else {
      this.setStatus(field, 'success');
    }
  }

  setStatus(field, status) {
    const errorMessage = document.createElement('span');
    errorMessage.className = 'input__error-icon';

    const errorIcon = document.createElement('img');
    errorIcon.src = './assets/error.svg';
    errorIcon.setAttribute('aria-hidden', 'true');
    errorMessage.appendChild(errorIcon);

    const inputIcon = field.previousElementSibling;

    if (status === 'error') {
      if (!field.classList.contains('input__field--error')) {field.parentNode.insertBefore(errorMessage, field.nextSibling);}
      inputIcon.classList.add('input__icon--error');
      field.classList.add('input__field--error');
    } 
    
    if (status === 'success') {
      if (field.nextElementSibling) {field.nextElementSibling.remove();}
      inputIcon.classList.remove('input__icon--error');
      field.classList.remove('input__field--error');
    }
  }
}

const form = document.querySelector('#loanForm');
const inputFields = Array.from(document.querySelectorAll('.input__field'));
let fields = [];

inputFields.forEach((field) => {
  fields.push(field);
});

const validator = new FormValidator(form, fields);

validator.initialize();



// Helpers
function changeVisibility(element, action) {
  if (action === 'show') {
    element.classList.remove('is-hidden');
  }

  if (action === 'hide') {
    element.classList.add('is-hidden');
  }

  if (action === 'toggle') {
    element.classList.toggle('is-hidden')
  }
}