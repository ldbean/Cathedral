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
    ],
    inn: [
        0,1,0,
        1,1,0,
        0,0,0
    ],
    inn2: [ 
        0,1,0,
        1,1,0,
        0,0,0
    ],
    tavern:[
        0,0,0,
        0,1,0,
        0,0,0
    ],
    tavern2: [
        0,0,0,
        0,1,0,
        0,0,0
    ],
    stable:  [
        0,1,0,
        0,1,0,
        0,0,0
    ],
    stable2: [
        0,1,0,
        0,1,0,
        0,0,0
    ],
    bridge: [
        0,1,0,
        0,1,0,
        0,1,0
    ],
    manor: [
        0,1,0,
        1,1,1,
        0,0,0
    ],
    academy: [
        0,1,0,
        1,1,0,
        0,1,1
    ],
    castle: [
        1,0,1,
        1,1,1,
        0,0,0
    ],
    tower: [
        0,0,1,
        0,1,1,
        1,1,0
    ],
    abbey: [
        1,0,0,
        1,1,0,
        0,1,0
    ]
};


// STATE VARIABLES
let board;
let turn;
let winner;
let height = 10;
let width = 10;
let center;
let blockPosIndex = [];
let player1Pieces = [];
let player2Pieces = [];
let currentPiece;
let potentialPieces = [];
let player1BlockCount = 0
let player2BlockCount = 0
let pieceNames = Object.keys(pieces);
console.log(pieceNames)


// CACHED EVENTS
let spaces = document.querySelectorAll('td div');
let available = document.querySelectorAll('.available');
let message = document.querySelector('h3');
let btn = document.getElementById('reset');
let boardVis = document.querySelector('#board');
let deck = document.querySelectorAll('.deck');
let aside = document.querySelector('aside')
let p1deck = document.querySelector('#player1')
let p2deck = document.querySelector('#player2')

// EVENT LISTENERS
btn.addEventListener('click', initialize)
aside.addEventListener('dragstart', dragStart)
aside.addEventListener('dragend', dragEnd)
boardVis.addEventListener('dragover', dragOver);
boardVis.addEventListener('dragenter', dragEnter);
boardVis.addEventListener('dragleave', dragLeave);
aside.addEventListener('click', rotate);
aside.addEventListener('dragstart', function(e) {
    console.log(e.target)
    currentPiece = e.target.id;
    console.log(`currentPiece set to ${currentPiece}`)
})
boardVis.addEventListener('drop', handleMove)


                                                                           
// FUNCTIONS
initialize();
function pieceBuild (building, player) {
    let thisPiece = document.getElementById(building)
    if (player == 1) { 
        if (p1deck.contains(thisPiece)){
            thisPiece.remove()
        }
    } else {
        if (p2deck.contains(thisPiece)){
            thisPiece.remove()
        }
    }
    
    // let pieceN = building.replace('piece.', '')
    console.log({building})
    
    console.log(pieces[building])
    // create a separate space for generating
    let pieceStage = document.createDocumentFragment();
// create a bounding box for the building and add its attributes
    let pieceBound = document.createElement('div')
    pieceBound.draggable = true;
    pieceBound.className = 'drag'
    pieceBound.className += ' '
    
    for (let i = 0; i < 9; i++){
    // create a pieceBlock for each building's array item
        let pieceBlock = document.createElement('div')
        pieceBlock.id = i
    // depending on the player listed
        if (player == 1){ 
        // color the block according to the number in the array
            if (pieces[building][i] == 0) {
                pieceBlock.className = 'pHolder'
            } else {
                pieceBlock.className = 'player1'
                player1BlockCount += 1
            }
        } else {
            if (pieces[building][i] == 0) {
                pieceBlock.className = 'pHolder'
            } else {
                pieceBlock.className = 'player2'
                player2BlockCount += 1
            }
        }
    // add blocks to bounding box
        pieceBound.appendChild(pieceBlock)
    }
    // add building to the stage
    pieceStage.append(pieceBound)
    pieceBound.id = building
    // add final building to respective player's deck
    deck[player - 1].appendChild(pieceStage)
};

   
function handleMove(event) {
    // get the index of the event.target
    let index = parseInt(event.target.id.replace('sq', ''));
    // current item being dragged 
  
    console.log({index})
    console.log(`currentPiece ${currentPiece}`)
    for (b = 0; b < pieces[currentPiece].length; b++) {
        console.log('beep')
        if (pieces[currentPiece][b] == '1') {
            blockPosIndex.push(mathGrid[b])
        }
    }

    console.log(`blockPos set for ${currentPiece}`)

    placePiece(index);
    console.log('turn ' + turn)
    // check winner, getWinner should return true, false, "T" for tie.
    winner = getWinner(); 
    blockPosIndex = [];
}

