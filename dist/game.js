"use strict";
console.log("js is connected");
// variabels
let imges = [
    "https://cdn.pixabay.com/photo/2016/11/23/18/27/hummingbird-1854225__480.jpg",
    "https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314__480.jpg",
    "https://cdn.pixabay.com/photo/2022/12/02/18/37/middle-spotted-woodpecker-7631440__480.jpg",
    "https://cdn.pixabay.com/photo/2013/10/08/20/57/gull-192909__480.jpg",
    "https://cdn.pixabay.com/photo/2022/12/13/13/30/bird-7653386__480.jpg",
    "https://cdn.pixabay.com/photo/2018/08/19/19/56/peacock-3617474__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295436__480.jpg",
    "https://cdn.pixabay.com/photo/2018/06/10/00/11/seagull-3465550__480.jpg"
];
let turn = false; //player 1 turn
let turnText = document.querySelector(".turnText");
let firstSelction;
let secondSelection;
let counter = 0;
let win = false;
let score1 = 0;
let score2 = 0;
let score1Text = document.querySelector(".score1Text");
let score2Text = document.querySelector(".score2Text");
let gameMap = document.querySelector(".game .gameMap");
let levels = document.querySelectorAll("input");
let startDiv = document.querySelector(".startGameDiv");
gameMap.style.display = "none";
turnText.style.display = "none";
//--------------------------------------function--------------------------------------------------------------------
function onStart() {
    console.log("game is starting");
    if (levels[0].checked == true) {
        for (let i = 0; i < 4; i++) {
            imges.shift();
        }
    }
    if (levels[1].checked == true) {
        for (let i = 0; i < 2; i++) {
            imges.shift();
        }
    }
    //  recognized array
    let temp = [];
    for (var i = 0; i < imges.length; ++i) {
        temp.push(imges[i]);
        temp.push(imges[i]);
    }
    imges = temp;
    imges.sort(() => Math.random() - 0.5);
    imges.forEach(img => {
        let newImg = document.createElement("img");
        let newDiv = document.createElement("div");
        newDiv.className = `imgBox`;
        let newCover = document.createElement("div");
        newCover.className = "newCover";
        newCover.innerHTML = "?";
        newImg.src = img;
        newDiv.appendChild(newImg);
        newDiv.appendChild(newCover);
        gameMap === null || gameMap === void 0 ? void 0 : gameMap.appendChild(newDiv);
    });
    let imgBoxes = document.querySelectorAll(".imgBox");
    imgBoxes.forEach(img => { img.addEventListener("click", onClick); });
    ///
    gameMap.style.display = "flex";
    turnText.style.display = "block";
    startDiv.style.display = "none";
    if (levels[0].checked == true) {
        imgBoxes.forEach((el) => {
            el.style.height = "43%";
        });
    }
    if (levels[1].checked == true) {
        imgBoxes.forEach((el) => {
            el.style.height = "30%";
        });
    }
    if (levels[2].checked == true) {
        gameMap.style.width = "60%";
    }
}
function onClick(e) {
    console.log("hi im clicked");
    if (counter < 2) {
        counter++;
        let thisCover = e.target;
        thisCover.style.backgroundImage = "none";
        thisCover.innerHTML = "";
        let selctionBox = e.target.parentNode;
        counter == 1 ? firstSelction = selctionBox : secondSelection = selctionBox;
        firstSelction.removeEventListener("click", onClick);
    }
    if (counter == 2) {
        setTimeout(function () {
            firstSelction.childNodes[1].style.backgroundImage = " linear-gradient(120deg, rgb(166, 166, 226) 60%, rgb(249, 179, 58) 60.5%)";
            firstSelction.childNodes[1].innerHTML = "?";
            secondSelection.childNodes[1].style.backgroundImage = " linear-gradient(120deg, rgb(166, 166, 226) 60%, rgb(249, 179, 58) 60.5%)";
            secondSelection.childNodes[1].innerHTML = "?";
            firstSelction.addEventListener("click", onClick);
            counter = 0;
            chekCouple(firstSelction, secondSelection);
            changeTurn();
        }, 1000);
    }
}
function changeTurn() {
    turn = !turn;
    turn === false ? turnText.textContent = "player 1 turn" : turnText.textContent = "player 2 turn";
}
function chekCouple(box1, box2) {
    if (box1.childNodes[0].src === box2.childNodes[0].src) {
        box1.childNodes[1].style.background = "rgba(0, 0, 0, 0.4)";
        box2.childNodes[1].style.background = "rgba(0, 0, 0, 0.4)";
        box1.childNodes[1].innerHTML = "done!";
        box2.childNodes[1].innerHTML = "done!";
        box1.removeEventListener("click", onClick);
        box2.removeEventListener("click", onClick);
        turn === false ? score1Text.textContent += ` *` : score2Text.textContent += ` *`;
        if (chekWin() === true) {
            if (score1Text.textContent.length > score2Text.textContent.length)
                alert("Congratulations! \n player 1 won");
            else if (score1Text.textContent.length < score2Text.textContent.length)
                alert("Congratulations! \n player 2 won");
            else
                alert("Congratulations! it is draw:) \n You both won");
            location.reload();
        }
    }
}
function chekWin() {
    let imgBoxes = document.querySelectorAll(".imgBox");
    console.log("chekWin() is play");
    console.log(imgBoxes);
    for (let i = 0; i < imgBoxes.length; i++) {
        if (imgBoxes[i].childNodes[1].innerHTML == "done!") {
            win = true;
            console.log(imgBoxes[i].childNodes[1].innerHTML);
            console.log(`win ${win}`);
        }
        else {
            return false;
        }
    }
    return true;
}
