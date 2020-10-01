// Este es el punto de entrada de tu aplicacion
import { Home } from './lib/views/home.js';
import { LogIn } from './lib/views/log.js';
import { SignIn } from './lib/views/sign.js';
import { Profile } from './lib/views/profile.js';
import { Wall } from './lib/views/wall.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDQpqmRE7SDOofZfUO27fp4vjLYJzpWDFk',
  authDomain: 'benevole-d33d7.firebaseapp.com',
  databaseURL: 'https://benevole-d33d7.firebaseio.com',
  projectId: 'benevole-d33d7',
  storageBucket: 'benevole-d33d7.appspot.com',
  messagingSenderId: '400517057071',
  appId: '1:400517057071:web:cab07bf64150fae1b2d4da',
  measurementId: 'G-B2PM87CH7E'
};
  // Initialize Firebase and Cloud Firestore
firebase.initializeApp(firebaseConfig);

const routes = {
  '/': Home,
  '#/Home': Home,
  '#/LogIn': LogIn,
  '#/SignIn': SignIn,
  '#/Profile': Profile,
  '#/Wall': Wall,
};

// Queremos renderizar la vista en nuestro HTML
const root = document.getElementById('container');
const render = (Component) => {
  root.innerHTML = '';
  const el = Component();
  if (el instanceof HTMLElement) {
    root.appendChild(el);
  }
};

// Inicializar la página
if (!window.location.hash) {
  render(routes['/']);
} else {
  render(routes[window.location.hash]);
}

export const handleClick = (e) => {
  const href = e.currentTarget.getAttribute('href'); // El currentTarget identifica el elemento <a> (el elemento donde ocurra el evento especificado) y getAttribute obtener el href del elemento <a>

  // Interceptar todo href que comience con HTTP, si es así no debe hacer nada
  if (/^http/.test(href)) {
    return;
  }

  e.preventDefault();
  navigateTo(href); // Queremos navegar a las vistas por medio del href
};

// Manejo historia API o de navegador
const navigateTo = (url) => {
  render(routes[url]);
  window.history.pushState({}, '', url);
};

window.addEventListener('load', () => {
  // Capturar la ruta de la página
  window.addEventListener('hashchange', () => {
    // validar el string si es vacio o no con el hash
    if (!window.location.hash) {
      render(routes['/']);
    } else {
      render(routes[window.location.hash]);
    }
  });

  window.addEventListener('popstate', () => {
    render(routes[window.location.pathname]);
  });
});
