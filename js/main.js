// CONSTANTS
const lookup = {
    '1' : 'mint',
    '-1' : 'teal',
    'null' : 'black',
    '0': 'black'
}

const mathGrid = [
    -11, -10, -9,
    -1, 0, 1,
    9, 10, 11
]

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
let height = 10;
let width = 10;
let center;



// CACHED EVENTS
let spaces = document.querySelectorAll('td div');
let claimed = document.querySelectorAll('.claimed');
let unclaimed = document.querySelectorAll('.unclaimed');
let message = document.querySelector('h3');
let btn = document.getElementById('reset');
let table = document.querySelector('table');
let deck = document.querySelectorAll('.deck');


// EVENT LISTENERS
btn.addEventListener('click', initialize)
table.addEventListener('click', handleMove)
// claimed.addEventListener('dragstart', dragStart)
// claimed.addEventListener('dragend', dragEnd)

//Loop through unclaimed and call drag events
for(const space of unclaimed) {
    unclaimed.addEventListener('dragover', dragOver);
    unclaimed.addEventListener('dragenter', dragEnter);
    unclaimed.addEventListener('dragleave', dragLeave);
    unclaimed.addEventListener('drop', dragDrop);
}

// FUNCTIONS
initialize();

    // DRAG FUNCTIONS
function dragStart () {
    this.className += ' hold';
    setTimeout(() => this.className = 'invisible', 0)
}

function dragEnd () {
    this.className = 'claimed';
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter() {
    this.className += ' hovered'
}
function dragLeave() {
    this.className = 'unclaimed'
}
function dragDrop() {
    this.className = 'unclaimed'
    this.append(claimed);
}


function handleMove(event) {
    // get the index of the event.target
    let index = parseInt(event.target.id.replace('sq', ''));
    console.log(index)
    // check if the spaces are available
    // if (!space.hasAttribute('class', 'claimed')) { }
        // space can be claimed
    
        // TODO show preview of piece placement (hovered)

    
    // when taken, update state variables (board, turn, winner)

    //change turns
    turn *= -1;

    // check winner, getWinner should return true, false, "T" for tie.
    winner = getWinner(); 
    render();
}





function getWinner() {

}

function pieceBuild (piece, player) {
// create a separate space for generating pieces
    let pieceStage = document.createDocumentFragment();

// create a bounding box for the piece and add its attributes
    let pieceBound = document.createElement('section')
    pieceBound.id = piece + ' ' + player
    pieceBound.draggable = true;

    for (let i = 0; i < piece.length; i++){
    // create a pieceBlock for each piece's array item
        let pieceBlock = document.createElement('div')
        pieceBlock.id = player + i

    // depending on the player listed
        if (player == 0){ 

        // color the block according to the number in the array
            if (piece[i] == 0) {
                pieceBlock.className = 'pHolder'

            } else {
                pieceBlock.className = 'player1'
            }
        } else {
            if (piece[i] == 0) {
                pieceBlock.className = 'pHolder'

            } else {
                pieceBlock.className = 'player2'
            }
        }
    // add blocks to bounding box
        pieceBound.appendChild(pieceBlock)
    }

// add piece to the stage
    pieceStage.appendChild(pieceBound)
// add final piece to respective player's deck
    deck[player].appendChild(pieceStage)
}


function placePiece(index) { 
// depending on where the center of the dragged piece was placed

// set the value of the board spaces corresponding with the piece array 
// but only if the value in the pieces array is 1. 
// Use the mathGrid to determine new index of surrounding blocks 

    for (n in mathGrid) { 
        board[mathGrid[n]] 
        
        if (dragend){
            spaces.setAttribute('class', 'solid')
        }
    }
}

function render() {
    // change HTML squares as board variable changes
    

    // TODO check for winner

}
function rotate() {

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

    

    pieceBuild(pieces.infirmary, 0);
    pieceBuild(pieces.inn, 0);
    pieceBuild(pieces.square, 0);
    pieceBuild(pieces.tavern, 0);

    pieceBuild(pieces.infirmary, 1);
    pieceBuild(pieces.inn, 1);
    pieceBuild(pieces.square, 1);
    pieceBuild(pieces.tavern, 1);


    for (s of spaces) { 
        s.setAttribute('class', 'unclaimed')
    }
}



