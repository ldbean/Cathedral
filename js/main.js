// CONSTANTS
import pieces from "./pieces.js";
const lookup = {
    2: "Two",
    4: "One",
    1: "rgb(149, 245, 229)",
    "-1": "rgb(60, 109, 213)",
    null: "black",
    0: "black",
};

const mathGrid = [-11, -10, -9, -1, 0, 1, 9, 10, 11];
const cathedralIndex = [-10, -1, 0, 1, 10, 20];
const rotateIndex = [2, 4, 6, -2, 0, 2, -6, -4, -2];

// STATE VARIABLES
let board;
let turn;
let winner;

let currentPiece;

let blockPosIndex = [];
let potentialPieces = [];

let pieceReplace = false;
let player1Pieces = [Object.keys(pieces)];
let player2Pieces = [Object.keys(pieces)];

let player1BlockCount = 0;
let player2BlockCount = 0;

// CACHED EVENTS
let spaces = document.querySelectorAll("td div");
let available = document.querySelectorAll(".available");
let message = document.querySelector("h3");
// let btn = document.getElementById('reset');
let boardVis = document.querySelector("#board");
let deck = document.querySelectorAll(".deck");
let aside = document.querySelector("aside");
let p1deck = document.querySelector("#player1");
let p2deck = document.querySelector("#player2");
let bldngs1 = p1deck.querySelectorAll("div");
let bldngs2 = p2deck.querySelectorAll("div");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");

// EVENT LISTENERS
// btn.addEventListener('click', initialize)
aside.addEventListener("dragstart", dragStart);
aside.addEventListener("dragend", dragEnd);
boardVis.addEventListener("dragover", dragOver);
boardVis.addEventListener("dragenter", dragEnter);
// boardVis.addEventListener('dragleave', dragLeave);
aside.addEventListener("click", rotate);
aside.addEventListener("dragstart", function (e) {
    console.log(e.target);
    currentPiece = e.target.id;
    console.log(`currentPiece set to ${currentPiece}`);
});
boardVis.addEventListener("drop", handleMove);

// FUNCTIONS
initialize();

function randomMsg() {
    let phrases = [
        "your go.",
        "please go.",
        "we are wating on you.",
        "please, take your time. I've got all day.",
    ];
    message.textContent += phrases[Math.floor(Math.random() * phrases.length)];
}

function pieceBuild(building, player) {
    let thisPiece = document.getElementById(building);
    if (player == 1) {
        if (p1deck.contains(thisPiece)) {
            thisPiece.remove();
        }
    } else {
        if (p2deck.contains(thisPiece)) {
            thisPiece.remove();
        }
    }

    // create a separate space for generating
    let pieceStage = document.createDocumentFragment();
    // create a bounding box for the building and add its attributes
    //  TODO different bounding boxs for each piece
    let pieceBound = document.createElement("div");
    pieceBound.draggable = true;
    pieceBound.className = "drag";
    pieceBound.className += " ";
    for (let i = 0; i < pieces[building].length; i++) {
        // create a pieceBlock for each building's array item
        let pieceBlock = document.createElement("div");
        pieceBlock.id = i;
        // depending on the player listed
        if (player == 1) {
            // color the block according to the number in the array
            if (pieces[building][i] == 0) {
                pieceBlock.className = "pHolder";
            } else {
                pieceBlock.className = "player1";
                player1BlockCount += 1;
            }
        } else {
            if (pieces[building][i] == 0) {
                pieceBlock.className = "pHolder";
            } else {
                pieceBlock.className = "player2";
                player2BlockCount += 1;
            }
        }
        // add blocks to bounding box
        pieceBound.appendChild(pieceBlock);
    }
    // add building to the stage
    pieceStage.append(pieceBound);
    pieceBound.id = building;
    // add final building to respective player's deck
    deck[player - 1].appendChild(pieceStage);
}

function handleMove(event) {
    // get the index of the event.target
    let index = parseInt(event.target.id.replace("sq", ""));
    // current item being dragged
    console.log({ index });
    console.log(`currentPiece ${currentPiece}`);

    for (let b = 0; b < pieces[currentPiece].length; b++) {
        if (pieces[currentPiece][b] == "1") {
            blockPosIndex.push(mathGrid[b]);
        }
    }

    console.log(`blockPos set for ${currentPiece}`);

    placePiece(index);
    //if piece is invisible remove it from remaining pieces
    for (let i = 0; i < bldngs1.length; i++) {
        console.log("WHEW" + i + bldngs1 + bldngs[1]);
        if (bldngs1[i].className == "invisible") {
            let idx = player1Pieces.indexOf(bldngs1[i].id);
            player1Pieces.splice(idx, 1);
        }
    }
    for (let i = 0; i < bldngs2.length; i++) {
        if (bldngs2[i].className == "invisible") {
            let idx = player2Pieces.indexOf(bldngs2[i].id);
            player2Pieces.splice(idx, 1);
        }
    }

    console.log("turn " + turn);
    // check winner, getWinner should return true, false, "T" for tie.

    blockPosIndex = [];
    winner = getWinner();
    message.textContent = "Player " + lookup[turn + 3] + " ";
    randomMsg();
    p1.textContent = player1BlockCount;
    p2.textContent = player2BlockCount;
}

