let td = document.querySelectorAll('td')
for (let i = 0; i < td.length; i++) { 
    td[i].removeAttribute('id')
    td[i].setAttribute('id',`sq${i}`)
    console.log(td[i])
}
console.log(td)


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

// STATE VARIABLES
let board;
let turn;
let winner;
let occupiedSpaces = [];
let height = 10;
let width = 10;


// CACHED EVENTS
let spaces = document.querySelectorAll('td div');
let message = document.querySelector('h3');
let btn = document.getElementById('reset');
let table = document.querySelector('table');


// EVENT LISTENERS
// btn.addEventListener('click', initialize)
table.addEventListener('click', handleMove)
// space.addEventListener('click', displayPiece)


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


function displayPiece () {
    // let currentPiece = playerChoice;
    // let center = Math.floor(width / 2);
    // let piece = pieces[currentPiece];
    // let location = [center, 0];

    // currentPiece = {
    //     piece: piece,
    //     color: colors[randomColor],
    //     location: location,
    //     indexes: getBlockNumbers(shape, location)
    // };


}
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
}



