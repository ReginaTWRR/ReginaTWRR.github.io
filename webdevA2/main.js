/* js for page management */
// target all elements to save to constants
const page1button = document.querySelector("#page1button");
const page2button = document.querySelector("#page2button");
const page3button = document.querySelector("#page3button");
const page4button = document.querySelector("#page4button");
var allPages = document.querySelectorAll(".page");
var navButtons = document.querySelectorAll(".navButtons");
// select all subtopic pages
function hideAll() { // function to hide all pages
    for (let onePage of allPages) { // go through all subtopic pages
        onePage.style.display = "none"; // hide it
    }
}
function show(pageNumber) { // function to show selected page number
    hideAll();
    let onePage = document.querySelector("#page" + pageNumber);
    onePage.style.display = "block"; // show the page
}
function clearColours() {
    for (let oneButton of navButtons) {
        oneButton.style.border = "2px solid black";
    }
}
function changeBorder(buttonNumber) {
    clearColours();
    let oneButton = document.querySelector("#page" + buttonNumber + "button");
    oneButton.style.border = "2px solid #0075FA";
}
/* Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function */
page1button.addEventListener("click", function() {
    show(1);
    changeBorder(1);
});
page2button.addEventListener("click", function() {
    show(2);
    changeBorder(2);
});
page3button.addEventListener("click", function() {
    show(3);
    changeBorder(3);
});
page4button.addEventListener("click", function() {
    show(4);
    changeBorder(4);
});
hideAll();
clearColours();
show(1);
page1button.style.border = "2px solid #0075FA";
/* js for hamburger menu */
const hamButton = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamButton.addEventListener("click", toggleMenus);
function toggleMenus() { // open and close menu
    // if menuItemsList dont have the class "menuShow", add it; else remove it
    menuItemsList.classList.toggle("menuShow");
    hamButton.addEventListener("mouseout", stopHovering);
    // if menu is showing (has the class "menuShow")
    if (menuItemsList.classList.contains("menuShow")) {
        hamButton.innerHTML = "<strong>X</strong>"; // change button text to choose menu
        hamButton.removeEventListener("mouseover", hoverOriginal);
        hamButton.addEventListener("mouseover", hoverRed);
    } else { // if menu NOT showing
        hamButton.innerHTML = "<strong>三</strong>";
        hamButton.removeEventListener("mouseover", hoverRed);
        hamButton.addEventListener("mouseover", hoverOriginal);
    }
}
function stopHovering() {
    hamButton.style.background = "#FB8500";
}
function hoverRed() {
    hamButton.style.background = "red";
}
function hoverOriginal() {
    hamButton.style.background = "#FFB703";
}
/* js for audio */
const thinkingSound = new Audio("./audio/thinkingSound.m4a");
const thinker = document.querySelector("#thinker");
thinker.addEventListener("click", function() {
    thinkingSound.play();
});
/* js for philosopher profiles */
var dynamicArea = document.querySelector("#dynamicArea");
const addPhilosopher = document.querySelector("#addPhilosopher");
const removePhilosopher = document.querySelector("#removePhilosopher");
const resetArea = document.querySelector("#resetArea");
const philosopher = document.querySelector("#philosopher");
const quote = document.querySelector("#quote");
var selectedProfile = null;
var profileNumber = 0;
addPhilosopher.addEventListener("click", addProfile);
removePhilosopher.addEventListener("click", removeProfile);
resetArea.addEventListener("click", resetProfiles);
dynamicArea.addEventListener("click", selectProfile);
function addProfile() {
    var newProfile = document.createElement("div");
    dynamicArea.appendChild(newProfile);
    newProfile.id = "profile" + profileNumber;
    let filledPhilosopher = philosopher.value;
    let filledQuote = quote.value;
    var newH3 = document.createElement("h3");
    newH3.textContent = filledPhilosopher;
    newProfile.appendChild(newH3);
    var newH4 = document.createElement("h4");
    newH4.textContent = filledQuote;
    newProfile.appendChild(newH4);
    ++profileNumber;
}
function selectProfile(evt) {
    clearProfiles();
    var senderId = evt.target.id;
    selectedProfile = document.querySelector("#" + senderId);
    selectedProfile.style.border = "2px solid #0075FA";
}
function removeProfile() {
    var toRemove = selectedProfile;
    toRemove.remove();
}
function resetProfiles() {
    var currentProfile;
    for (var i = 0; i < profileNumber; ++i) {
        currentProfile = document.querySelector("#profile" + i);
        if (currentProfile != null) {
            currentProfile.remove();
        }
    }
    profileNumber = 0;
}
function clearProfiles() {
    selectedProfile = null;
    var currentProfile;
    for (var i = 0; i < profileNumber; ++i) {
        currentProfile = document.querySelector("#profile" + i);
        currentProfile.style.border = "none";
    }
}
/* js for quiz */
const submitButton = document.querySelector("#submitButton");
const resetButton = document.querySelector("#resetButton");
const scoreBox = document.querySelector("#scoreBox");
const noOfQuestions = 10;
const answers = ["knowledge", "wonder", "rightness", "consequentialism", "action",
    "virtues", "meaning", "facts", "nihilism", "relativism"];
