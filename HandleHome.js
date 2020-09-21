const email = window.localStorage.getItem("email");
const uid = window.localStorage.getItem("uid");
document.getElementById('email').innerHTML += email;
const firebaseConfig = {
  apiKey: "AIzaSyBsCYT-wL4OKTeMdS_UtjqFenWKCEfTyBE",
  authDomain: "surfboard2-82de5.firebaseapp.com",
  databaseURL: "https://surfboard2-82de5.firebaseio.com",
  projectId: "surfboard2-82de5",
  storageBucket: "surfboard2-82de5.appspot.com",
  messagingSenderId: "915323970693",
  appId: "1:915323970693:web:05908d10277017efa1b5ec"

};
firebase.initializeApp(firebaseConfig);
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
function signout() {
    firebase.auth().signOut().then(function () {
        window.localStorage.setItem("email", "");
        window.localStorage.setItem("uid", "");
        window.location.href("./loginPage.html");
    }).catch(function (error) {
        console.log(error);
    });
}
function validateClick(buttonObject) {
    const option = buttonObject.name;
    window.localStorage.setItem('option', option);
    window.location.href = "./cardPage.html";
}
function navigatetoscores() {
    window.location.href = "./scores.html";
}
init();