export function Wall() {
  console.log('usted esta en wall');
  const wallView = document.getElementById('container');

  const view = document.createElement('section');
  wallView.appendChild(view);

  const wave3 = document.createElement('div');
  wave3.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#229ACF" fill-opacity="1" d="M0,96L48,90.7C96,85,192,75,288,101.3C384,128,480,192,576,213.3C672,235,768,213,864,181.3C960,149,1056,107,1152,96C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>`;
  view.appendChild(wave3);

  const header = document.createElement('div');
  header.innerHTML = `
    <nav id="menu"> 
    <li><a href="#"><img src="./Imagenes/usuario.svg"></a>
        <ul class="children">
          <li><a href="#/Profile" id="profile">Profile</a></li>
          <li><a href="/" id="logOut">Log Out</a></li>
        </ul>
    <li>
    </nav> 
    <h1> Benevole </h1>`;
  view.appendChild(header);

  // Initialize Firestore -Funciones de firestore
  const db = firebase.firestore();

  function editPost(id, post) {
    console.log(id);
    console.log(post);
    document.getElementById('publication').value = `${post.post}`;
    const update = document.getElementsById('postModal');
    update.innerHTML = 'Edit';
    update.addEventListener('click', () => {
      const edit = db.collection('Post').doc(id);
      const newDescription = document.getElementById('publication').value;
      return edit.update({
        post: newDescription,
      })
        .then(() => {
          update.innerHTML = 'Save';
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    });
  }

  function deletePost(id) {
    console.log(id);
    db.collection('Post').doc(id).delete().then(() => {
      console.log('Document successfully deleted!');
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
  function createPost(postSpaceElement, id, post) {
    postSpaceElement.insertAdjacentHTML('beforeend', `
    <div>
      <button class="btnDelete" id ="post${id}">Delete</button>
      <button class="btnEdit" id ="edit${id},${post}">Edit</button>
      ${post.post}
    </div>`);
    const btndelete = document.getElementById(`post${id}`);
    console.log(btndelete);
    btndelete.addEventListener('click', () => {
      deletePost(id);
    });
    const btnedit = document.getElementById(`edit${id},${post}`);
    btnedit.addEventListener('click', () => {
      editPost(id, post);
    });
  }

  const profile = document.getElementById('profile');
  profile.addEventListener('click', () => {
    window.location.hash = '#/Profile';
  });

  // Boton de cierre de wall
  const logOut = document.getElementById('logOut');
  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      console.log('The sesion has been closed');
    });
  });

  // Creamos los elementos de la ventana modal
  const modal = document.createElement('div');
  modal.classList.add('modal-window');
  view.appendChild(modal);

  const head = document.createElement('div');
  head.classList.add('modal-header');
  head.innerHTML = `
    <h1> Benevole </h1>
    <button id="close"> X </button>
    `;
  modal.appendChild(head);

  // Se crea el input de la ventana modal
  const put = document.createElement('div');
  put.classList.add('put');
  put.innerHTML = `
    <input type="text" id="publication" placeholder="What's new?">
    `;
  modal.appendChild(put);

  const btnmodal = document.createElement('button');
  btnmodal.classList.add('btnmodal');
  btnmodal.innerHTML = `
    <p id="postModal">Post</p>`;
  put.appendChild(btnmodal);

  // Creamos el input de la vista de wall
  const posts = document.createElement('div');
  posts.classList.add('postSpace');
  posts.setAttribute('id', 'postSpace');
  view.appendChild(posts);
  const modals = document.createElement('div');
  posts.classList.add('modals');
  modals.innerHTML = `
        <input type="text" id="Post" placeholder="What's new?">
        `;
  posts.appendChild(modals);

  // Espacio del Post en la vista de Wall
  // function elementsPost(id, post) {
  //   createPost(posts, id, post);
  // }
  function loadPosts() {
    posts.innerHTML = '';
    db.collection('Post').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // eslint-disable-next-line no-use-before-define
        createPost(posts, doc.id, doc.data());
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  }

  loadPosts();
  //     <button id="favorite" class="btnWall">Favorite</button>
  //     <button id="like" class="btnWall">Like</button>
  //     <button id="comment" class="btnWall">Comment</button>
  //     `;
  //

  // Es la funcion que abre el modal
  posts.appendChild(modals);
  posts.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  // Es la función que cierra el modal
  const close = document.getElementById('close');
  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  const modalPost = document.getElementById('postModal');
  modalPost.addEventListener('click', () => {
    const description = document.getElementById('publication').value;
    const newPost = {
      post: description,
    };

    db.collection('Post').add(newPost)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('publication').value = '';
      // var fecha =
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    modal.style.display = 'none';
  });

  return view;
}


// Un evento que confirma si el usuario est alogueado o no
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     firebase.firestore.collection('Posts')
//       .get()
//       .then((snapshot)=> {


//       });
//   } else {
//     console.log('sign out');
//   }
// });

/* User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log("sign in")
        } else {
            console.log("sign out")
        } */
