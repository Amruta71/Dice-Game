let totalScore = 0;
let diceScores = { dice1: 0, dice2: 0, dice3: 0 };

document.getElementById('rollButton').addEventListener('click', rollDice);

function rollDice() {
    // Remove any previous bounce effects from dice
    document.querySelectorAll('.dice').forEach(dice => {
        dice.classList.remove('bounce');
    });

    // Start roll animation
    document.querySelectorAll('.dice').forEach(dice => {
        dice.classList.add('roll');
    });

    setTimeout(() => {
        // Random dice values
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const dice3 = Math.floor(Math.random() * 6) + 1;

        // Update images based on roll values
        document.getElementById('dice1').src = `dice${dice1}.png`;
        document.getElementById('dice2').src = `dice${dice2}.png`;
        document.getElementById('dice3').src = `dice${dice3}.png`;

        // Update scores and determine winners
        updateScores(dice1, dice2, dice3);

        // Remove the roll animation class
        document.querySelectorAll('.dice').forEach(dice => {
            dice.classList.remove('roll');
        });

        // Apply the bounce effect to the winning dice
        setTimeout(() => {
            applyBounceEffect(dice1, dice2, dice3);
        }, 100); // Short delay to start bounce effect after roll animation

    }, 500);  // Duration of the roll animation
}

function updateScores(dice1, dice2, dice3) {
    // Update individual dice scores
    diceScores.dice1 += dice1;
    diceScores.dice2 += dice2;
    diceScores.dice3 += dice3;

    // Update total score
    totalScore += dice1 + dice2 + dice3;

    // Determine the highest roll value
    let maxDiceValue = Math.max(dice1, dice2, dice3);
    let winningDice = [];
    if (dice1 === maxDiceValue) winningDice.push("dice1");
    if (dice2 === maxDiceValue) winningDice.push("dice2");
    if (dice3 === maxDiceValue) winningDice.push("dice3");

    // Display the winner message
    const winningDiceNames = winningDice.map(dice => dice.replace("dice", "Dice "));
    document.getElementById('winnerMessage').textContent = `${winningDiceNames.join(' and ')} win(s) this round!`;

    // Update total and individual scores on the page
    document.getElementById('totalScore').textContent = `${totalScore}`;
    document.getElementById('dice1Score').textContent = `${diceScores.dice1}`;
    document.getElementById('dice2Score').textContent = `${diceScores.dice2}`;
    document.getElementById('dice3Score').textContent = `${diceScores.dice3}`;
}

function applyBounceEffect(dice1, dice2, dice3) {
    // Get the max value to determine winning dice
    const maxDiceValue = Math.max(dice1, dice2, dice3);

    // Apply bounce effect to winning dice only
    if (dice1 === maxDiceValue) document.getElementById('dice1').classList.add('bounce');
    if (dice2 === maxDiceValue) document.getElementById('dice2').classList.add('bounce');
    if (dice3 === maxDiceValue) document.getElementById('dice3').classList.add('bounce');
}
