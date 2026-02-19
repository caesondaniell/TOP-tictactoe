// function newPlayer(name, marker) {
//     return {name, marker};
// }

// const playerOne = newPlayer("Tim", "X");
// const playerTwo = newPlayer("Paul", "O");

// console.log(playerOne, playerTwo);

const game = (() => {
    const board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    function place(square, marker) {
        if (board[square - 1] === "") {
            board.splice(square - 1, 1, marker);
            console.log(board);
        } else {
            alert("That space is already taken!");
            return;
        }
        const result = endCheck();
        if (result.outcome) {
            if (result.outcome === "cat's game") {
                console.log(`It's a ${result.outcome}!`);
            } else {
                console.log(`It's a ${result.outcome}; ${result.winner} wins!`)
            }
        }
        
    };

    function endCheck() {
        let h = 0, outcome, winner;
        while (h < 7) {
            if (board[h] !== "" &&
                board[h] === board[h + 1] &&
                board[h] === board[h + 2]) {
                    outcome = "horizontal victory";
                    winner = board[h];
                }
            h += 3;
        };
        for (let v = 0; v < 3; v++) {
            if (board[v] !== "" &&
                board[v] === board[v + 3] &&
                board[v] === board[v + 6]) {
                    outcome = "vertical victory";
                    winner = board[v];
                }
        }
        if (
            board[4] !== "" &&
            ((board[4] === board[0] && board[4] === board[8]) ||
            (board[4] === board[2] && board[4] === board[6]))
        ) {
            outcome = "diagonal victory";
            winner = board[4];
        }
        if (!board.includes("")) outcome = "cat's game";
        return { outcome, winner };
    }

    function reset() {
        board.forEach(square => { board.splice(board.indexOf(square), 1, "") });
        console.log(board);
    }

    return { place, reset };
})();

// for testing
// game.place(1, "X");
// game.place(2, "O");
// game.place(5, "X");
// game.place(8, "O");
// game.place(9, "X");
// game.place(9, "O");
// game.place(5, "X");
// game.place(7, "O");
// game.place(8, "X");
// game.reset();