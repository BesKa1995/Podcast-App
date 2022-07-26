export class Question {
  static create(question) {
    return fetch('https://podcast-app-33f01-default-rtdb.firebaseio.com/question.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(response => {
        response.id = response.name
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">you do not have any token!</p>')
    }
    return fetch(`https://podcast-app-33f01-default-rtdb.firebaseio.com/question.json?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          return `<p class="error">${response.error}</p>`
        }
        return response ? Object.keys(response).map(key => ({ ...response[key], id: key })) : []
      })
  }

  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map(q => `<li>${q.text}</li>`)}</ol>` : `<p>No Questions</p>`
  }

  static renderList() {
    const questions = getQuestionFromLocalStorage()

    const html = questions.length
      ? questions.map(toCard).join('')
      : `<div class="mui--text-headline">You did not asked anything yet</div>`
    const list = document.getElementById('list')
    list.innerHTML = html
  }

}
function addToLocalStorage(question) {
  const all = getQuestionFromLocalStorage()
  all.push(question)

  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
  <br>
    <div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}    
    </div>
    <div>${question.text}</div>
    <br>
  `
}