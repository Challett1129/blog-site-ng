//function to call login route 
async function loginRoute (){
  return fetch('api/users/login', {
    method: 'post',
    body: JSON.stringify({
        email, 
        password
    }),
    headers: { 'Content-Type': 'application/json' }
})
}

//handles login attempts
async function loginFormHandler(e) {
    //prevent page from reloading
    e.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await loginRoute
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    };
};

async function signupFormHandler(e) {
    e.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        await loginRoute

        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      }
      } else {
        alert(response.statusText);
      }
}



//connects login button to logic 
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);