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
/* js for mini game */
// game view management
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
    resetTrolley();
});
button2.addEventListener("click", function() {
    showView(2);
});
button3.addEventListener("click", function() {
    showView(3);
});
hideAllViews;
showView(1);
// the trolley problem
var currentTrolley;
const trolley1 = document.querySelector("#trolley1");
const startButton1 = document.querySelector("#startButton1");
const switchButton = document.querySelector("#switchButton");
const resetButton1 = document.querySelector("#resetButton1");
var trolleyItvId;
clearInterval(trolleyItvId);
var leftInc = 375;
var topInc = 1000;
var div1 = document.createElement("div");
view1.appendChild(div1);
startButton1.addEventListener("click", function () {
    trolleyItvId = setInterval(function () {
        moveTrolley(1);
    }, 1000);
});
switchButton.addEventListener("click", function() {
    if (leftInc < 975) {
        leftInc = 675;
        topInc = 800;
        trolley1.style.left = leftInc + "px";
        trolley1.style.top = topInc + "px";
    }
});
resetButton1.addEventListener("click", function() {
    resetTrolley(1);
});
// the fat man
const trolley2 = document.querySelector("#trolley2");
const startButton2 = document.querySelector("#startButton2");
const pushButton1 = document.querySelector("#pushButton1");
const resetButton2 = document.querySelector("#resetButton2");
var div2 = document.createElement("div");
view2.appendChild(div2);
function resetTrolley(trolleyNumber) {
    currentTrolley = document.querySelector("#trolley" + trolleyNumber);
    clearInterval(trolleyItvId);
    div1.textContent = "";
    leftInc = 375;
    topInc = 1000;
    currentTrolley.style.left = leftInc + "px";
    currentTrolley.style.top = topInc + "px";
}
function moveTrolley(trolleyNumber) {
    currentTrolley = document.querySelector("#trolley" + trolleyNumber);
    if (leftInc < 975) {
        leftInc += 100;
        currentTrolley.style.left = leftInc + "px";
    } else {
        clearInterval(trolleyItvId);
        if (topInc == 1000) {
            div1.textContent = "Inaction is a choice too, you know.";
        } else if (trolleyNumber == 1) {
            div1.textContent = "Are human lives just numbers to you?";
        }
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