import { handleClick } from '../../main.js';

export function LogIn() {
  const secondView = document.getElementById('container');

  const view = document.createElement('section');
  secondView.appendChild(view);
  const header = document.createElement('div');
  header.classList.add('waveLog');
  header.innerHTML = `
        <h1 class = "welcome"> Welcome</h1> 
        <h1 class = "welcomeBack" "welcome"> Back!</h1>
        <button id= "close" href="/"> X </button>
        <div class="wrapper">
        <div class="wave"></div>
        </div>`;
  view.appendChild(header);

  const btnClose = document.getElementById('close');
  btnClose.addEventListener('click', (e) => {
    handleClick(e);
  });

  const form = document.createElement('form');
  form.innerHTML = `
        <input class="loginInput1" type="email" id="email" placeholder="E-mail">
        <input class="loginInput" type="password" id="password" placeholder="Password">`;
  view.appendChild(form);

  function message(errorText) {
    // crear un modal
    console.log(errorText);
  }

  const btnLogIn = document.createElement('a');
  btnLogIn.classList.add('LogIn');
  btnLogIn.innerHTML = 'Log In';
  view.appendChild(btnLogIn);
  btnLogIn.addEventListener('click', () => {
    const emailLog = document.getElementById('email').value;
    const passwordLog = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(emailLog, passwordLog).then(() => {
      console.log('Logueado con éxito');
      window.location.hash = '#/Wall';
    })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        message(errorMessage);
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;
      }
    });
  });

  function messageGoogle(errorText) {
    // crear un modal
    console.log(errorText);
  }

  const logGoogle = document.createElement('a');
  logGoogle.classList.add('LogGoogle');
  logGoogle.innerHTML = '<img src="./Imagenes/googleIcono.png"/> <p>Log in with Google</p> ';
  view.appendChild(logGoogle);
  logGoogle.addEventListener('click', () => {
    // Estamos indicando que se pueda autenticar con google
    const provider = new firebase.auth.GoogleAuthProvider();
    // Popup es para abrir una ventana emergente
    firebase.auth().signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken;
      // console.log(token);
      const user = result.user;
      // console.log(user);
      window.location.hash = '#/Wall';
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      messageGoogle(error.message);
    });
    // console.log(provider);
  });
  return view;
}
