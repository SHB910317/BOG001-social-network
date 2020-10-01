export function Profile() {
  const fourthView = document.getElementById('container');

  const view = document.createElement('section');
  fourthView.appendChild(view);
  const header = document.createElement('div');
  header.classList.add('profileWave');
  header.innerHTML = `
        <h1>Benevole</h1>
        <div class="wave" style="height: 150px; overflow: hidden;" ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M-2.54,146.53 C50.51,172.20 209.65,-13.31 500.84,141.61 L508.17,-34.03 L-1.41,-37.00 Z" style="stroke: none; fill: #229ACF;"></path></svg></div>`;
  view.appendChild(header);

  /*let profile = document.createElement("div");
    profile.innerHTML= `
    <image
    `*/

  // let name = document.getElementById("name").value;
  // name.innerHTML

  const form = document.createElement('form');
  form.innerHTML = ` 
    <p>Volunteer</p>
    <input type="number" id="phone" placeholder="Phone">
    <input type="email" id="email" placeholder="E-mail">
    <input type="text" id="about" placeholder="About you">
    <select> <option>Languages</option>
    <option>Spanish</option>
    <option>English</option>
    <option>French</option>
    </select> </br>
    <select> <option>Areas of interest</option>
    <option>Education</option>
    <option>Health</option>
    <option>Technology</option>
    </select>
   `;
  view.appendChild(form);

  const btnSetUp = document.createElement('a');
  btnSetUp.classList.add('LogIn');
  btnSetUp.href= '#/Wall';
  btnSetUp.innerHTML = 'Save Changes';
  view.appendChild(btnSetUp);
  btnSetUp.addEventListener('click', (e) =>{
    //     handleClick(e);
    // console.log(e);
  });

  return view;
}
