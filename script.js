'use strict';

const max_points = 100;

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')


score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let playing = true;

let diceVal = 0;
let scores = [0, 0];
let current = 0;
let playerTurn = 0;

btnRoll.addEventListener('click', function () {
    if (!playing) return;
    diceVal = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceVal}.png`;

    if (diceVal == 1) {
        current = 0
        document.getElementById(`current--${playerTurn}`).textContent = current;
        playerTurn = (playerTurn + 1) % 2;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
        return;
    }
    current += diceVal;
    document.getElementById(`current--${playerTurn}`).textContent = current;
})

btnHold.addEventListener('click', function () {
    if (!playing) return;
    scores[playerTurn] += current;
    current = 0;
    document.getElementById(`current--${playerTurn}`).textContent = current;
    document.getElementById(`score--${playerTurn}`).textContent = scores[playerTurn];

    if (scores[playerTurn] >= max_points) {
        playing = false;
        console.log(`winner is player ${playerTurn}`);
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${playerTurn}`).classList.add('player--winner');
        document.querySelector(`.player--${playerTurn}`).classList.remove('player--active');
    }
    else {
        playerTurn = (playerTurn + 1) % 2;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
    }
})

btnNew.addEventListener('click', function () {
    scores = [0, 0];
    current = 0;
    const x = 1;
    if (x == 1) {
        score0El.textContent = scores[0];
        score1El.textContent = scores[1];

        current0El.textContent = current;
        current1El.textContent = current;

        diceVal = 0;
        playing = true;
        diceEl.classList.add('hidden');
        player0El.classList.add('player--active');
        player1El.classList.remove('player--active');
        player0El.classList.remove('player--winner');
        player1El.classList.remove('player--winner');

        playerTurn = 0;
    }
})