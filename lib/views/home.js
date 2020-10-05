import { handleClick } from '../../main.js';

export function Home() {
  const firstView = document.getElementById('container');

  const view = document.createElement('section');
  firstView.appendChild(view);
  const header = document.createElement('div');
  header.classList.add('homeWave');
  header.innerHTML = `
      <h1> Benevole </h1>`;
  view.appendChild(header);

  const wave3 = document.createElement('div');
  wave3.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#229ACF" fill-opacity="1" d="M0,96L48,90.7C96,85,192,75,288,101.3C384,128,480,192,576,213.3C672,235,768,213,864,181.3C960,149,1056,107,1152,96C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>`;
  view.appendChild(wave3);

  const headerP = document.createElement('div');
  headerP.classList.add('textP');
  headerP.innerHTML = `
      <p>Want to be part of the change? Our social network of volunteers will help you create amazing memories and experiences. Find volunteer opportunities all around the world and get to know others like you.</p>`;
  view.appendChild(headerP);

  const btnJoin = document.createElement('a');
  btnJoin.classList.add('Join');
  btnJoin.href = '#/SignIn';
  btnJoin.innerHTML = 'Join Us';
  view.appendChild(btnJoin);
  btnJoin.addEventListener('click', (e) => {
    handleClick(e);
  });

  const btnLog = document.createElement('a');
  btnLog.classList.add('Log');
  btnLog.href = '#/LogIn';
  btnLog.innerHTML = 'Log In';
  view.appendChild(btnLog);
  btnLog.addEventListener('click', (e) => {
    handleClick(e);
  });

  const body = document.createElement('div');
  body.classList.add('textP');
  body.innerHTML = `
    <p>“You make a living by what you get. You make a life by what you give.”
    </br>
        -Winston Churchill-</p>
            <img src="./Imagenes/volunteers1.png">`;
  view.appendChild(body);

  return view;
}
