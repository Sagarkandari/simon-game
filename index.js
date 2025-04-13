let level = 0;
let storeValue = [];
let userProgress = 0;
const text = document.getElementsByClassName('text');

function reWork() {
    document.addEventListener("keypress", function (event) {
        if (event.key.toLowerCase().match('a')) {
            start();
        }
        else {
            alert('wrong input');
        }
    });
}

reWork();

function updateLevelDisplay() {
    let txt = level + 1;
    text[0].innerHTML = `Level ${txt}`; // Display current level;
}

function start() {
    updateLevelDisplay();
    randomNumber();
    showbutton();
    inputButton();
}

function randomNumber() {
    let num = (Math.floor(Math.random() * 4));
    storeValue[level] = num;
}

function counter() {
    level++;
}

function showbutton() {
    for (let i = 0; i < level + 1; i++) {
        setTimeout(() => {
            let button = document.querySelectorAll('button')[storeValue[i]];
            button.classList.add("pressed");
            musicKey(storeValue[i].toString());
            setTimeout(() => {
                button.classList.remove("pressed");
            }, 300);
        }, i * 800);
    }
}

function musicKey(key) {
    switch (key) {
        case '0':
            let audio1 = new Audio('Songs/1.mp3');
            audio1.play();
            break;
        case '1':
            let audio2 = new Audio('Songs/2.mp3');
            audio2.play();
            break;
        case '2':
            let audio3 = new Audio('Songs/3.mp3');
            audio3.play();
            break;
        case '3':
            let audio4 = new Audio('Songs/4.mp3');
            audio4.play();
            break;

        default:
            console.log('key not found');
            break;
    }
}

/////  *********for loop***********
// function inputButton() {
//     let buttons = document.querySelectorAll('button'); // Select all buttons

//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].addEventListener('click', function () {
//             // Check if the clicked button matches the sequence
//             if (i === storeValue[userProgress]) {
//                 this.classList.add("pressed");
//                 musicKey(i);

//                 setTimeout(() => {
//                     this.classList.remove("pressed");
//                 }, 300);

//                 userProgress++; // Move to the next step in the sequence

//                 // Check if the user has completed the sequence
//                 if (userProgress === count + 1) {
//                     userProgress = 0; // Reset progress for the next round
//                     counter(); // Increment level
//                     start(); // Start the next level00
//                 }
//             } else {
//                 youLoose(); // Handle incorrect input
//             }
//         });
//     }
// }

function inputButton() {
    let buttons = document.querySelectorAll('button');

    buttons.forEach((button, index) => {
        button.onclick = () => {
            if (index === storeValue[userProgress]) {
                button.classList.add("pressed");
                console.log(index)
                musicKey(index.toString());

                setTimeout(() => {
                    button.classList.remove("pressed");
                }, 300);

                userProgress++;

                if (userProgress === level + 1) {
                    userProgress = 0;
                    counter();
                    setTimeout(() => {
                        start();
                    }, 1100);
                }
            } else {
                youLoose();
            }
        };
    });
}

function youLoose() {
    // Display losing message
    text[0].innerHTML = 'You Lose! To restart tap "a" key';

    // Reset game state
    level = 0;
    storeValue = [];
    userProgress = 0;

    // Ensure only one keypress listener is active
    document.removeEventListener("keypress", restartListener);
    document.addEventListener("keypress", restartListener);
}

function restartListener(event) {
    if (event.key.toLowerCase().match('a')) {
        start();
    } else {
        alert('wrong input');
    }
}