var score = 0;
var wrongAnswers = [];
var removedInputs = [];
var inputParents = [];
submitButton.addEventListener("click", function() {
    score = 0;
    for (var i = 1; i < noOfQuestions + 1; ++i) {
        checkAnswer(i, answers[i - 1]);
    }
    scoreBox.innerHTML = "Score: " + score;
    for (i = 0; i < wrongAnswers.length; ++i) {
        inputParents.push(wrongAnswers[i].parentElement);
        wrongAnswers[i].remove();
        removedInputs.push(wrongAnswers[i]);
    }
});
resetButton.addEventListener("click", function() {
    score = 0;
    scoreBox.innerHTML = "not submitted";
    for (var i = 1; i < noOfQuestions + 1; ++i) {
        var selectedValue = document.querySelector("input[name='q" + i + "']:checked");
        if (selectedValue != null) { // prevent error when first question is not selected
            selectedValue.checked = false;
        }
    }
    for (i = 0; i < wrongAnswers.length; ++i) {
        // inserts the removed input (radio button) back to the left of the label
        inputParents[i].insertBefore(removedInputs[i], inputParents[i].firstChild);
    }
});
function checkAnswer(questionNumber, correctAnswer) {
    var selectedValue = document.querySelector("input[name='q" + questionNumber + "']:checked").value;
    if (selectedValue == correctAnswer) {
        ++score;
    } else {
        var selectedInput = document.querySelector("input[name='q" + questionNumber + "']:checked");
        wrongAnswers.push(selectedInput); // .push() appends to an array
    }
}
/* js for mini game */
// game view management
var view1 = document.querySelector("#view1");
var view2 = document.querySelector("#view2");
var view3 = document.querySelector("#view3");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
var allViews = document.querySelectorAll(".gameView");
function hideAllViews() {
    for (let oneView of allViews) {
        oneView.style.display = "none";
    }
}
function showView(viewNumber) {
    hideAllViews();
    let oneView = document.querySelector("#view" + viewNumber);
    oneView.style.display = "block";
}
button1.addEventListener("click", function() {
    showView(1);
    resetTrolley(1);
});
button2.addEventListener("click", function() {
    showView(2);
    resetTrolley(2);
    resetMan(1);
});
button3.addEventListener("click", function() {
    showView(3);
    resetTrolley(3);
    resetMan(2);
});
hideAllViews();
showView(1);
// the trolley problem
var mobileLayout;
const qrcode = document.querySelector("#qrcode");
// computed style is the style used on the element after all styling sources have been applied
const qrcodeDisplay = window.getComputedStyle(qrcode).display;
if (qrcodeDisplay == "none") {
    mobileLayout = true;
} else {
    mobileLayout = false;
}
spawnDivs("tracks", 1, 11, 1);
spawnDivs("innocent", 1, 7, 1);
var currentTrolley;
const trolley1 = document.querySelector("#trolley1");
const startButton1 = document.querySelector("#startButton1");
const switchButton = document.querySelector("#switchButton");
const resetButton1 = document.querySelector("#resetButton1");
var trolleyItvId;
clearInterval(trolleyItvId);
var leftInc;
var topInc;
if (mobileLayout == true) {
    leftInc = 12.5;
    topInc = 1600;
} else {
    leftInc = 375;
    topInc = 1080;
}
var div1 = document.createElement("div");
view1.appendChild(div1);
startButton1.addEventListener("click", function () {
    trolleyItvId = setInterval(function () {
        moveTrolley(1);
    }, 1000);
});
switchButton.addEventListener("click", function() {
    if (mobileLayout == true) {
        if (leftInc < 212.5) {
            leftInc = 162.5;
            topInc = 1500;
            trolley1.style.left = leftInc + "px";
            trolley1.style.top = topInc + "px";
        }
    } else {
        if (leftInc < 775) {
            leftInc = 675;
            topInc = 900;
            trolley1.style.left = leftInc + "px";
            trolley1.style.top = topInc + "px";
        }
    }
});
resetButton1.addEventListener("click", function() {
    resetTrolley(1);
});
// the fat man
spawnDivs("tracks", 11, 16, 2);
spawnDivs("innocent", 7, 12, 2);
var currentMan;
const startButton2 = document.querySelector("#startButton2");
const pushButton1 = document.querySelector("#pushButton1");
const resetButton2 = document.querySelector("#resetButton2");
var topMargin;
if (mobileLayout == true) {
    topMargin = 1600;
} else {
    topMargin = 1080;
}
var div2 = document.createElement("div");
view2.appendChild(div2);
startButton2.addEventListener("click", function() {
    trolleyItvId = setInterval(function() {
        moveTrolley(2);
    }, 1000);
});
pushButton1.addEventListener("click", function() {
    if (mobileLayout == true) {
        if (leftInc < 112.5) {
            pushMan(1);
        }
    } else {
        if (leftInc < 575) {
            pushMan(1);
        } 
    }
});
resetButton2.addEventListener("click", function() {
    resetTrolley(2);
    resetMan(1);
});
// the fat villain
spawnDivs("tracks", 16, 21, 3);
spawnDivs("innocent", 12, 17, 3);
const startButton3 = document.querySelector("#startButton3");
const pushButton2 = document.querySelector("#pushButton2");
const resetButton3 = document.querySelector("#resetButton3");
var div3 = document.createElement("div");
view3.appendChild(div3);
startButton3.addEventListener("click", function() {
    trolleyItvId = setInterval(function() {
        moveTrolley(3);
    }, 1000);
});
pushButton2.addEventListener("click", function() {
    if (mobileLayout == true) {
        if (leftInc < 112.5) {
            pushMan(2);
        }
    } else {
        if (leftInc < 575) {
            pushMan(2);
        }
    }
});
resetButton3.addEventListener("click", function() {
    resetTrolley(3);
    resetMan(2);
});
function spawnDivs(name, start, end, view) {
    var currentView;
    switch (view) {
        case 1:
            currentView = view1;
            break;
        case 2:
            currentView = view2;
            break;
        case 3:
            currentView = view3;
            break;
        default:
            break;
    }
    for (var i = start; i < end; ++i) {
        var newDiv = document.createElement("div");
        newDiv.id = name + i;
        newDiv.className = name;
        currentView.appendChild(newDiv);
    }
}
function moveTrolley(trolleyNumber) {
    currentTrolley = document.querySelector("#trolley" + trolleyNumber);
    var currentDiv;
    if (trolleyNumber == 1) {
        currentDiv = div1;
    } else if (trolleyNumber == 2) {
        currentDiv = div2;
    } else if (trolleyNumber == 3) {
        currentDiv = div3;
    }
    if (mobileLayout == true) {
        if (topMargin == 1625) {
            if (leftInc > 12.5) {
                clearInterval(trolleyItvId);
                if (trolleyNumber == 2) {
                    div2.textContent = "I can't believe you would do this.";
                } else if (trolleyNumber == 3) {
                    div3.textContent = "He deserves death because he's a villain?";
                }
            }
        }
        if (leftInc < 312.5) {
            leftInc += 50;
            currentTrolley.style.left = leftInc + "px";
        } else {
            clearInterval(trolleyItvId);
            if (topInc == 1600) {
                currentDiv.textContent = "Inaction is a choice too, you know.";
            } else if (trolleyNumber == 1) {
                div1.textContent = "Are human lives just numbers to you?";
            }
        }
    } else {
        if (topMargin == 1130) {
            if (leftInc > 375) {
                clearInterval(trolleyItvId);
                if (trolleyNumber == 2) {
                    div2.textContent = "I can't believe you would do this.";
                } else if (trolleyNumber == 3) {
                    div3.textContent = "He deserves death because he's a villain?";
                }
            }
        }
        if (leftInc < 975) {
            leftInc += 100;
            currentTrolley.style.left = leftInc + "px";
        } else {
            clearInterval(trolleyItvId);
            if (topInc == 1080) {
                currentDiv.textContent = "Inaction is a choice too, you know.";
            } else if (trolleyNumber == 1) {
                div1.textContent = "Are human lives just numbers to you?";
            }
        }
    }
}
function resetTrolley(trolleyNumber) {
    currentTrolley = document.querySelector("#trolley" + trolleyNumber);
    clearInterval(trolleyItvId);
    var currentDiv;
    if (trolleyNumber == 1) {
        currentDiv = div1;
    } else if (trolleyNumber == 2) {
        currentDiv = div2;
    } else if (trolleyNumber == 3) {
        currentDiv = div3;
    }
    currentDiv.textContent = "";
    if (mobileLayout == true) {
        leftInc = 12.5;
        topInc = 1600;
    } else {
        leftInc = 375;
        topInc = 1080;
    }
    currentTrolley.style.left = leftInc + "px";
    currentTrolley.style.top = topInc + "px";
}
function pushMan(manNumber) {
    if (mobileLayout == true) {
        topMargin += 25;
    } else {
        topMargin += 50;
    }
    if (manNumber == 1) {
        currentMan = document.querySelector("#fatMan");
    } else if (manNumber == 2) {
        currentMan = document.querySelector("#fatVillain");
    }
    currentMan.style.top = topMargin + "px";
}
function resetMan(manNumber) {
    if (mobileLayout == true) {
        topMargin = 1600;
    } else {
        topMargin = 1080;
    }
    if (manNumber == 1) {
        currentMan = document.querySelector("#fatMan");
    } else if (manNumber == 2) {
        currentMan = document.querySelector("#fatVillain");
    }
    currentMan.style.top = topMargin + "px";
}
/* js for full screen */
const fullScreenButton = document.querySelector("#fullScreenButton");
const exitScreenButton = document.querySelector("#exitScreenButton");
fullScreenButton.addEventListener("click", function() {
    enterFullScreen();
    fullScreenButton.classList.add("hideButton");
    exitScreenButton.classList.remove("hideButton");
});
exitScreenButton.addEventListener("click", function() {
    exitFullScreen();
    fullScreenButton.classList.remove("hideButton");
    exitScreenButton.classList.add("hideButton");
});
function enterFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
/* easter egg */
const hidden = document.querySelector("#hidden");
hidden.addEventListener("mouseover", function() {
    hidden.classList.remove("fadeOut");
    hidden.style.opacity = "100";
    hidden.classList.add("hiddenRainbow");
});
hidden.addEventListener("mouseout", function() {
    hidden.classList.add("fadeOut");
    hidden.style.opacity = "0";
    hidden.classList.remove("hiddenRainbow");
});
