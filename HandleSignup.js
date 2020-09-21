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
            window.location.href = './home.html';
        }
    });
}
function validateSignUp() {
    const username = document.getElementById('InputEmail').value;
    const password = document.getElementById('InputPassword').value;
    firebase.auth().createUserWithEmailAndPassword(username, password).then(() => {
        console.log("User Created Successfully.")
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + " : " + errorMessage);
    });
    init();
}
function navigatetologin() {
    window.location.href = "./loginPage.html";
}
init();