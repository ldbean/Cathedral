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



// CACHED EVENTS
let spaces = document.querySelectorAll('td div');
let drag = document.querySelectorAll('.drag');
let available = document.querySelectorAll('.available');
let message = document.querySelector('h3');
let btn = document.getElementById('reset');
let table = document.querySelector('table');
let deck = document.querySelectorAll('.deck');
let aside = document.querySelector('aside')

// TODO How do I store the current piece being dragged in a variable?

// EVENT LISTENERS
btn.addEventListener('click', initialize)
table.addEventListener('click', handleMove)

// FUNCTIONS
initialize();
function checkIfClaimed(event) {

}

// drag.forEach(item => {
//     item.addEventListener('dragstart', dragStart)
//     item.addEventListener('dragend', dragEnd)
// });

// Loop through available and call drag events
// for(const s of available) {
//     s.addEventListener('dragover', dragOver);
//     s.addEventListener('dragenter', dragEnter);
//     s.addEventListener('dragleave', dragLeave);
//     s.addEventListener('drop', dragDrop);
//     console.log(s)
// }


// function setClaimedColor (player, index) {
//     for (let i = 0; i < spaces.length; i++) {
//         if (board[index] = player){
//             spaces[i].style.backgroundColor = lookup[player]
//             console.log(lookup[player])
//         } 
//     }
// }

// console.log(spaces[1])
// spaces[2].className = 'claimed'
// setClaimedColor(1)
// console.log(spaces)

function handleMove(event) {
    // get the index of the event.target
    let index = parseInt(event.target.id.replace('sq', ''));
    let currentPiece = // current item being dragged
    console.log(index)
    console.log(board[index])
    
   // loop through the math grid (or the SELECTED PIECE'S array,)
    // for(let n = 0; n < mathGrid.length; n++) {

    //     //  TODO: if the SELECETED PIECE's block at position n is a '1'
    //     if (pieces.infirmary[n] == '1') { 
    //         console.log('block ' + n)

    //         // loop through again
    //         for (let i = 0; i < mathGrid.length; i++) {

    //             // and if the space is empty
    //             if (board[index + mathGrid[i]] == null){ 
    //                 console.log('test')
    //                 // update board state on event
    //                 board[index + mathGrid[n]] = turn

    //                 for(let j = 0; j < board.length; j++) { 
    //                     if (board[j] != null && board[j] == turn) { 
    //                         spaces[j].style.backgroundColor = lookup[turn]
    //                         console.log(board[j])
    //                     }
    //                 }
            
    //             } else {
    //                 console.log(`can't place block`)
    //             }
    //         }
    //     }
        
    // }

    // Loop through the 9 spaces around index
    for(let n = 0; n < mathGrid.length; n++){ 
        // If any of the spaces surrounding the index (in the shape of the piece selected) are not null
        if (board[index + mathGrid[n]] != null) {
            // return
            return `space taken`;
        } else { 
            // loop through the spaces again
            for(let i = 0; i < mathGrid.length; i++) {
                // if the selected piece at the loop position is 1
                if(pieces.infirmary[i] == '1'){
                    // update the board to match the turn
                    spaces[index + mathGrid[i]].style.backgroundColor = lookup[turn]
                    
                    board[index + mathGrid[n]] = turn
                }
            }
        }
    }

    // for(let j = 0; j < board.length; j++) {
    //     if(board[j] == turn){
    //         spaces[j].style.backgroundColor = lookup[turn]
    //     }

    // }


    console.log(board)
    console.log('turn ' + turn)

    //change turns
    turn *= -1;

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
    this.className += ' hold';
    setTimeout(() => this.className = 'invisible', 0)
    console.log("start")
}
function dragEnd () {
    if (this.classList.contains('claimed')){
        console.log("cant place here!")
    } else { 
        this.className = 'claimed'; 
    }
    console.log("end")
}
function dragOver(e) {
    console.log('dragging start')
    e.preventDefault();
    let index = parseInt(this.id.replace('sq', ''));
    console.log(index)
}
function dragEnter() {
    this.className += ' hovered'
}
function dragLeave() {
    if (this.classList.contains('claimed')) {
        this.className = 'available'
    }
}
function dragDrop() {
    this.className = 'available'
    // this.append(claimed);
    let index = parseInt(this.id.replace('sq', ''));
    console.log(index)
}

function placePiece(index) { 
// depending on where the center of the dragged building was placed

// set the value of the board spaces corresponding with the building array 
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
        s.setAttribute('class', 'available')
    }
}



