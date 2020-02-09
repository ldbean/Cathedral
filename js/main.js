// CONSTANTS

const lookup = {
    '1' : 'mint',
    '-1' : 'teal',
    'null' : 'black'
}


// STATE VARIABLES
let board;
let turn;
let winner;
let occupiedSpaces = [];
let height = 10;
let width = 10;

// PIECES

const pieces = { 
    infirmary: [
        [0, 1, 0]
        [1, 1, 1]
        [0, 1, 0]
    ],
                    
    square: [
        [0, 0, 0]
        [0, 1, 1]
        [0, 1, 1]
    ],

    inn: [
        [0, 1, 0]
        [1, 1, 0]
        [0, 0, 0]
    ],

    tavern: [
        [0, 0, 0]
        [0, 1, 0]
        [0, 0, 0]
    ]

}

// CACHED EVENTS
let space = document.querySelectorAll('td div');
let message = document.querySelector('h3');
let btn = document.getElementById('reset');
let table = document.querySelector('table');

// EVENT LISTENERS
btn.addEventListener('click', initialize)
table.addEventListener('click', handleMove)
space.addEventListener('mouseenter', displayPiece)

// FUNCTIONS
initialize();
function handleMove(event) {
    // get the index of the event.target
    let index = parseInt(event.target.id.replace('sq', ''));

    // check if the spaces are available
    if (space.hasAttribute('class', 'occupied'))
        // show preview of piece placement

    // when taken, update state variables (board, turn, winner)
    board[index] = turn;

    //change turns
    turn *= -1;

    // check winner, getWinner should return true, false, "T" for tie.
    winner = getWinner(); 
    render();
}

function getWinner() {

}


function displayPiece () {
    let currentPiece = playerChoice;
    let center = Math.floor(width / 2);
    let piece = pieces[currentPiece];
    let location = [center, 0];

    currentPiece = {
        piece: piece,
        color: colors[randomColor],
        location: location,
        indexes: getBlockNumbers(shape, location)
    };
}

}
function render() {
    // change HTML squares as board variable changes
    

    // TODO check for winner

}

function initialize() {
    board = [  
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
        [null, null, null, null, null, null, null, null, null, null]
    ];
    turn = 1;
    winner = null;
    render();
}