function placePiece(index) {
    // Loop through the blocks positions on the board based on the event.target
    for (let n = 0; n < blockPosIndex.length; n++) {
        //COLLISION
        // surrounding and including the index (in the shape of the piece selected) are not null
        if (
            board[index + blockPosIndex[n]] != null ||
            event.target.nextElementSibling.className == "border" ||
            event.target.previousElementSibling.className == "border"
        ) {
            console.log(`can't place at board[${index}]`);
            pieceReplace = true;
            return;
        }
    }
    for (let n = 0; n < blockPosIndex.length; n++) {
        spaces[index + blockPosIndex[n]].style.backgroundColor = lookup[turn];
        spaces[index + blockPosIndex[n]].className = "claimed";
        board[index + blockPosIndex[n]] = turn;
    }

    // if no index and its surrounding spaces can fit any remaining areas(MVP or their rotations)
    blockCount(currentPiece, turn);
    console.log({ player1BlockCount });
    console.log({ player2BlockCount });
    turn *= -1;

    if (winner == "T") {
        message.textContent = "Rats, another tie!";
    } else if (winner) {
        message.innerHTML = `Congrats ${lookup[winner]}!`;
    } else {
        return;
    }
}

function blockCount(p, turn) {
    for (let i = 0; i < pieces[p].length; i++) {
        if (pieces[p][i] == 1) {
            if (turn == 1) {
                player1BlockCount--;
            } else {
                player2BlockCount--;
            }
        }
    }
}

function rotate(e) {
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
function dragStart(e) {
    console.log("start");
    e.target.className += " hold";
}

function dragEnd(e) {
    // setTimeout(() => (e.target.className = 'invisible'), 0)
    if ((pieceReplace = true)) {
        setTimeout(() => (e.target.className = "invisible"), 3);
    }
    pieceReplace = false;
}

function dragOver(e) {
    e.preventDefault();
    if (this.class == "available") {
        this.classList.append(" hover");
    }
}

function dragEnter() { }

// function dragLeave() {
//     if (this.classList.contains('claimed')) {
//         this.className = 'available'
//     }
// }

function dragDrop() {
    // this.append(claimed);
}

function getWinner() {
    let blockPosIndexRem = [];
    // loop through the board
    for (let s in board) {
        //loop thorugh remaining pieces
        for (let p in player1Pieces) {
            console.log("pieceWin" + p + player1Pieces);
            //loop through blocks in premianing pieces
            for (let b in pieces[p]) {
                if (pieces[p][b] == "1") {
                    // create position index for that piece
                    blockPosIndexRem.push(mathGrid[b]);
                }
            }

            for (let n = 0; n < blockPosIndexRem.length; n++) {
                if (board[s + blockPosIndexRem[n]] == null) {
                    blockPosIndexRem = [];
                    return;
                } else {
                    console.log("Game Over.");
                    // compare blocks remaining
                }
            }
        }
    }

    //checks if play can continue (if there are still open squares)
    if (board.includes(null)) {
        return null;
    } else {
        return "T";
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
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    // placing the cathedral
    turn = 0;
    if (turn == 0) {
        message.innerText =
            "Let's play! Player Two, click on the board to place the Cathedral.";
    } else {
    }
    // let cathedralIndex = pieces.cathedralIndex;
    boardVis.addEventListener("click", function (e) {
        if (turn == 0) {
            let index = parseInt(e.target.id.replace("sq", ""));
            // change cathedral spaces to black
            if (
                e.target.nextElementSibling.className == "border" ||
                e.target.previousElementSibling.className == "border"
            ) {
                console.log(`can't place at board[${index}]`);
                return;
            }
            for (let n = 0; n < cathedralIndex.length; n++) {
                spaces[index + cathedralIndex[n]].style.backgroundColor = lookup[0];
                spaces[index + cathedralIndex[n]].className = "claimed";
                board[index + cathedralIndex[n]] = turn;
            }
            turn = 1;
        }
        message.innerText =
            "Alright, now it's Player One's turn. Drag one of your pieces onto the board.";
    });

    winner = null;
    blockPosIndex = [];

    Object.keys(pieces).forEach(piece => pieceBuild(piece, 1));
    Object.keys(pieces).forEach(piece => pieceBuild(piece, 2));

    for (let piece in pieces) {
        for (let b = 0; b < pieces[piece].length; b++) {
            if (pieces[piece][b] == "1") {
                player1BlockCount++;
                player2BlockCount++;
            }
        }
    }
}
