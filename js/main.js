// CONSTANTS
const lookup = {
    '1' : 'rgb(149, 245, 229)',
    '-1' : 'rgb(60, 109, 213)',
    'null' : 'black',
    '0': 'black'
}

const mathGrid = [
    -11, -10, -9,
    -1, 0, 1,
    9, 10, 11
]

const rotateIndex = [
    2, 4, 6, 
    -2, 0, 2,
    -6, -4, -2
];

// PIECES
const pieces = { 
    infirmary: [
        0, 1, 0,
        1, 1, 1,
        0, 1, 0
    ],
                    
    square: [
        1, 1, 0,
        1, 1, 0,
        0, 0, 0
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
let blockPositioner = [];
let player1Pieces = [];
let player2Pieces = [];
let currentPiece;



// CACHED EVENTS
let spaces = document.querySelectorAll('td div');
let drag = document.querySelectorAll('.drag');
let available = document.querySelectorAll('.available');
let message = document.querySelector('h3');
let btn = document.getElementById('reset');
let boardVis = document.querySelector('#board');
let deck = document.querySelectorAll('.deck');
let aside = document.querySelector('aside')

// TODO How do I store the current piece being dragged in a variable?

// EVENT LISTENERS
btn.addEventListener('click', initialize)
boardVis.addEventListener('drop', handleMove)
aside.addEventListener('click', rotate)

// FUNCTIONS
initialize();
function checkIfClaimed(event) {

}


aside.addEventListener('dragstart', dragStart)
aside.addEventListener('dragend', dragEnd)


boardVis.addEventListener('dragover', dragOver);
boardVis.addEventListener('dragenter', dragEnter);
boardVis.addEventListener('dragleave', dragLeave);


function handleMove(event) {
    // get the index of the event.target
    let index = parseInt(event.target.id.replace('sq', ''));
    // current item being dragged
    console.log(index)
    console.log(`currentPiece ${currentPiece}`)
    placePiece(index);
    for (b = 0; b < pieces.infirmary.length; b++) {
        if (pieces.infirmary[b] == '1') {
            blockPositioner.push(mathGrid[b])
        }
    }


    console.log('turn ' + turn)

    // check winner, getWinner should return true, false, "T" for tie.
    winner = getWinner(); 
    render();
}

function pieceBuild (building, player) {
// create a separate space for generating pieces
    let pieceStage = document.createDocumentFragment();

// create a bounding box for the building and add its attributes
    let pieceBound = document.createElement('div')
    pieceBound.draggable = true;
    pieceBound.className = 'drag'

    for (let i = 0; i < building.length; i++){
    // create a pieceBlock for each building's array item
        let pieceBlock = document.createElement('div')
        pieceBlock.id = player + i

    // depending on the player listed
        if (player == 0){ 

        // color the block according to the number in the array
            if (building[i] == 0) {
                pieceBlock.className = 'pHolder'

            } else {
                pieceBlock.className = 'player1'
            }
        } else {
            if (building[i] == 0) {
                pieceBlock.className = 'pHolder'

            } else {
                pieceBlock.className = 'player2'
            }
        }
        // add blocks to bounding box
        pieceBound.appendChild(pieceBlock)
    }
    // add building to the stage
    pieceStage.appendChild(pieceBound)
    // add final building to respective player's deck
    deck[player].appendChild(pieceStage)
};

 // DRAG FUNCTIONS
function dragStart () {
    console.log("start")
    currentPiece = event.target
    return currentPiece;
}
function dragEnd () {
    console.log("end")

}
function dragOver(e) {
    console.log('dragging over')
    e.preventDefault();
  
}
function dragEnter() {
    console.log('enter')
}
function dragLeave() {
    if (this.classList.contains('claimed')) {
        this.className = 'available'
    }
}
function dragDrop() {
    // this.append(claimed);
   
}

function placePiece(index) { 
// Loop through the blocks positions on the board based on the event.target
    for(let n = 0; n < blockPositioner.length; n++){     
    // surrounding and including the index (in the shape of the piece selected) are not null
        if (board[index + blockPositioner[n]] != null) { 
            console.log(`can't place`)
            return;
        }
    }
    for(let n = 0; n < blockPositioner.length; n++) { 
        spaces[index + blockPositioner[n]].style.backgroundColor = lookup[turn]
        spaces[index + blockPositioner[n]].className = "claimed";
        board[index + blockPositioner[n]] = turn
    }
    turn *= -1;
}

function render() {
    // change HTML squares as board variable changes
    

}

function rotate(target) {
    for (p = 0; p < target.length; i++) {
        target[p] = target[p + rotateIndex[p]]
    }
    console.log(target)
}




function getWinner() {

}

function initialize() {
    board = [  
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null
    ];
    turn = 1;
    winner = null;

    pieceBuild(pieces.infirmary, 0);
    pieceBuild(pieces.inn, 0);
    pieceBuild(pieces.square, 0);
    pieceBuild(pieces.tavern, 0);

    pieceBuild(pieces.infirmary, 1);
    pieceBuild(pieces.inn, 1);
    pieceBuild(pieces.square, 1);
    pieceBuild(pieces.tavern, 1);


}



