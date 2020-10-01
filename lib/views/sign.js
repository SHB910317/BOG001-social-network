import { handleClick } from '../../main.js';

export function SignIn() {
  const thirdView = document.getElementById('container');

  const view = document.createElement('section');
  thirdView.appendChild(view);
  const header = document.createElement('div');
  header.classList.add('waveSign');
  header.innerHTML = `
        <h1 class="welcome"> Welcome!</h1> 
        <h1 class="create"> Create account!</h1>
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
        <input type="text" id="name" placeholder="Name">
        <input type="email" id="email" placeholder="E-mail">
        <input type="password" id="password" placeholder="Password">`;
  view.appendChild(form);

  function messageSign(errorText) {
    // crear un modal
    console.log(errorText);
  }

  const btnSignIn = document.createElement('a');
  btnSignIn.classList.add('btnSignIn');
  btnSignIn.innerHTML = 'Sign In';
  view.appendChild(btnSignIn);
  btnSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      console.log('cuenta creada con éxito');
      window.location.hash = '#/Profile';
    })
      .catch((error) => {
        // Handle Errors here.Crear un catch y un then 
        let errorCode = error.code;
        let errorMessage = error.message;
        messageSign(error.message);
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

  function googleSigin(errorText) {
    // crear un modal
    console.log(errorText);
  }

  const signGoogle = document.createElement('a');
  signGoogle.classList.add('signGoogle');
  signGoogle.href = '#/Wall';
  signGoogle.innerHTML = '<img src="./Imagenes/googleIcono.png"/> <p>Sign in with Google</p>';
  view.appendChild(signGoogle);
  signGoogle.addEventListener('click', () => {
    // Estamos indicando que se pueda autenticar con google
    const provider = new firebase.auth.GoogleAuthProvider();
    // Popup es para abrir una ventana emergente
    firebase.auth().signInWithPopup(provider).then((result) => {
      let token = result.credential.accessToken;
      let user = result.user;
    })
      .catch((error) => {
        let errorCode = error.code;
        const errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
        googleSigin(errorMessage);
      });
  });
  return view;
}
