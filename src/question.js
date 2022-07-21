export class Question {
  static create(question) {
    return fetch('https://podcast-app-33f01-default-rtdb.firebaseio.com/question.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-type': 'application/json'
      }
    })
  }
}