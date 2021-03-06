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
firebase.initializeApp(firebaseConfig);
function init() {
    databaseURL = "https://surfboard2-82de5.firebaseio.com";
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

const urls = ["bands","hollywood", "singers", "superheroes"];
let url;
let option = window.localStorage.getItem('option');
const email = window.localStorage.getItem("email");
const uid = window.localStorage.getItem('uid');
console.log(uid);
document.getElementById("username").innerHTML += ` ${email}`;
let snackbar = document.getElementById("snackbar");
var db = firebase.firestore();
let gameState = "NOT_STARTED";
let score;
let questionNumber;
let questions;
switch (option) {
    case 'Bands':
        url = urls[0];
        break;
    case 'Hollywood':
        url = urls[1];
        break;
    case 'Singers':
        url = urls[2];
        break;
    case 'Super Heroes':
        url = urls[3];
        break;
    case 'Random':
        url = urls[Math.floor(Math.random() * 4)];
        break;
}
async function getDatas() {
    const res = await (await fetch("http://localhost:3002", {
        method: "post", headers: { 'Content-Type': 'application/json' }, body:JSON.stringify({
            category: url,
        })
    })).json();
    return res;
}
function fillquestionpallet() {
    document.getElementById("image").src = questions.images[questionNumber - 1];
    let ops = [document.getElementById("option1")
        , document.getElementById("option2")
        , document.getElementById("option3")
        , document.getElementById("option4")];
    let oplist = [];
    while (oplist.length < 4) {
        let pushItem = Math.floor(Math.random() * questions.nameLists.length);
        if (questions.nameLists[pushItem] != questions.names[questionNumber - 1]) {
            oplist.push(questions.nameLists[pushItem]);
        }
    }
    for (let iter = 0; iter < 4; iter++) {
        if (questions.options[questionNumber - 1] == iter) {
            ops[iter].innerHTML = questions.names[questionNumber - 1];
        }
        else {
            ops[iter].innerHTML = oplist[iter];
        }
    }
}
function validateanswer(obj) {
    if (obj.id.substr(-1) == questions.options[questionNumber - 1] + 1) {
        score++;
        snackbar.innerHTML = "Hurray, Thats right!!"
        snackbar.className = "show";
        setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 1200);
    }
    else {
        snackbar.innerHTML = "Oopsie, Thats Wrong"
        snackbar.className = "show";
        setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 1200);
    }
    if (questionNumber < 10) {
        questionNumber++;
        fillquestionpallet();
        document.getElementById("score").style.display = "block";
        document.getElementById("score").innerHTML = `${score} : Score`;
    }
    else {
        document.getElementById("question-card").style.display = "none";
        document.getElementById("displayScore").innerHTML = `Score: ${score} /10`;
        document.getElementById("restartGame").style.display = "block";
        let dt = new Date();
        dt = dt.toDateString() + " " + dt.toTimeString();
        const docRef = db.collection('users').doc(uid).collection('Scores');
        docRef.doc(dt).set({
            field: option,
            score: score
        }).then(() => {
            console.log("Score Added Successfully!");
        }).catch((err) => {
            console.error(err);
        });
    }
}
function navigatetohome() {
    window.location.href = "./home.html";
}
async function startGame() {
    document.getElementById("score").innerHTML = `0: Score`;
    let object = await getDatas(url);
    let allimages = object.data.imgList;
    let allnames = object.data.nameList;
    let test = object.data.res;
    console.log(allimages,allnames,test);
    score = 0;
    questionNumber = 1;
    questions = generateQuestions(allimages, allnames);
    gameState = true;
    document.getElementById("question-card").style.display = "block";
    document.getElementById("startGame").style.display = "none";
    document.getElementById("restartGame").style.display = "none";
    
    fillquestionpallet();
}
function generateQuestions(imgurls, nameLists) {
    let images = [];
    let names = [];
    let options = [];
    let selectedIndex;
    let urlSelected;
    if (gameState) {
        while (images.length < 10) {
            selectedIndex = Math.floor(Math.random() * imgurls.length);
            urlSelected = imgurls[selectedIndex];
            if (!images.includes(urlSelected)) {
                images.push(urlSelected);
                names.push(nameLists[selectedIndex]);
                options.push(Math.floor(Math.random() * 4));
            }
        }
    }
    console.log(images, names, options, imgurls, nameLists);
    return { images, names, options, imgurls, nameLists };
}
function navigatetoscores() {
    window.location.href = "./scores.html";
}