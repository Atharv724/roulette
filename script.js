let balance = 1000;
const balanceDisplay = document.getElementById('balance-display');
const setBalanceButton = document.getElementById('set-balance');
const startingBalanceInput = document.getElementById('starting-balance');
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');
let selectedBet = '';
let betAmount = 10;

// Set the initial balance
setBalanceButton.addEventListener('click', () => {
    balance = parseInt(startingBalanceInput.value);
    updateBalanceDisplay();
});

// Update the balance display
function updateBalanceDisplay() {
    balanceDisplay.textContent = `Balance: $${balance}`;
}

// Select a bet
document.querySelectorAll('.bet-options button').forEach(button => {
    button.addEventListener('click', () => {
        selectedBet = button.getAttribute('data-bet');
        document.querySelectorAll('.bet-options button').forEach(btn => {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');
    });
});

// Spin the wheel
spinButton.addEventListener('click', () => {
    betAmount = parseInt(document.getElementById('bet-amount').value);

    if (betAmount > balance) {
        alert('Insufficient balance for this bet!');
        return;
    }

    if (!selectedBet) {
        alert('Please place a bet before spinning the wheel!');
        return;
    }

    const spinResult = Math.floor(Math.random() * 37); // 0-36 on a roulette wheel
    const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(spinResult);
    const isBlack = !isRed && spinResult !== 0;

    let resultText = `The ball landed on ${spinResult}. `;

    let winnings = 0;

    if (selectedBet === 'red' && isRed) {
        winnings = betAmount * 2;
        resultText += `You won by betting on Red! You won $${winnings}`;
    } else if (selectedBet === 'black' && isBlack) {
        winnings = betAmount * 2;
        resultText += `You won by betting on Black! You won $${winnings}`;
    } else if (selectedBet === 'odd' && spinResult % 2 !== 0 && spinResult !== 0) {
        winnings = betAmount * 2;
        resultText += `You won by betting on Odd! You won $${winnings}`;
    } else if (selectedBet === 'even' && spinResult % 2 === 0 && spinResult !== 0) {
        winnings = betAmount * 2;
        resultText += `You won by betting on Even! You won $${winnings}`;
    } else if (selectedBet === '1-18' && spinResult >= 1 && spinResult <= 18) {
        winnings = betAmount * 2;
        resultText += `You won by betting on 1-18! You won $${winnings}`;
    } else if (selectedBet === '19-36' && spinResult >= 19 && spinResult <= 36) {
        winnings = betAmount * 2;
        resultText += `You won by betting on 19-36! You won $${winnings}`;
    } else if (selectedBet === 'number') {
        const numberBet = parseInt(document.getElementById('number-bet').value);
        if (numberBet === spinResult) {
            winnings = betAmount * 35;
            resultText += `You won by betting on ${numberBet}! You won $${winnings}`;
        } else {
            resultText += `You lost this round.`;
            winnings = -betAmount;
        }
    } else {
        resultText += `You lost this round.`;
        winnings = -betAmount;
    }

    balance += winnings;
    updateBalanceDisplay();
    resultDisplay.textContent = resultText;

    // Reset bet selection
    selectedBet = '';
    document.querySelectorAll('.bet-options button').forEach(btn => {
        btn.classList.remove('selected');
    });
});