function placePiece(index) { 
    // Loop through the blocks positions on the board based on the event.target
    for(let n = 0; n < blockPosIndex.length; n++){     
    // surrounding and including the index (in the shape of the piece selected) are not null
        if (board[index + blockPosIndex[n]] != null || event.target.nextElementSibling.className == 'border' || event.target.previousElementSibling.className == 'border') { 
            console.log(`can't place at board[${index}]`)
            return;
        }
    }
    for(let n = 0; n < blockPosIndex.length; n++) { 
        spaces[index + blockPosIndex[n]].style.backgroundColor = lookup[turn]
        spaces[index + blockPosIndex[n]].className = "claimed";
        board[index + blockPosIndex[n]] = turn
    }
    turn *= -1;
    // if (turn === ) {
    //     // set other player'spieces to not dragable if it's not the player's turn
    // } else {
    //     
    // }

}
function rotate (e) { 
//     let rotateThisPiece = e.target.parentNode.id;
//     let thisPlayer = e.target.parentNode.parentNode.id.replace('player', '')
//     for (p = 0; p < pieces[rotateThisPiece].length; p++) {
//         pieces[rotateThisPiece][p] = pieces[rotateThisPiece][p + rotateIndex[p]]    
//         // .splice(p + rotateIndex[p], 1, pieces[rotateThisPiece][p])
//         console.log(rotateIndex[p])
//     }
//     pieceBuild(rotateThisPiece, thisPlayer)
//     console.log(currentPiece)   
}


 // DRAG FUNCTIONS
function dragStart (e) {
    console.log("start")
    e.target.className += ' hold'
    setTimeout(() => (e.target.className = 'invisible'), 0)
}
function dragEnd (e) {

    
}
function dragOver(e) {
    
    e.preventDefault();
    if(this.class == 'available'){
        this.classList.append(' hover')
    }
    
}
function dragEnter() {

}
function dragLeave() {
    if (this.classList.contains('claimed')) {
        this.className = 'available'
    }
}
function dragDrop() {
    // this.append(claimed);
    e.target.className = 'invisible'
}



function getWinner() {
    // for all the pieces in each player's deck
    for(p in player1Pieces){
        // loop through the blocks in each piece and add it to the block count
        for (b = 0; b < pieces[currentPiece].length; b++) {
            if (pieces[currentPiece][b] == '1') {
                player1BlockCount++;
            }
        }
        //  
        for(let n = 0; n < blockPosIndex.length; n++) { 
            for(s in board) {
                if (board[s + blockPosIndex[s]] == null) {

                }
            }
        }
    // if no index and its surrounding spaces can fit any remaining(or their rotations
    }
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
        null, null, null, null, null, null, null, null, null, null, 
        0,0,0,0,0,0,0,0,0
       
    ];
    turn = 1;
    winner = null;

    pieceBuild('infirmary', 2);
    pieceBuild('inn', 2);
    pieceBuild('inn2', 2);
    pieceBuild('square', 2);
    pieceBuild('tavern', 2);
    pieceBuild('tavern2', 2);
    pieceBuild('abbey', 2);
    pieceBuild('bridge', 2);
    pieceBuild('academy', 2);
    pieceBuild('castle', 2);
    pieceBuild('tower', 2);
    pieceBuild('stable', 2);
    pieceBuild('stable2', 2);
    pieceBuild('manor', 2);
    

    pieceBuild('infirmary', 1);
    pieceBuild('inn', 1);
    pieceBuild('inn2', 1);
    pieceBuild('square', 1);
    pieceBuild('tavern', 1);
    pieceBuild('tavern2', 1);
    pieceBuild('abbey', 1);
    pieceBuild('bridge', 1);
    pieceBuild('academy', 1);
    pieceBuild('castle', 1);
    pieceBuild('tower', 1);
    pieceBuild('stable', 1);
    pieceBuild('stable2', 1);
    pieceBuild('manor', 1);
}



