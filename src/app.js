import { authWidthEmailAndPassword, getAuthForm } from './auth'
import { Question } from './question'
import './styles/style.css'
import { createModal, isValid } from './utils'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.getElementById('modal-btn')
modalBtn.addEventListener('click', openModal)
window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
  event.preventDefault()
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }
    Question.create(question)
      .then(() => {
        input.value = ''
        submitBtn.disabled = true
      })
  }
}


function openModal() {
  createModal('authorization', getAuthForm())
  document.getElementById('auth-form')
    .addEventListener('submit', authFormHandler)
}

function authFormHandler(event) {
  event.preventDefault()
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value
  console.log(email, password)
  authWidthEmailAndPassword(email, password)
    .then(token => Question.fetch(token))
    .then(renderModalAfterAuth)
}


function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Error', content)
  } else {
    createModal('Question List', Question.listToHTML(content))
  }
}