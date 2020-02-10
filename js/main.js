// CONSTANTS
const lookup = {
    '1' : 'mint',
    '-1' : 'teal',
    'null' : 'black',
    '0': 'black'
}

// PIECES
const pieces = { 
    infirmary: [
        0, 1, 0,
        1, 1, 1,
        0, 1, 0
    ],
                    
    square: [
        0, 0, 0,
        0, 1, 1,
        0, 1, 1
    ],

    inn: [
        0, 1, 0,
        1, 1, 0,
        0, 0, 0
    ],

    tavern: [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ]
}


// STATE VARIABLES
let board;
let turn;
let winner;
let occupiedSpaces = [];
let height = 10;
let width = 10;
let center;



// CACHED EVENTS
let spaces = document.querySelectorAll('td div');
let message = document.querySelector('h3');
let btn = document.getElementById('reset');
let table = document.querySelector('table');
let deck = document.querySelectorAll('.deck');
let pieceContainer = document.createElement('div')
pieceContainer.setAttribute('draggable', 'true')


// EVENT LISTENERS
// btn.addEventListener('click', initialize)
table.addEventListener('click', handleMove)
// space.addEventListener('mouseup', displayPiece)


// FUNCTIONS
initialize();
function handleMove(event) {
    // get the index of the event.target
    let index = parseInt(event.target.id.replace('sq', ''));
    console.log(index)
    // check if the spaces are available
    // if (!space.hasAttribute('class', 'occupied')) { }
        // space can be occupied
    
        // TODO show preview of piece placement
 
        // don't show preview

    
    // when taken, update state variables (board, turn, winner)

    //change turns
    turn *= -1;

    // check winner, getWinner should return true, false, "T" for tie.
    winner = getWinner(); 
    render();
}


function getWinner() {

}


function displayPiece (piece, player) {
    let container = deck[player].appendChild(pieceContainer.cloneNode())
    let piecePart = document.createElement('div')
    for (let i = 0; i <= piece.length; i++){
        container.append(piecePart.cloneNode())

        if (piece[i] == 0) {
            piecePart.setAttribute('class', 'pHolder')

        } else {
            piecePart.setAttribute('class', 'solid')
        }
    }
}
console.log(pieces.infirmary.length)







function placePiece(i,j) { 
    for (let x = 0; x < board.length; x++){
        for(let y = 0; y < board[x].length; y++) {
            
        }
    }
}

function render() {
    // change HTML squares as board variable changes
    

    // TODO check for winner

}
function initialize() {
    board = [  
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ];
    turn = 1;
    winner = null;
    render();
    displayPiece(pieces.infirmary, 0);
    displayPiece(pieces.inn, 0);
    displayPiece(pieces.square, 0);
    displayPiece(pieces.tavern, 0);

    displayPiece(pieces.infirmary, 1);
    displayPiece(pieces.inn, 1);
    displayPiece(pieces.square, 1);
    displayPiece(pieces.tavern, 1);
}



