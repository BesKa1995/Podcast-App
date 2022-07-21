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
        console.log('succeeded')
      })
  }
}


function openModal() {

  createModal('authorization', `
    <h1>Test</h1>
  `)
}