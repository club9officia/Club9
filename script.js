let selectedNumber = null;
let lastResults = [];
let balance = 100;
let countdown = 5;
let betPhase = true;

function sendOTP() {
    alert("OTP sent to your phone!");
}

function verifyOTP() {
    alert("OTP verified! Logging in...");
    document.getElementById("login-page").style.display = "none";
    document.getElementById("betting-page").style.display = "block";
}

function selectNumber(num) {
    if (!betPhase) {
        alert("Betting is closed! Wait for the next round.");
        return;
    }
    selectedNumber = num;
    alert(`You selected number ${num}`);
}

function placeBet() {
    if (!betPhase) {
        alert("Betting is closed! Wait for the next round.");
        return;
    }

    let amount = parseInt(document.getElementById("bet-amount").value);
    if (!selectedNumber || amount < 10 || amount > balance) {
        alert("Select a number and bet a valid amount (min ₹10)!");
        return;
    }

    balance -= amount;
    document.getElementById("balance").innerText = balance;
    alert(`Bet placed on ${selectedNumber} with ₹${amount}`);
}

// Auto Countdown Timer
function startCountdown() {
    let timer = setInterval(() => {
        countdown--;
        document.getElementById("countdown").innerText = countdown;

        if (countdown === 0) {
            if (betPhase) {
                betPhase = false;
                document.getElementById("bet-button").disabled = true;
                document.getElementById("timer").innerText = "Processing result...";
                setTimeout(determineWinningNumber, 5000);
                countdown = 5;
            } else {
                betPhase = true;
                document.getElementById("bet-button").disabled = false;
                document.getElementById("timer").innerText = "Betting closes in: ";
                countdown = 5;
            }
        }
    }, 1000);
}

function determineWinningNumber() {
    let leastBetNumber = Math.floor(Math.random() * 10);
    document.getElementById("winning-number").innerText = `Last Winning Number: ${leastBetNumber}`;
}

window.onload = startCountdown;