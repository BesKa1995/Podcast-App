export function getAuthForm() {
  return `
  <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="email">
      <label for="email">Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="password">
      <label for="password">Password</label>
    </div>
    <button type="submit" class="mui-btn mui-btn--primary">Submit</button>
  </form>
  `
}

export function authWidthEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyB4ERIelW7tlSGz-p_ZWr5P3WsgOkTI0YQ'
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email, password,
      returnSecureToken: true

    }),
    headers: {
      'Content-Type': 'application/json'

    }
  })
    .then(response => response.json())
    .then(data => data.idToken)

}