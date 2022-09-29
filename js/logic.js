const playerX = document.querySelector('.playerX')
const playerO = document.querySelector('.playerO')
const confirmPlayer = document.querySelector('.confirm-player')
const playground = document.querySelector('.playground')
const playBox = document.querySelectorAll('.boxes')
const botBox = document.querySelectorAll('.play')
const replay = document.querySelector('.replay')
let currentPlayerX;
let currentPlayerO;
let botPlaying = false;


replay.addEventListener("click", () => {
    location.reload()
})


function confirmPlayerHandler() {
    playerX.addEventListener("click", () => {
        currentPlayerX = true;
        playground.classList.remove("nodisp")
        confirmPlayer.classList.add("nodisp")
        realPlayer("X")
        checkTurn()
    })
    playerO.addEventListener("click", () => {
        currentPlayerO = true;
        playground.classList.remove("nodisp")
        confirmPlayer.classList.add("nodisp")
        realPlayer("O")
        checkTurn()
    })
}

function checkTurn() {
    if (currentPlayerX == true) {
        document.querySelector('.currentPlayerX').classList.add("active")
        document.querySelector('.currentPlayerO').classList.remove("active")
        currentPlayerX = false;
    } else {
        currentPlayerX = true;
        document.querySelector('.currentPlayerX').classList.remove("active")
        document.querySelector('.currentPlayerO').classList.add("active")
    }
}


function bot(args) {
    botPlaying = true;
    let confirm = checkWinner()
    console.log(confirm)
    if (!confirm) {
        let arrayBox = []
        for (let i = 0; i < playBox.length; i++) {
            if (playBox[ i ].childElementCount == 0) {
                arrayBox.push(i);
            }
        }
        if (arrayBox.length > 0) {
            i = arrayBox[ getRandomNumber(arrayBox) ]
            setTimeout(() => {
                playBox[ i ].innerHTML = `<p> ${ args } </p>`;
                checkTurn()
                checkWinner()
                botPlaying = false;
            }, 500)
        }
    }
}


function realPlayer(args) {
    playBox.forEach(element => {
        element.addEventListener("click", () => {
            if (element.innerHTML == "" && botPlaying == false) {
                let confirm = checkWinner();
                if (!confirm) {
                    element.innerHTML = `<p> ${ args } </p>`;
                    checkTurn()
                }
                if (args == "X") {
                    bot("O")
                } else {
                    bot("X")
                }
            } else {
                checkWinner()
            }
        })
    });

}
// function removeListener() {
//     playerX.removeEventListener()
//     playerO.removeEventListener()
// }

function getRandomNumber(array) {
    return Math.floor((Math.random() * array.length) + 0);

}

function checkWinner() {
    let box1 = document.getElementById('box1').innerHTML
    let box2 = document.getElementById('box2').innerHTML
    let box3 = document.getElementById('box3').innerHTML
    let box4 = document.getElementById('box4').innerHTML
    let box5 = document.getElementById('box5').innerHTML
    let box6 = document.getElementById('box6').innerHTML
    let box7 = document.getElementById('box7').innerHTML
    let box8 = document.getElementById('box8').innerHTML
    let box9 = document.getElementById('box9').innerHTML

    if (box1 == box2 && box2 == box3 && box1 != "") {
        winner(box1)
        return true
    } else if (box4 == box5 && box5 == box6 && box4 != "") {
        winner(box4)
        return true
    } else if (box7 == box8 && box8 == box9 && box7 != "") {
        winner(box7)
        return true
    } else if (box1 == box5 && box5 == box9 && box1 != "") {
        winner(box1)
        return true
    } else if (box3 == box5 && box5 == box7 && box3 != "") {
        winner(box3)
        return true
    } else if (box1 == box4 && box4 == box7 && box1 != "") {
        winner(box1)
        return true
    } else if (box2 == box5 && box5 == box8 && box2 != "") {
        winner(box2)
        return true
    } else if (box3 == box6 && box9 == box6 && box3 != "") {
        winner(box3)
        return true
    } else if (box1 != "" && box2 != "" && box3 != "" && box4 != "" && box5 != "" && box6 != "" && box7 != "" && box8 != "" && box9 != "") {
        tie()
        return true
    }
    return false
}

function winner(args) {
    document.querySelector(".winner").classList.remove("nodisp")
    document.querySelector(".winner p span").innerHTML = args;
}

function tie() {
    document.querySelector(".winner").classList.remove("nodisp")
    document.querySelector(".winner p").innerHTML = "Its a tie!";

}
confirmPlayerHandler()