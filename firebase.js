const Http = new XMLHttpRequest();
const firebaseConfig = {
  apiKey: "AIzaSyBsCYT-wL4OKTeMdS_UtjqFenWKCEfTyBE",
  authDomain: "surfboard2-82de5.firebaseapp.com",
  databaseURL: "https://surfboard2-82de5.firebaseio.com",
  projectId: "surfboard2-82de5",
  storageBucket: "surfboard2-82de5.appspot.com",
  messagingSenderId:  "915323970693",
  appId: "1:915323970693:web:05908d10277017efa1b5ec"

};
firebase.initializeApp(config);
function init() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var email = user.email;
            var uid = user.uid;
            window.localStorage.setItem("email", email);
            window.localStorage.setItem("uid", uid);
        }
        else {
            window.location.href = './loginPage.html';
        }
    });
}
init();
const db = firebase.database();