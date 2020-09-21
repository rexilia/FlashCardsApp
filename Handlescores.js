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
            window.location.href = "./loginPage.html";
        }
    });
    const db = firebase.firestore();
    const uid = window.localStorage.getItem("uid");
    const dataRef = db.collection("users").doc(uid).collection("Scores");
    const displaytable = document.getElementById("ScoresTable");
    let row, cell1, cell2, cell3;
    dataRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            row = displaytable.insertRow(0);
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell3 = row.insertCell(2);
            cell1.innerHTML = doc.id;
            cell2.innerHTML = doc.data().field;
            cell3.innerHTML = doc.data().score;
        });
        row = displaytable.insertRow(0);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell1.style.fontWeight = 'bold';
        cell2.style.fontWeight = 'bold';
        cell3.style.fontWeight = 'bold';
        cell1.innerHTML = "DATETIME";
        cell2.innerHTML = "FIELD";
        cell3.innerHTML = "SCORE / 10";
    });
}
init();
function navigatetohome() {
    window.location.href = "./home.html";
}