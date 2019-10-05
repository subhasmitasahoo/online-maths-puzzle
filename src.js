var operatorList = ['+', '-', '*'];
var timeLimit = 15;
var successCount = 0;
var failedCount = 0;
var missedCount = 0;
var totalCount = 0;
var isGameOn = false;
var answer = 0;
var isMissed = true;
updateTimerUI = () => {
    document.getElementById('timerVal').innerText = timeLimit;
    timeLimit--;
}

startTheGame = (event) => {
    isGameOn = true;
    timeLimit = 15;

    resetScore();
    buildEquation();

    var timer = setInterval(function() {
        updateTimerUI();
        if(timeLimit < 0) {
            isGameOn = false;
            resetEquation();
            clearInterval(timer);
            updateMissedCount();
        }
    }, 1000);
};

buildEquation = () => {
    isMissed = true;
    let op1 = getRandomNumber(0, 100);
    let op2 = getRandomNumber(0, 100);

    let operatorIndex = getRandomNumber(0, operatorList.length-1);
    console.log("op index" + operatorIndex);
    let operator = operatorList[operatorIndex];

    document.getElementById('firstVar').innerText = op1;
    document.getElementById('secondVar').innerText = op2;
    document.getElementById('operator').innerText = operator;

    switch(operator) {
        case '+':
            answer = op1 + op2;
            break;
        case '-':
            answer = op1 - op2;
            break;
        case '*':
            answer = op1 * op2;
            break;
        case '/':
            answer = op1 / op2;
            break;
    }

    let optionList = generateRandomNumbers(6, answer);
    let randomIndex = getRandomNumber(0, 5);
    optionList[randomIndex] = answer;

    populateOptionListInUI(optionList);
    updateTotalCount();
}

populateOptionListInUI = (optionList) => {
    console.log(optionList);
    var optionUIList = document.querySelectorAll('.option');
    for(let i in optionUIList) {
        optionUIList[i].innerText = optionList[i];
    }
} 

getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

generateRandomNumbers = (num, target) => {
    let result = [];
    console.log("num "+ num);
    console.log("target "+ target);
    for(let i=0; i<num; i++) {
        console.log("yo");
        result.push(getRandomNumber(0, target+100));
    }
    return result;
}

resetTheGame = (event) => {
    isGameOn = false;
    resetEquation();
    resetScore();
    resetTimer();
}

resetTimer = () => {
    document.getElementById('timerVal').innerText = "_";
}

resetEquation = () => {
    document.getElementById('firstVar').innerText = "_";
    document.getElementById('secondVar').innerText = "_";
    document.getElementById('operator').innerText = "_";
    resetOptionListInUI();
}

resetScore = () => {
    successCount = 0;
    failedCount = 0;
    missedCount = 0;
    totalCount = 0;
    document.getElementById("successCount").innerText = 0;
    document.getElementById("failedCount").innerText = 0;
    document.getElementById("missedCount").innerText = 0;
    document.getElementById("totalCount").innerText = 0;
}

resetOptionListInUI = () => {
    var optionUIList = document.querySelectorAll('.option');
    for(let i in optionUIList) {
        optionUIList[i].innerText = "";
    }
}

updateFailedCount = () => {
    failedCount++;
    document.getElementById("failedCount").innerText = failedCount;
}

updateSuccessCount = () => {
    successCount++;
    document.getElementById("successCount").innerText = successCount;
}

updateMissedCount = () => {
    // missedCount++;
    missedCount = totalCount - (successCount + failedCount);
    document.getElementById("missedCount").innerText = missedCount;
}

updateTotalCount = () => {
    // missedCount++;
    totalCount++;
    document.getElementById("totalCount").innerText = totalCount;
}

validateOption = (target) => {
    console.log(target);
    if(isGameOn) {
        isMissed = false;
    }
    if(!isGameOn || (target.innerText != answer)) {
        target.innerText = "Wrong";
        if(isGameOn) {
            updateFailedCount();
        }
    } else {
        target.innerText = "Correct";
        updateSuccessCount();
    }
    if(isGameOn) {
        setTimeout(buildEquation, 1000);
    }
}